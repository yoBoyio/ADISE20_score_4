import { Room } from 'colyseus'

class ChatRoom extends Room {
  maxClients = 2

  onCreate (options = null) {
    console.log('Chat Room Created: ', options)

    this.onMessage('message', (client, message) => {
      console.log('Received message from', client.sessionId, ':', message)
            this.broadcast('messages', `(${client.sessionId}) ${message}`)
    })
  }

  onJoin (client) {
    this.broadcast('messages', `${ client.sessionId } joined.`)
  }

  onLeave (client) {
    this.broadcast('messages', `${ client.sessionId } left.`)
  }

  onDispose () {
    console.log('Dispose ChatRoom');
  } 
}

module.exports = ChatRoom