import http from 'http'

const Server = () => {
    const server = http.createServer(function (req, res) {
        console.log('get the request asd asasdasdsad show')
        //console.log("NODE_APP_DATA_URL : ", process.env.NODE_APP_DATA_URL)
        res.end('hello world' + process.env.NODE_APP_DATA_URL)
    })

    server.listen(4002, () => {
        console.log('Listening on port 4000')
    })
}

Server()
export default Server
