import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div style={{height:'100%', backgroundColor:'#fff'}}>
        {this.props.children}
      </div>
    );
  }
}