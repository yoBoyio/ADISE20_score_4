//redux 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

//components
import Profile from '../components/Profile';
import BoardSkeleton from '../util/BoardSkeleton';
import {getHistory} from '../redux/actions/dataActions';
import History from '../components/History';
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
      objectFit: 'cover',
      marginLeft: "30%"
    }
  };
  
 class home extends Component {
      
    componentDidMount() {

            this.setState(this.props.getHistory(this.props.user.credentials.handle));
      }
    render() {
        const { history, loading } = this.props.data;
        const { authenticated  } = this.props.user;
        const {classes} = this.props;

        let recentHistory = !loading ? (authenticated ?
            ( history.map((game) => <History game={game} key={game.room_id} />)
        ) : (<BoardSkeleton />)) : (<p>loading...</p>)
        
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
               { authenticated && 
                <Card  className={classes.card}>    
                    <CardContent  className={classes.content}>
                    <Typography variant="h2">History</Typography>  
                    </CardContent>
                </Card> }
                    {recentHistory}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}
const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
    history: state.data.history,
    classes: PropTypes.object.isRequired,

  });

const mapActionsToProps = {
    getHistory
}

home.propTypes = {
    getHistory:PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(home));
