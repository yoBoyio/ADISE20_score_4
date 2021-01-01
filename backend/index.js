const express = require('express')
const app = express()
const colyseus = require('colyseus')
const http = require('http')
const cors = require('cors')
const port = process.env.PORT || 4000

const FBAuth = require('./util/fbAuth')
const { signup, login, getAuthenticatedUser } = require('./handlers/users')
const { getAllTests } = require('./handlers/test')
const room = require('./server/room')

const server = http.createServer(app)
const gameServer = new colyseus.Server({ server })

app.use(cors())
app.use(express.json())
// middleware functions dont know how to write'em correctly

// app.options(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '/login')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

// app.options(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '/signup')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

// test routes
app.get('/test', getAllTests)

// users routes
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/signup', signup)
app.post('/login', login)

gameServer.define('connect4', room)
          .on("create", (room) => console.log("room created:", room.roomId))
          .on("dispose", (room) => console.log("room disposed:", room.roomId))
          .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
app.set('port', port)
gameServer.listen(port)
// app.listen(port, () =>
// console.log(`Server listening http://localhost:${port}`) );
// gameServer.listen(port);
