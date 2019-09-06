import React from 'react';
import { NavLink } from 'react-router-dom';
import { List } from 'antd-mobile';
import { getAbout } from '../../api';

import './index.styl'; 

export default class Setting extends React.Component{
    close = () => {
        window.history.back(-1);
    }
    componentDidMount() {
        document.title="关于 - Aigis - 埃癸斯风险控制系统";
        this.getContent()
    }
    getContent = () => {
        getAbout().then(res => {
            console.log(res)
        })
    }
    render () {
        return (
            <div className="about-wrap">
                <div className="top">                 
                    <i className="icon-back" onClick={this.close}></i>
                    <span className="title">关于我们</span>         
                </div>           
                <div className="content">              
                        
                                   
                </div>
            </div>
        )
    }
}