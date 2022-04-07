import React, {Component} from 'react';
import './Header.css';
import img from '../../assets/header-logo.png';
export default class Header extends Component {
  render (){
      return<div className ='header'> <img className = 'logo' src = {img} ></img> </div>;
  
}
}

