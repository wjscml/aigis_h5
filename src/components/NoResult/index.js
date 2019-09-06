import React from 'react';
import './index.styl'

export default class NoResult extends React.Component {
    state = {
        
    }

    render() { 
        return (
            <div className="no-result-wrapper">
                <i className="icon-no_result"></i>
                <p>{this.props.tips}</p>
            </div>
        ) 
    }
}