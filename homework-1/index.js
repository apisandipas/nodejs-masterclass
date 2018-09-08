const http = require('http')
const url = require('url')

const PORT = 8000

const httpServer = http.createServer((req, res) => {
  // get the URL and parse it
  const parsedUrl = url.parse(req.url, true)

  // get the path
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  // Get the HTTP method
  const method = req.method.toLowerCase()

  const responseHandler = (statusCode = 200, payload = {}) => {
    const payloadString = JSON.stringify(payload)

    // send response
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(statusCode)
    res.end(payloadString)
  }

  if (method === 'post' && trimmedPath === 'hello') {
    responseHandler(200, {
      msg: 'Hello to you too!'
    })
  } else {
    responseHandler(404)
  }
})

// Start the server
httpServer.listen(PORT, () => {
  console.log('The HTTP server is listening on port %d', PORT)
})
