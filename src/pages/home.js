
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
//components
import Profile from '../components/Profile'
import Score4 from '../components/Score4/Score4';
import BoardSkeleton from '../util/BoardSkeleton';
//home page get data from api using axios
 class home extends Component {
      
     
    state={
        token:null
    }
    
    componentDidMount(){
       const token = localStorage.FBidToken;
        this.setState({token:token})
    }

    
    render() {
        let isAuth = this.state.token ? (
           <Score4/>
        ): (<BoardSkeleton/>)
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

export default home;
