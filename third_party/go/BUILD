
# DO NOT EDIT MANUALLY AS IT IS GENERATED AND WILL BE OVERWRITTEN.
#
# This file is generated based on the provided 'go mod graph'. You can run
# 'plz go_mod' to regenerate the file.
#
# Source: src/turbine/scripts/genBUILD.go

package(default_visibility = ["PUBLIC"])

go_toolchain(
    name = "toolchain",
    version = "1.24.0",
)

go_stdlib(name = "std")

go_module(
  name = "aws_aws-sdk-go-v2",
  module = "github.com/aws/aws-sdk-go-v2",
  version = "v1.36.3",
  install = [
    ".",
    "aws",
    "aws/arn",
    "aws/defaults",
    "aws/middleware",
    "aws/protocol/query",
    "aws/protocol/restjson",
    "aws/protocol/xml",
    "aws/ratelimit",
    "aws/retry",
    "aws/signer/internal/v4",
    "aws/signer/v4",
    "aws/transport/http",
    "internal/auth",
    "internal/auth/smithy",
    "internal/context",
    "internal/endpoints",
    "internal/endpoints/awsrulesfn",
    "internal/middleware",
    "internal/rand",
    "internal/sdk",
    "internal/sdkio",
    "internal/shareddefaults",
    "internal/strings",
    "internal/sync/singleflight",
    "internal/timeconv",
  ],
  deps = [
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_aws_protocol_eventstream",
  module = "github.com/aws/aws-sdk-go-v2/aws/protocol/eventstream",
  version = "v1.6.10",
  install = [
    ".",
    "eventstreamapi",
  ],
  deps = [
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_config",
  module = "github.com/aws/aws-sdk-go-v2/config",
  version = "v1.29.9",
  install = [
    ".",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_aws-sdk-go-v2_credentials",
    ":aws_aws-sdk-go-v2_feature_ec2_imds",
    ":aws_aws-sdk-go-v2_internal_configsources",
    ":aws_aws-sdk-go-v2_internal_endpoints_v2",
    ":aws_aws-sdk-go-v2_internal_ini",
    ":aws_aws-sdk-go-v2_service_internal_accept-encoding",
    ":aws_aws-sdk-go-v2_service_internal_presigned-url",
    ":aws_aws-sdk-go-v2_service_sso",
    ":aws_aws-sdk-go-v2_service_ssooidc",
    ":aws_aws-sdk-go-v2_service_sts",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_credentials",
  module = "github.com/aws/aws-sdk-go-v2/credentials",
  version = "v1.17.62",
  install = [
    ".",
    "ec2rolecreds",
    "endpointcreds",
    "endpointcreds/internal/client",
    "processcreds",
    "ssocreds",
    "stscreds",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_aws-sdk-go-v2_feature_ec2_imds",
    ":aws_aws-sdk-go-v2_internal_configsources",
    ":aws_aws-sdk-go-v2_internal_endpoints_v2",
    ":aws_aws-sdk-go-v2_service_internal_accept-encoding",
    ":aws_aws-sdk-go-v2_service_internal_presigned-url",
    ":aws_aws-sdk-go-v2_service_sso",
    ":aws_aws-sdk-go-v2_service_ssooidc",
    ":aws_aws-sdk-go-v2_service_sts",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_feature_ec2_imds",
  module = "github.com/aws/aws-sdk-go-v2/feature/ec2/imds",
  version = "v1.16.30",
  install = [
    ".",
    "internal/config",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_internal_configsources",
  module = "github.com/aws/aws-sdk-go-v2/internal/configsources",
  version = "v1.3.34",
  install = [
    ".",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_internal_endpoints_v2",
  module = "github.com/aws/aws-sdk-go-v2/internal/endpoints/v2",
  version = "v2.6.34",
  install = [
    ".",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_internal_ini",
  module = "github.com/aws/aws-sdk-go-v2/internal/ini",
  version = "v1.8.3",
  install = [
    ".",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_internal_v4a",
  module = "github.com/aws/aws-sdk-go-v2/internal/v4a",
  version = "v1.3.34",
  install = [
    ".",
    "internal/crypto",
    "internal/v4",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_service_internal_accept-encoding",
  module = "github.com/aws/aws-sdk-go-v2/service/internal/accept-encoding",
  version = "v1.12.3",
  install = [
    ".",
  ],
  deps = [
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_service_internal_checksum",
  module = "github.com/aws/aws-sdk-go-v2/service/internal/checksum",
  version = "v1.6.2",
  install = [
    ".",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_aws-sdk-go-v2_service_internal_presigned-url",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_service_internal_presigned-url",
  module = "github.com/aws/aws-sdk-go-v2/service/internal/presigned-url",
  version = "v1.12.15",
  install = [
    ".",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_service_internal_s3shared",
  module = "github.com/aws/aws-sdk-go-v2/service/internal/s3shared",
  version = "v1.18.15",
  install = [
    ".",
    "arn",
    "config",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_service_s3",
  module = "github.com/aws/aws-sdk-go-v2/service/s3",
  version = "v1.78.1",
  install = [
    ".",
    "internal/arn",
    "internal/customizations",
    "internal/endpoints",
    "types",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_aws-sdk-go-v2_aws_protocol_eventstream",
    ":aws_aws-sdk-go-v2_internal_configsources",
    ":aws_aws-sdk-go-v2_internal_endpoints_v2",
    ":aws_aws-sdk-go-v2_internal_v4a",
    ":aws_aws-sdk-go-v2_service_internal_accept-encoding",
    ":aws_aws-sdk-go-v2_service_internal_checksum",
    ":aws_aws-sdk-go-v2_service_internal_presigned-url",
    ":aws_aws-sdk-go-v2_service_internal_s3shared",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_service_sso",
  module = "github.com/aws/aws-sdk-go-v2/service/sso",
  version = "v1.25.1",
  install = [
    ".",
    "internal/endpoints",
    "types",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_aws-sdk-go-v2_internal_configsources",
    ":aws_aws-sdk-go-v2_internal_endpoints_v2",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_service_ssooidc",
  module = "github.com/aws/aws-sdk-go-v2/service/ssooidc",
  version = "v1.29.1",
  install = [
    ".",
    "internal/endpoints",
    "types",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_aws-sdk-go-v2_internal_configsources",
    ":aws_aws-sdk-go-v2_internal_endpoints_v2",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_aws-sdk-go-v2_service_sts",
  module = "github.com/aws/aws-sdk-go-v2/service/sts",
  version = "v1.33.17",
  install = [
    ".",
    "internal/endpoints",
    "types",
  ],
  deps = [
    ":aws_aws-sdk-go-v2",
    ":aws_aws-sdk-go-v2_internal_configsources",
    ":aws_aws-sdk-go-v2_internal_endpoints_v2",
    ":aws_aws-sdk-go-v2_service_internal_accept-encoding",
    ":aws_aws-sdk-go-v2_service_internal_presigned-url",
    ":aws_smithy-go",
  ],
)

go_module(
  name = "aws_smithy-go",
  module = "github.com/aws/smithy-go",
  version = "v1.22.3",
  install = [
    ".",
    "auth",
    "auth/bearer",
    "container/private/cache",
    "container/private/cache/lru",
    "context",
    "document",
    "encoding",
    "encoding/httpbinding",
    "encoding/json",
    "encoding/xml",
    "endpoints",
    "endpoints/private/rulesfn",
    "internal/sync/singleflight",
    "io",
    "logging",
    "metrics",
    "middleware",
    "private/requestcompression",
    "ptr",
    "rand",
    "sync",
    "time",
    "tracing",
    "transport/http",
    "transport/http/internal/io",
    "waiter",
  ],
)

go_module(
  name = "binhonglee_kdlgo",
  module = "github.com/binhonglee/kdlgo",
  version = "v0.0.0-20211115042352-099938a8d3fc",
  install = [
    ".",
  ],
)

go_module(
  name = "dyatlov_go-opengraph_opengraph",
  module = "github.com/dyatlov/go-opengraph/opengraph",
  version = "v0.0.0-20220524092352-606d7b1e5f8a",
  install = [
    ".",
    "types/actor",
    "types/article",
    "types/audio",
    "types/book",
    "types/image",
    "types/music",
    "types/profile",
    "types/video",
  ],
  deps = [
    ":x_net",
  ],
)

go_module(
  name = "google_uuid",
  module = "github.com/google/uuid",
  version = "v1.6.0",
  install = [
    ".",
  ],
)

go_module(
  name = "gorilla_mux",
  module = "github.com/gorilla/mux",
  version = "v1.8.1",
  install = [
    ".",
  ],
)

go_module(
  name = "gorilla_securecookie",
  module = "github.com/gorilla/securecookie",
  version = "v1.1.2",
  install = [
    ".",
  ],
)

go_module(
  name = "gorilla_sessions",
  module = "github.com/gorilla/sessions",
  version = "v1.4.0",
  install = [
    ".",
  ],
  deps = [
    ":gorilla_securecookie",
  ],
)

go_module(
  name = "jackc_chunkreader_v2",
  module = "github.com/jackc/chunkreader/v2",
  version = "v2.0.1",
  install = [
    ".",
  ],
)

go_module(
  name = "jackc_pgconn",
  module = "github.com/jackc/pgconn",
  version = "v1.14.3",
  install = [
    ".",
    "internal/ctxwatch",
    "stmtcache",
  ],
  deps = [
    ":jackc_chunkreader_v2",
    ":jackc_pgio",
    ":jackc_pgpassfile",
    ":jackc_pgproto3_v2",
    ":jackc_pgservicefile",
    ":x_crypto",
    ":x_text",
  ],
)

go_module(
  name = "jackc_pgio",
  module = "github.com/jackc/pgio",
  version = "v1.0.0",
  install = [
    ".",
  ],
)

go_module(
  name = "jackc_pgpassfile",
  module = "github.com/jackc/pgpassfile",
  version = "v1.0.0",
  install = [
    ".",
  ],
)

go_module(
  name = "jackc_pgproto3_v2",
  module = "github.com/jackc/pgproto3/v2",
  version = "v2.3.3",
  install = [
    ".",
  ],
  deps = [
    ":jackc_chunkreader_v2",
    ":jackc_pgio",
  ],
)

go_module(
  name = "jackc_pgservicefile",
  module = "github.com/jackc/pgservicefile",
  version = "v0.0.0-20240606120523-5a60cdf6a761",
  install = [
    ".",
  ],
)

go_module(
  name = "jackc_pgtype",
  module = "github.com/jackc/pgtype",
  version = "v1.14.4",
  install = [
    ".",
  ],
  deps = [
    ":jackc_pgio",
  ],
)

go_module(
  name = "jackc_pgx_v4",
  module = "github.com/jackc/pgx/v4",
  version = "v4.18.2",
  install = [
    ".",
    "internal/sanitize",
    "pgxpool",
  ],
  deps = [
    ":jackc_chunkreader_v2",
    ":jackc_pgconn",
    ":jackc_pgio",
    ":jackc_pgpassfile",
    ":jackc_pgproto3_v2",
    ":jackc_pgservicefile",
    ":jackc_pgtype",
    ":jackc_puddle",
    ":x_crypto",
    ":x_text",
  ],
)

go_module(
  name = "jackc_puddle",
  module = "github.com/jackc/puddle",
  version = "v1.3.0",
  install = [
    ".",
  ],
)

go_module(
  name = "jordan-wright_email",
  module = "github.com/jordan-wright/email",
  version = "v4.0.1-0.20210109023952-943e75fe5223+incompatible",
  install = [
    ".",
  ],
)

go_module(
  name = "x_crypto",
  module = "golang.org/x/crypto",
  version = "v0.35.0",
  install = [
    "bcrypt",
    "blowfish",
    "pbkdf2",
  ],
)

go_module(
  name = "x_net",
  module = "golang.org/x/net",
  version = "v0.35.0",
  install = [
    "html",
    "html/atom",
  ],
)

go_module(
  name = "x_text",
  module = "golang.org/x/text",
  version = "v0.22.0",
  install = [
    ".",
    "cases",
    "internal",
    "internal/language",
    "internal/language/compact",
    "internal/tag",
    "language",
    "runes",
    "secure/bidirule",
    "secure/precis",
    "transform",
    "unicode/bidi",
    "unicode/norm",
    "width",
  ],
)

go_module(
  name = "x_time",
  module = "golang.org/x/time",
  version = "v0.11.0",
  install = [
    "rate",
  ],
)

go_module(
  name = "zcache",
  module = "zgo.at/zcache",
  version = "v1.2.0",
  install = [
    ".",
  ],
)
