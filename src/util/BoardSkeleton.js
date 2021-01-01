import React, {Fragment} from 'react';
import boardSkeleton from '../images/boardSkeleton.jpg'
import PropTypes from 'prop-types';
//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    board: {
        marginBottom: "20",
        paddingRight: "20",
        width: '90%',
    },
    CardContent:{
        width : "100%",
        flexDirection: 'column',
        padding: 25
    },
    cover:{
        minWidth:200,
        objectFit: 'cover'
    }
})

const BoardSkeleton = (props) => {
    const {classes} = props;
    const content = 
        <Card className={classes.board}>
            <CardMedia  image={boardSkeleton}/>
            <CardContent className={classes.handle}>
               Player1 vs Player2 
            </CardContent>
        </Card>
    return <Fragment>{content}</Fragment>
}

BoardSkeleton.propTypes={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BoardSkeleton);