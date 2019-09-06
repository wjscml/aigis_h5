import React from 'react';
//import { NavLink } from 'react-router-dom';
import { Modal, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { changeUserInfo } from '../../api';
import { saveUserInfo } from '../../redux/action';
import { getLength } from '../../common/js/data.js'

import './index.styl'; 

const prompt = Modal.prompt;
class UserInfo extends React.Component{
    componentDidMount() {
        document.title="个人信息 - Aigis - 埃癸斯风险控制系统";
    }
    changeName = () => {
        prompt('编辑你的昵称', '', [
            { text: '取消'},
            { text: '确定', onPress: value => this.submitName(value)},
        ], '', `${this.props.userInfo.nickname}`)
    }
    submitName = (name) => {
        if (getLength(name) < 21) {
            let userParam = new FormData()
            userParam.append('session', this.props.userInfo.session)
            userParam.append('nickname', name)
            changeUserInfo(userParam).then(res => {
                //console.log(res)
                if (!res.errorMessage) {
                    let userInfo = res
                    userInfo.session = this.props.userInfo.session
                    userInfo.isCertificate = this.props.userInfo.isCertificate
                    userInfo.certificateType = this.props.userInfo.certificateType
                    const { dispatch } = this.props;
                    dispatch(saveUserInfo(userInfo))
                } else {
                    Toast.fail(`${res.errorMessage}`)
                }
            })
        } else {
            Toast.fail('昵称不要超过20个字符')
        }
    }
    changeAvatar = () => {
        var file = this.fileInput.files[0]
        if (file.size < 2048000) {
            let userParam = new FormData()
            userParam.append('session', this.props.userInfo.session)
            userParam.append('User[avatar]', file)
            changeUserInfo(userParam).then(res => {
                //console.log(res)
                if (!res.errorMessage) {
                    let userInfo = res
                    userInfo.session = this.props.userInfo.session
                    userInfo.isCertificate = this.props.userInfo.isCertificate
                    userInfo.certificateType = this.props.userInfo.certificateType
                    const { dispatch } = this.props;
                    dispatch(saveUserInfo(userInfo))
                } else {
                    Toast.fail(`${res.errorMessage}`)
                }
            })
        } else {
            Toast.fail('图片大小不超过2M')
        }
    }
    close = () => {
        window.history.back(-1);
    }
    render () {
        var userInfo = this.props.userInfo
        return (
            <div className="private-wrap">
                <div className="top">                 
                    <i className="icon-back" onClick={this.close}></i>
                    <span className="title">修改个人信息</span>         
                </div>
                <div className="avatar-wrap">
                    <div className="avatar-box" >
                        <img className="avatar" src={userInfo.avatar} alt="" />
                        <img className="camera" src="../assets/image/btn_avatar@3x.png" alt="" />
                        <input className="file" type="file" accept="image/png,image/gif,image/jpeg" 
                            ref={(input) => { this.fileInput = input }} 
                            onClick={(event) => { event.target.value = null }} 
                            onChange={this.changeAvatar} 
                        />
                    </div>
                </div>
                <div className="list" >
                    <div className="list-item" onClick={this.changeName}>
                        <span className="title">昵称</span>
                        <span className="value">{userInfo.nickname}</span>
                    </div>            
                </div>   
            </div>
        )
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(UserInfo);