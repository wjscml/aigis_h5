import React from 'react';
import './index.styl'

export default class LoadingTips extends React.Component {
    render() {
        return (
            <div className="bottom-tip">
                {
                    this.props.isLoad ?
                    <img className="image" src="./assets/loading.png" alt="" />
                    : null
                }
                <span className="loading-hook">{this.props.tips}</span>
            </div>
        )
    }
}