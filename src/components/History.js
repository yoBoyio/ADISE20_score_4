import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton'
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class History extends Component {
   constructor(props){
       super(props);

       this.state={
        winner:props.game.winner,
        room_id:props.game.room_id,
        player_1:props.game.player_1,
        player_2:props.game.player_2,
        draw:props.game.draw,
       }
   }

  
  render() {
      const{
        winner,
        room_id,
        player_1,
        player_2,
        draw
        }= this.state;

        const {classes} = this.props;
    

        
   const status =
     winner ? (
        <Typography variant="h2">Win or Lose</Typography> 
      ) :( draw ? (<Typography variant="h2">Draw</Typography>):(<Typography variant="h2">Disconected</Typography>));
    
    return (
      <Card className={classes.card}>
        <CardMedia
          title="Status"
        />
        <CardContent className={classes.content}>
            {status}     
          <Typography variant="body1">{room_id}</Typography>  
        </CardContent>
      </Card>
    );
  }
}



export default withStyles(styles)(History);