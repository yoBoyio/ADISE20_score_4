import { Route, Switch } from 'react-router-dom';

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
//components
import Profile from '../components/Profile'
import Score4 from '../components/Score4/Score4';
import {api} from '../axiosConfigs';

//home page get data from api using axios
 class home extends Component {
    state={
        tests:null
    }
    componentDidMount(){
        api.get('/test')
        .then((res) =>{
            console.log(res);
            this.setState({
                tests: res.data
            })
        })
        .catch((err) => console.log(err));
    }
    render() {
        let recentTestMarkup = this.state.tests ? (
            this.state.tests.map(test => <p>{test.field}</p>)
        ): <p> Loading...</p>
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentTestMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

export default home;
