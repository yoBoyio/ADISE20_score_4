//redux 
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
//components
import Profile from '../components/Profile'
import Score4 from '../components/Score4/Score4';
import BoardSkeleton from '../util/BoardSkeleton';
//home page get data from api using axios
 class CreateRoom extends Component {
      
   

    render() {
        const { user:{
         loading,
         authenticated
            }
        } = this.props;

        let isAuth = !loading ? (authenticated ?(
           <Score4/>
        ): (<BoardSkeleton/>)) : (<p>loading...</p>)
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {isAuth}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
});
CreateRoom.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(CreateRoom);
