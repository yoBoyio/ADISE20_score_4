import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import * as Colyseus from 'colyseus.js';
import Grid from '@material-ui/core/Grid';
import './styles/score4.css';

//components
import Score4Board from './Board';
import Score4Dropper from './Dropper';
import InfoPanel from './InfoPanel';
import { gameSettings } from '../../util/gameSettings';
import SelectButton from './SelectButton'

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
        score:null
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


  componentDidMount(){
    // const spectate = this.props.match.params.id;
    // console.log(spectate)
    const client = new Colyseus.Client('ws://localhost:4000');
   
    client.joinOrCreate( 'score4').then(room => {
        this.setState({room:room})
        console.log("Client",room.sessionId, "joined", room.name);
        console.log("Room id:",room.id)
        
    this.state.room.onMessage("join",(data) => {
      this.setState(data);
     
      console.log("message join");
      console.log(data);
      })
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
      symbol, numSpectate, draw, win, ended, start, turn,score
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
      score
    };
    console.log("data ",data)
    console.log(this.state.room)
    return (
      <div className="score4">
      
        <Grid item sm={8} xs={12}>  
        <InfoPanel data={data} />
        <ReactCursorPosition>
          <Score4Dropper
            turn={isTurn && active}
            pieceColor={color}
            action={this.state.room.send.bind(this.state.room)}
          />
        </ReactCursorPosition>
        <Score4Board colors={colors} board={this.state.board} />
        <SelectButton data={data} />
        </Grid>
      </div>
    );
  }
}

export default Score4;