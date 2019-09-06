import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.styl'; 

class User extends React.Component{
    componentDidMount() {
        document.title="Aigis - 埃癸斯风险控制系统";
    }
    render () {
        var userInfo = this.props.userInfo
        return (
            <div className="user-wrap">
                <div className="user-info-wrap">
                    <div className="info">
                        <NavLink to="./common/userInfo" className="image">
                            <img src={userInfo.avatar} alt="" />
                        </NavLink>
                        <div className="name">
                            <span className="title">{userInfo.nickname}</span>
                            <i className={userInfo.certificateType?"icon-vip vip":"icon-vip normal"}></i>
                        </div>
                    </div>
                    <div className="background">
                        <img src={userInfo.avatar} alt="" />
                    </div>
                </div>
                <div className="user-list-wrap">              
                    <div className="card">
                        <div className="card-part line" >
                            <NavLink to="./common/message" className="card-part-item">
                                <img src="../assets/image/icon_user_messege@3x.png" alt="" />
                                <span className="text">消息中心</span>
                                <i className="icon-right"></i>
                            </NavLink>
                            <NavLink to="./common/collect" className="card-part-item">
                                <img src="../assets/image/icon_user_draft@3x.png" alt="" />
                                <span className="text">我的收藏</span>
                                <i className="icon-right"></i>
                            </NavLink>
                            <NavLink to="./login/forget" className="card-part-item">
                                <img src="../assets/image/icon_user_forget@3x.png" alt="" />
                                <span className="text">修改密码</span>
                                <i className="icon-right"></i>
                            </NavLink>
                        </div>
                        <div className="card-part" >
                            <NavLink to="./common/setting" className="card-part-item" >
                                <img src="../assets/image/icon_user_setting@3x.png" alt="" />
                                <span className="text">设置</span>
                                <i className="icon-right"></i>
                            </NavLink >
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(User);