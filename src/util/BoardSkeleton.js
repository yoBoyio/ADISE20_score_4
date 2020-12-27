import React, {Fragment} from 'react';
import boardSkeleton from '../images/boardSkeleton.jpg';
import PropTypes from 'prop-types';
//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    board: {
        display:'flex',
        margin: auto,
        width: '100%',
        
    }
})

const BoardSkeleton = (props) = {
    

}


export default withStyles(styles)(BoardSkeleton);