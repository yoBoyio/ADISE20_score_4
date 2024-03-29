const Room = require('colyseus').Room
const Connect4Board = require('./connectFour')
const { db } = require('../util/admin')

class Connect4Room extends Room {
  onCreate () {
    // allow only 2 clients or locks
    this.maxClients = 2
    this.players = {}
    this.setState({
      board: [],
      turn: null
    })
  }
  
  onJoin (client) {
    const id = client.sessionId
    // Number of Palyers {}
    const numPlayers = Object.keys(this.players).length
    if (numPlayers < 2) {
      if (numPlayers === 0) {
        // if there are no players, register this client as first player
        this.players[id] = 1
      } else {
        // register secon player and start game
        this.setupGame(id)
      }
      client.send('join', { symbol: this.players[id] })
    }
    // Register a callback to process a type of message sent by the client-side.
    this.onMessage ('play', (client, message) => {
      const id = client.sessionId
      this.handlePlay(id, message)
    })
  }

  setupGame (id) {
    this.players[id] = 2
    // call connect 4 board
    this.game = Connect4Board(6, 7)
    this.state.board = this.game.board
    // random player has the first move
    this.turn = [1, 2][Math.floor(Math.random() * 2)]
    this.state.turn = this.turn
    // let players know that the game has started
    this.broadcast('start', { start: true })
  }

  handlePlay (id, msg) {
    const symbol = this.players[id]
    // check if it's client's turn
    if (this.turn === symbol) {
      // check if the column is valid
      const valid = this.game.play(symbol, msg.col)
      if (valid !== null) {
        this.turn = this.turn - 1 || this.turn + 1
        this.state.turn = this.turn
        this.state.board = this.game.board
        const win = this.game.checkWin(valid, msg.col, symbol)
        const draw = this.game.checkDraw()
        if (win) {
          // show winner
          this.broadcast('win', { win: symbol })
          this.win = symbol
        } else if (draw) {
          // show that it is draw
          this.broadcast('draw', { draw: true })
          this.draw = true
        }
      }
    }
  }

  onLeave (client) {
    const id = client.sessionId
    // If a player leaves the game, the other player is noticed and the game ends.
    this.broadcast('ended', { ended: true })
    // disconnect() Disconnect all clients, then dispose.
    this.disconnect()
  }

  // called before the room is destroyed
  async onDispose() {
    // before destroyed, saves data to db
    if (this.game) {
      const flat = []
      this.game.board.map(row => flat.push(...row))
      const players = Object.keys(this.players)
      const data = {
        board: flat,
        player_1: players[0] || '',
        player_2: players[1] || '',
        room_id: this.roomId,
        draw: this.draw || false,
        winner: this.win || null,
        height: 6,
        width: 7,
      }
      
      await db.collection(`score4`)
          .add(data)
            .catch(err => {
              console.error(err)
            })
    }
  }
  async onAuth (client, options, request) {
    console.log(options.name)
    if (options.accessToken) {
        this.name=options.name;
        return true;

    } else {
        throw new ServerError(400, "bad access token");
    }
  }
}

module.exports = Connect4Room