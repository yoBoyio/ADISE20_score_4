import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import * as Colyseus from 'colyseus.js';
import Score4Board from './Board';
import Score4Dropper from './Dropper';
import InfoPanel from './InfoPanel';
import { gameSettings } from '../../util/gameSettings';

class Score4 extends Component {
  constructor(props) {
    super(props);
    // this.colyseus = new Colyseus.Client('ws://localhost:4000');
    // this.room = this.colyseus.joinOrCreate( 'score4');
    // this.room.onStateChange.add(this.onStateChange);
    // this.room.onMessage.add(this.onMessage);
    const client = new Colyseus.Client('ws://localhost:4000');
    this.room=client.joinOrCreate("score4").then(room => {
            console.log(room.sessionId, "joined", room.name);
        }).catch(e => {
            console.log("JOIN ERROR", e);
     });
      this.room.onStateChange.add((state)=>{this.onStateChange=state});
      this.room.onMessage.add(this.onMessage);
    this.state = {
      board: [],
      win: null,
      draw: false,
      numSpectate: 0,
    };
  }

  onStateChange = (newState) => {
    this.setState(newState);
  }

  onMessage = (msg) => {
    this.setState(msg);
  }

  render() {
    if (!this.room) {
      return null;
    }
    const {
      symbol, numSpectate, draw, win, ended, start, turn,
    } = this.state;

    const { colors } = gameSettings;
    const { color } = colors[symbol || 0];
    const active = !draw && !win;
    const isTurn = symbol === turn;
    const data = {
      spectator: !symbol,
      spectators: numSpectate,
      room: this.room.id,
      active,
      colors,
      isTurn,
      draw,
      win,
      ended,
      start,
    };

    return (
      <div className="Score4">
        <InfoPanel data={data} />
        <ReactCursorPosition>
          <Score4Dropper
            turn={isTurn && active}
            pieceColor={color}
            action={this.room.send.bind(this.room)}
          />
        </ReactCursorPosition>
        <Score4Board colors={colors} board={this.state.board} />
      </div>
    );
  }
}

export default Score4;