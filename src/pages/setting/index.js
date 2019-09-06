import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from 'antd-mobile';
//import { List } from 'antd-mobile';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../redux/action';
import cookie from '../../common/js/cookie.js';
import './index.styl'; 
const alert = Modal.alert;

class Setting extends React.Component{
    componentDidMount() {
        document.title="设置 - Aigis - 埃癸斯风险控制系统";
    }
    close = () => {
        window.location.href = '/user'
    }
    confirm = () => {
        alert('是否确认要退出？', '', [
            { text: '取消', style: {color: 'rgb(171, 171, 171)'}},
            { text: '确定', onPress: () => this.exit() }
        ])
    }
    exit = () => {
        const { dispatch } = this.props;
        dispatch(saveUserInfo(null));
        cookie.delCookie('session');
        window.location.href = '/login';
    }
    render () {
        return (
            <div className="setting-wrap">
                <div className="top">                 
                    <i className="icon-back" onClick={this.close}></i>
                    <span className="title">设置</span>         
                </div>         
                <div className="setting-list-wrap">                              
                    <NavLink to="./about" className="list-item">
                        <img src="../assets/image/icon_setting_about@3x.png" alt="" />
                        <span className="text">关于我们</span>
                        <i className="icon-right"></i>
                    </NavLink>
                    <div className="list-item" onClick={this.confirm}>
                        <img src="../assets/image/icon_setting_exit@3x.png" alt="" />
                        <span className="text">退出登录</span>
                        <i className="icon-right"></i>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(Setting);