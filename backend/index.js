const express = require('express')
const app = express()
const colyseus = require('colyseus')
const http = require('http')
const cors = require('cors')
const port = process.env.PORT || 4000

const FBAuth = require('./util/fbAuth')
const { signup, login, getAuthenticatedUser } = require('./handlers/users')
const {getHistory} = require('./server/handlers/History')
const room = require('./server/room')

const server = http.createServer(app)
const gameServer = new colyseus.Server({ server })

app.use(cors())
app.use(express.json())

// history routes
app.get('/history/:handle', getHistory);


// users routes
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/signup', signup)
app.post('/login', login)

gameServer.define('score4', room)
          .on("create", (room) => console.log("room created:", room.roomId))
          .on("dispose", (room) => console.log("room disposed:", room.roomId))
          .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
app.set('port', port)
gameServer.listen(port)
