import React from 'react';
import './styles/SelectButton.css';

import Card from '@material-ui/core/Card';

import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';


const SelectButton = (props) => {
  const { data } = props;
  
    
  return (
    <Card className="select-buttons" >
      
        { data.win &&
            <MyButton variant="contained" color="primary" component={Link} to={"/login"}>
                New game
            </MyButton>
        }
                        
      
            <MyButton btnClassName="btn-pos" variant="contained" color="primary" component={Link} to={"/login"}>
              Leave game
            </MyButton>
    
    </Card>

  );
};

export default SelectButton;