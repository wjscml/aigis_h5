import React from 'react'
import TabBar from './components/TabBar';
import { Modal } from 'antd-mobile';
//import { connect } from 'react-redux';
//import Header from './components/Header';
//import Footer from './components/Footer';
//import NavLeft from './components/NavLeft';
//import MarketsBar from './components/MarketsBar';
import './common/style/admin.styl';
import cookie from './common/js/cookie.js';

const alert = Modal.alert
export default class Admin extends React.Component {
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
            <div className="Admin" >
                <TabBar selectedTab={this.props.match.path} />       
            </div> : null
        );
    }
}