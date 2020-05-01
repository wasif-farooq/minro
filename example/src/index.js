import http from 'http';

const Server = () => {
    console.log("NODE_APP_DATA_URL : ", process.env.NODE_APP_DATA_URL)
    const server = http.createServer(function(req, res) {
        console.log("get the request asd asasdasdsad show");
        res.end('hello world');
    });

    server.listen(4002, () => {
        console.log('Listening on port 4000');
    });
}

Server();
export default Server;