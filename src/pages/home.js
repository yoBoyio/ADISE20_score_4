import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
//home page get data from api using axios
 class home extends Component {
    state={
        tests:null
    }
    componentDidMount(){
        axios.get('/tests')
        .then((res) =>{
            console.log(res.data);
            this.setState({
                tests: res.data
            })
        })
        .catch((err) => console.log(err));
    }
    render() {
        let recentTestMarkup = this.state.tests ? (
            this.state.tests.map(test= <p>{test.field}</p>)
        ): <p> Loading...</p>
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentTestMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p> Profile..</p>
                </Grid>
            </Grid>
        )
    }
}

export default home;
