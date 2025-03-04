package router

import (
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func uploadImages(res http.ResponseWriter, req *http.Request) {
	req.ParseMultipartForm(10 << 32)
	form := req.MultipartForm
	if form == nil {
		respond(res, []int{})
		logger.Failure(logger.Router, "Received empty request")
		return
	}

	sdkConfig, err := config.LoadDefaultConfig(context.Background())
	if err != nil {
		logger.Failure(logger.Router, "Failed to establish sdkConfig")
		respond(res, []int{})
		return
	}
	s3Client := s3.NewFromConfig(sdkConfig)
	bucketName := "globetrotte-images"

	failed := false
	var newUploads []int

	for _, files := range req.MultipartForm.File {
		for _, handler := range files {
			file, err := handler.Open()
			if err != nil {
				failed = true
				logger.Failure(logger.Database, "Failed to open file: "+err.Error())
				break
			}
			defer file.Close()
			key := database.NewImageDB(getCaller(req).ID)
			if key == -1 {
				failed = true
				logger.Failure(logger.Database, "Failed to add to DB")
				break
			}
			stringKey := strconv.Itoa(key)

			_, err = s3Client.PutObject(context.Background(), &s3.PutObjectInput{
				Bucket: aws.String(bucketName),
				Key:    aws.String(stringKey),
				Body:   file,
			})

			if err != nil {
				logger.Failure(logger.Router, "Couldn't upload file "+stringKey+" to S3")
				failed = true
				break
			} else {
				newUploads = append(newUploads, key)
				err = s3.NewObjectExistsWaiter(s3Client).Wait(
					context.Background(),
					&s3.HeadObjectInput{
						Bucket: aws.String(bucketName),
						Key:    aws.String(stringKey)},
					time.Minute)
				logger.Err(
					logger.Router,
					err, "Failed waiting for object "+stringKey+" to exist")
			}
		}
	}

	// Cleanup everything else if any of the uploads failed
	if failed {
		for _, key := range newUploads {
			stringKey := strconv.Itoa(key)
			_, err = s3Client.DeleteObject(context.Background(), &s3.DeleteObjectInput{
				Bucket: aws.String(bucketName),
				Key:    aws.String(stringKey),
			})
			logger.Err(logger.Router, err, "Failed to delete file "+stringKey)
			database.DeleteImageDB(key)
		}
		respond(res, []int{})
		return
	}

	logger.Success(logger.Router, "Files uploaded successfully.")
	respond(res, newUploads)
}
