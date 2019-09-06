import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import { getLoginByMobileCode, getMobileCode } from '../../api';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../redux/action';
import cookie from '../../common/js/cookie';
import md5 from "md5";
import './index.styl'

class Login extends React.Component {
    state = {
        sendText: '发送验证码',
        count: 60,
        liked: true
    }
    static propTypes = {
        form: formShape
    }
    send = () => {
        this.props.form.validateFields(['username'], (error, value) => {
            console.log(error, value)
            if (error == null) {
                let formValue = this.props.form.getFieldsValue();
                let sysTime = (Date.parse(new Date()) / 1000).toString();
                let mobileNumber = formValue.username.replace(/\s*/g,"");
                let secret_key = "slkdjf8wekk12sdksldfl12dljdsk"
                let secretStr = md5(`${secret_key}${mobileNumber}${sysTime}${2}`)
                getMobileCode({
                    mobileNumber: mobileNumber,
                    timestamp: sysTime,
                    usage: 2
                }, secretStr
                ).then(res => {
                    if (res.errorMessage) {
                        Toast.fail(`${res.errorMessage}`)
                    } else {
                        Toast.success(`${res}`)
                        let timer = setInterval(() => {
                            this.setState({
                                liked: false,
                                count: this.state.count - 1
                            }, () => {
                                if (this.state.count == 0) {
                                    clearInterval(timer);
                                    this.setState({
                                        liked: true,
                                        count: 60,
                                        sendText: '重新发送'
                                    })
                                }
                            })
                        }, 1000)  
                    }
                })
            }      
        }) 
    }
    submit = () => {
        const _this = this; 
        this.props.form.validateFields((error, value) => {
            console.log(error, value)

            let sysTime = (Date.parse(new Date()) / 1000).toString();
            let mobileNumber = value.username.replace(/\s*/g,"");
            let mobileCode = value.code;
            let secret_key = "slkdjf8wekk12sdksldfl12dljdsk"
            let secretStr = md5(`${secret_key}${mobileCode}${mobileNumber}${sysTime}`)
            if (error == null) { 
                //console.log('login')  
                const { dispatch } = this.props;
                dispatch(saveUserInfo(null));
                cookie.delCookie('session'); 
                getLoginByMobileCode({
                    mobileNumber: mobileNumber,
                    mobileCode: mobileCode,
                    timestamp: sysTime
                }, secretStr).then(res => {
                    console.log(res)
                    if (res) {
                        if (!res.errorMessage) {
                            const { dispatch } = this.props;
                            dispatch(saveUserInfo(res))
                            cookie.setCookie('session', res.session) 
                            Toast.success('成功登录！');    
                            window.location.href = '/index';                   
                        } else {
                            Toast.fail(`${res.errorMessage}`)
                        }
                    }        
                })    
                    
            }
        })
    }
    render() {
        let errorsName;
        let errorsPsw;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className="login-wrap" >
                <div className="login-title">登录</div>
                <List>
                    <InputItem
                        {...getFieldProps('username', {
                            rules: [
                                {
                                    required: true,
                                    message: ' 请输入手机号码 '
                                },
                                {
                                    len: 13,
                                    message: ' 请输入11位手机号码 '
                                }
                            ]
                        })}
                        type="phone"
                        clear
                        placeholder="请输入手机号码"
                    />
                    {
                        (errorsName = getFieldError('username')) ? 
                        <div className="errorTips">{errorsName.join(',')}</div> : null
                    }
                </List>
                
                <List style={{marginTop: '2rem'}}>
                    <InputItem
                        {...getFieldProps('code', {
                            rules: [
                                {
                                    required: true,
                                    message: ' 请输入短信验证码 '
                                }
                            ]
                        })}
                        clear
                        placeholder="请输入短信验证码"
                    />
                    {
                        (errorsPsw = getFieldError('code')) ? 
                        <div className="errorTips">{errorsPsw.join(',')}</div> : null
                    }
                    {
                        this.state.liked ? 
                        <div className="send" onClick={this.send}>{this.state.sendText}</div> : 
                        <div className="count">{this.state.count + 's'}</div>
                    }
                </List>
                
                <Button type="primary" className="login-submit" onClick={this.submit}>登 录</Button>
                <div className="login-info">
                    <NavLink to="/login/psw">密码登录</NavLink>
                    <NavLink to="/login/forget" className="link">忘记密码</NavLink>
                </div>          
            </div>
        );
    }
}
const CustomForm = createForm()(Login);
export default connect()(CustomForm);