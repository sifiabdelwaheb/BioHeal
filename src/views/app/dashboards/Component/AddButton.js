import React from 'react';
import classes from '../style.module.css';
import iconPlus from '../../../../assets/svg/plus.svg';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Button } from 'reactstrap';

const AddButton = ({ addfunction, style }) => (
  <div className={classes.paddingEmp} style={style}>
    <Button
      style={{
        backgroundColor: '#e34b1b',
        fontWeight: 'bold',

        borderColor: '#e34b1b',
      }}
      size='sm'
      onClick={() => addfunction()}>
      <IntlMessages id='pages.add-new' />
      <img src={iconPlus} alt='iconplus' className={classes.iconplus} />
    </Button>
  </div>
);
export default AddButton;
