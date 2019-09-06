import React from 'react'
import { Modal } from 'antd-mobile';

import './common/style/admin.styl';
import cookie from './common/js/cookie.js';

const alert = Modal.alert
export default class Common extends React.Component {
    state = {
        session: cookie.getCookie('session')
    }
    componentDidMount () {
        if (!this.state.session) {
            this.showConfirm()
        }
    }
    showConfirm = () => {
        alert('请您先进行登录', '', [
            { text: '关闭', onPress: ()=>window.location.href = '/login', style: {color: 'rgb(171, 171, 171)'}},
            { text: '去登录', onPress: ()=>window.location.href = '/login'}
        ])
    }
    render() {      
        return (
            this.state.session ?
            <div style={{height:'100%'}}>
                {this.props.children}
            </div>
            : null
        );
    }
}