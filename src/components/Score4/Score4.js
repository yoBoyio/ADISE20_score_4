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
      
      this.state = {
        board: [],
        win: null,
        draw: false,
        ended:false,
        numSpectate: 0,
        room:null,
        start:null,
        symbol:null,
        hasjoin:null,
      };
  }
  componentDidUpdate(){
   
    this.state.room.onStateChange((state)=>{
      console.log("Room State",state);
      this.setState(state);

    })
    if (!this.state.start ){
    this.state.room.onMessage("start",(data) => {
      this.setState(data);
      });
    }
    if (!this.state.win ){
      this.state.room.onMessage("win",(data) => {
        this.setState(data);
        });
      }

      if (!this.state.draw ){
        this.state.room.onMessage("draw",(data) => {
          this.setState(data);
          });
        }
        if (!this.state.ended ){
          this.state.room.onMessage("ended",(data) => {
            this.setState(data);
            console.log("ended",data);

            });
          }
  }

  updateMessage(message) {
    let { messages } = this.state;
    messages.push(message)
    this.setState({ messages })
    

  }

  componentDidMount(){
    const spectate = this.props.match.params.id;
    const client = new Colyseus.Client('ws://localhost:4000');
    if(spectate!=null){
      client.joinById(spectate).then(room=>{
        this.setState(room)

      })
    }
    client.joinOrCreate(spectate || 'score4', { spectate: spectate || null }).then(room => {
        this.setState({room:room})
        console.log("Client",room.sessionId, "joined", room.name);
        console.log("Room id:",room.id)
        
    this.state.room.onMessage("join",(data) => {
      this.setState(data);
      if (data.hasJoined ){
        console.log("message *");
      }
      console.log("message join");
      console.log(data);
      });

        
        }).catch(e => {
          console.log("JOIN ERROR", e);
    });

  }

  render() {
    console.log("rend",this.state)

    if (!this.state.room) {
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
      room: this.state.room.id,
      active,
      colors,
      isTurn,
      draw,
      win,
      ended,
      start,
    };
    console.log("data ",data)
    console.log(this.state.room)
    return (
      <div className="score4">
        <InfoPanel data={data} />
        <ReactCursorPosition>
          <Score4Dropper
            turn={isTurn && active}
            pieceColor={color}
            action={this.state.room.send.bind(this.state.room)}
          />
        </ReactCursorPosition>
        <Score4Board colors={colors} board={this.state.board} />
      </div>
    );
  }
}

export default Score4;