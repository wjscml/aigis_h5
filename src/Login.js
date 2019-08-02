import React from 'react';
import './App.styl';

export default class Login extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}