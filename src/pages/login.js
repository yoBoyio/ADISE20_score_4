import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import AppIcon from '../images/score4.png';
import axios from 'axios';
import {Link} from 'react-router-dom';
//MUI 
import CircularProgress from '@material-ui/core/CircularProgress';
import Typogrphy from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = ({
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '10 auto 10 auto'
    },
    textField:{
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
})
//login page, post data to backend to auth user and store token

 class login extends Component {
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          loading: false,
          errors: {}
        };
      }
     handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
      handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const userData = {
        email: this.state.email,
        password: this.state.password};
              
        axios.post('/login',userData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem(`FBidToken','Bearer ${res.data.token}`);

            this.setState({
                loading:false
            });
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })
    }
    render() {
        const {classes} = this.props;
        const { errors, loading } = this.state;

        return (
           <Grid container className={classes.form}>
               <Grid item sm/> 
               <Grid item sm>
                <img src={AppIcon} alt="Score4" width="100px" className={classes.image}/>
                <Typogrphy variant="h2" className={classes.pageTitle}>
                    Login
                </Typogrphy>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                     id="email"
                     name="email"
                     type="email" 
                     label="Email" 
                     className={classes.textField}
                     helperText={errors.email}
                     error={errors.email ? true : false}
                     value={this.state.email} 
                     onChange={this.handleChange} 
                     fullWidth/>
                    <TextField 
                    id="password" 
                    name="password" 
                    type="password" 
                    label="Password" 
                    className={classes.textField}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    fullWidth/>
                    {errors.general && (
                        <Typogrphy variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typogrphy>
                    )}
                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary" 
                    className={classes.button}
                    disabled={loading}> 
                    Login 
                    {loading && (
                        <CircularProgress size={30} className={classes.progress}/>
                    )}
                    </Button>
                    <br/>
                    <small>dont have an account ? sign up <Link to="/signup">here</Link></small>
                </form>
               </Grid>
               <Grid item sm/>
           </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(login);