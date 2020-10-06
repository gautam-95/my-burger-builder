import React from 'react';
import burerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = props => (
    <div className={classes.Logo}>
        <img src={burerLogo} alt="MyBurger"/>
    </div>
);

export default logo;