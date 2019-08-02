import React from 'react';
import { List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import { getLogin } from '../../api';
import './index.styl'

class Login extends React.Component {
    state = {
        
    }
    static propTypes = {
        form: formShape
    }
    submit = () => {
        const _this = this; 
        this.props.form.validateFields((error, value) => {
            console.log(error, value)
            if (error == null) {
                
                //console.log('login')
                _this.login({
                    mobileNumber: value.username.replace(/\s*/g,""),
                    password: value.password
                });        
                    
            }
        })
    }
    login = (params) => {
        console.log('login')  
        getLogin(params).then(res => {
            console.log(res)
            if (res) {
                if (!res.errorMessage) {
                    //const { dispatch } = this.props;
                    //dispatch(saveUserInfo(res))
                    //cookie.setCookie('session', res.session)
                    //message.success('成功登录！');   
                    Toast.success('成功登录！');    
                    //window.location.href = '/index';                   
                } else {
                    Toast.fail(`${res.errorMessage}`)
                }
            }        
        })
    }
    failToast = () => {
        Toast.fail('load', 1)
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
                        {...getFieldProps('password', {
                            rules: [
                                {
                                    required: true,
                                    message: ' 请输入您的密码 '
                                }
                            ]
                        })}
                        type="password"
                        clear
                        placeholder="请输入密码"
                    />
                    {
                        (errorsPsw = getFieldError('password')) ? 
                        <div className="errorTips">{errorsPsw.join(',')}</div> : null
                    }
                </List>
                
                <Button type="primary" className="login-submit" onClick={this.submit}>登 录</Button>
                <div className="login-info">
                    <span>密码登录</span>
                    <span>忘记密码</span>
                </div>          
                
            </div>
        );
    }
}
export default createForm()(Login);