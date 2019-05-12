import http from 'http';

export default class HTTPReq {
    public static post(uri: string, data: string, callback: any) {
        const fullURI = {
            host: HTTPReq.host,
            port: HTTPReq.port,
            path: HTTPReq.pathPrefix + uri,
            method: 'POST',
            headers: {
                'Content-Length': Buffer.byteLength(data),
            },
        };

        const postReq = http.request(fullURI, (res: any) => {
            res.setEncoding('utf8');
            let returnData = '';
            res.on('data', (chunk: any) => {
                returnData += chunk;
            });
            res.on('end', () => {
                callback(returnData);
            });
        }).on('error', (e) => {
            callback(false);
            // alert('Submission failed');
        });
        postReq.write(data);
        postReq.end();
    }

    public static get(uri: string, callback: any) {
        const fullURI = {
            host: HTTPReq.host,
            port: HTTPReq.port,
            path: HTTPReq.pathPrefix + uri,
            method: 'GET',
        };

        const getReq = http.request(fullURI, (res: any) => {
            res.setEncoding('utf8');
            let returnData = '';
            res.on('data', (chunk: any) => {
                returnData += chunk;
            });
            res.on('end', () => {
                callback(returnData);
            });
        });
        getReq.end();
    }

    private static host = '127.0.0.1';
    private static port = 4000;
    private static pathPrefix = '/api/';
}
