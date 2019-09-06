import React from 'react';
import { NavLink } from 'react-router-dom';
//import { List } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMessageList } from '../../api';

import cookie from '../../common/js/cookie.js';

import './index.styl'; 

class MessageCenter extends React.Component{
    state = {
        session: cookie.getCookie('session'),
    }
    componentDidMount () {
        document.title="消息中心 - Aigis - 埃癸斯风险控制系统";
        this.getList()
    }
    getList = () => {
        getMessageList({
            session: this.state.session,
            page: 0,   
        }).then(res => {
            //console.log(res)
        })
    }
    close = () => {
        window.location.href = "/user"
    }
    render () {
        return (
            <div className="message-wrap">
                <div className="top">                 
                    <i className="icon-back" onClick={this.close}></i>
                    <span className="title">消息中心</span>         
                </div>         
                <div className="list-wrap">                              
                    
                </div>
            </div>
        )
    }
}
export default connect()(MessageCenter);