import React from 'react';
import * as Colyseus from 'colyseus.js';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//components
import { Button } from '@material-ui/core';


    class Chat extends React.Component {
        constructor(props){
            super(props);
    
        this.state = {
          currentText: "",
          disabled: false,
          room:null
        };
    }
        componentDidMount(){
            const client = new Colyseus.Client("ws://localhost:4000/");
            client.joinOrCreate("chat").then(room => {                
            
                room.onMessage("messages", function(message) {
                        var p = document.createElement("p");
                        p.innerHTML = ` ${message}`;
                        document.querySelector("#messages").appendChild(p);
                });
                this.setState({room:room})
              });
            }    
        
    
      onInputChange = (e) => {
        e.preventDefault()
        this.setState({ currentText: e.target.value })
      }
    
      onSubmit = (e) => {
        e.preventDefault()
        this.state.room.send("message", this.state.currentText);
        this.setState({currentText: ""})
      }
    
        
     render() {
        return (
            <Grid> 
            <div>
                <h1>Chat</h1>
              <div id="messages" ref="messages">
              </div>
              <form id="form" onSubmit={this.onSubmit.bind(this)}>
                <TextField id="input" type="text" onChange={this.onInputChange.bind(this)} value={this.state.currentText} />
                <Button disabled={this.state.disabled} variant="contained" color="secondary" type="submit">send</Button>
              </form>
        </div>
        </Grid>
        )
      }
    }
    

    
export default Chat;