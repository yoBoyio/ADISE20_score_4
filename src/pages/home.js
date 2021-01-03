//redux 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
//components
import Profile from '../components/Profile';
import BoardSkeleton from '../util/BoardSkeleton';
import {getHistory} from '../redux/actions/dataActions';
import History from '../components/History';
//home page get data from api using axios
 class home extends Component {
      
   
    componentDidMount() {
        this.props.getHistory();
      }
    render() {
        const { history, loading } = this.props.data;
        const { authenticated  } = this.props.user;

        let recentHistory = !loading ? (authenticated ?
            ( history.map((game) => <History game={game} key={game.room_id} />)
        ) : (<BoardSkeleton />)) : (<p>loading...</p>)
        
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
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
    user: state.user
  });

home.propTypes = {
    history: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

  };
export default connect(
    mapStateToProps,
    { getHistory }
  )(home);
