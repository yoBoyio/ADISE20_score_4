import React, { Component ,Fragment} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton'
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//icons
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';

 class Navbar extends Component {
    render() {
        const {authenticated} = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                   {authenticated ? (
                    <Fragment>
                        <Link to="/score4">
                            <MyButton tip="Create Room">
                                <AddIcon/>
                            </MyButton>
                        </Link>   
                       <Link to="/">
                       <MyButton tip="History">
                            <HomeIcon/>
                        </MyButton>
                       </Link>
                    </Fragment>
                   ):( 
                   <Fragment>  
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/" >Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                   </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes={
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state =>({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
