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
        score:null
      };
      this.name =this.props.user;
  }


  componentDidMount(){
    const client = new Colyseus.Client('ws://localhost:4000');
    client.joinOrCreate( 'score4',{ 
        accessToken:localStorage.FBidToken,
        name: this.name
    }).then(room => {
          
          room.onStateChange((state)=>{
            this.setState(state);  
     
          });
            room.onMessage("start",(data) => {
              this.setState(data);
            });
            room.onMessage("join",(data) => {
              this.setState(data);
            })

            room.onMessage("win",(data) => {
              this.setState(data);
              });
          
            room.onMessage("draw",(data) => {
              this.setState(data);
            });
            
            room.onMessage("ended",(data) => {
              this.setState(data);
            });
                  
          this.setState({room:room}) 
              }).catch(e => {
                console.log("JOIN ERROR", e);
    });
  }

  render() {
    

    if (!this.state.room) {
      return null;
    }
    const {
      symbol,  draw, win, ended, start, turn,score
    } = this.state;
    const { colors } = gameSettings;
    const { color } = colors[symbol || 0];
    const active = !draw && !win;
    const isTurn = symbol === turn;
    const data = {
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