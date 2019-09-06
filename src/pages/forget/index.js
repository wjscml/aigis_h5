import React from 'react';
//import { NavLink } from 'react-router-dom';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import { getForget, getMobileCode } from '../../api';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../redux/action';
import cookie from '../../common/js/cookie';
import md5 from "md5";
import './index.styl'

const NUM_FORGET = 3
const KEY = "slkdjf8wekk12sdksldfl12dljdsk"
class Forget extends React.Component {
    state = {
        sendText: '发送验证码',
        count: 60,
        liked: true,
        step: 0,
        mobileNumber: '',
        mobileCode: ''
    }
    static propTypes = {
        form: formShape
    }
    componentDidMount() {
        document.title="忘记密码 - Aigis - 埃癸斯风险控制系统";
    }
    send = () => {
        this.props.form.validateFields(['username'], (error, value) => {
            //console.log(error, value)
            if (error == null) {
                let formValue = this.props.form.getFieldsValue();
                let sysTime = (Date.parse(new Date()) / 1000).toString();
                let mobileNumber = formValue.username.replace(/\s*/g,"");
                let secretStr = md5(`${KEY}${mobileNumber}${sysTime}${NUM_FORGET}`)
                getMobileCode({
                    mobileNumber: mobileNumber,
                    timestamp: sysTime,
                    usage: NUM_FORGET
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
    next = () => {
        this.props.form.validateFields((error, value) => {
            //console.log(error, value)
            let mobileNumber = value.username.replace(/\s*/g,"");
            let mobileCode = value.code;
            if (error == null) { 
                this.setState({
                    step: 1,
                    mobileNumber,
                    mobileCode
                })
            }
        })
    }
    submit = () => {
        this.props.form.validateFields((error, value) => {
            //console.log(error, value)
            let password = value.password;
            let mobileNumber = this.state.mobileNumber;
            let mobileCode = this.state.mobileCode;         
            if (error == null) {  
                const { dispatch } = this.props;
                dispatch(saveUserInfo(null));
                cookie.delCookie('session'); 

                getForget({
                    mobileNumber: mobileNumber,
                    mobileCode: mobileCode,
                    password: password
                }).then(res => {
                    //console.log(res)
                    if (res) {
                        if (!res.errorMessage) {
                            const { dispatch } = this.props;
                            dispatch(saveUserInfo(res));
                            cookie.setCookie('session', res.session);
                            Toast.success('密码修改成功！');
                            window.location.href = '/index';             
                        } else {
                            Toast.fail(`${res.errorMessage}`)
                            if (res.errorCode == 1) {
                                setTimeout(()=>{
                                    this.setState({
                                        step: 0
                                    })
                                }, 2500)
                            }
                        }
                    }
                })
            }
        })
    }
    close = () => {
        window.history.back(-1);
    }
    render() {
        let errorsName;
        let errorsPsw;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className="forget-wrap">
                <div className="forget-top">                 
                    <i className="icon-back" onClick={this.close}></i>
                    <span className="title">找回登录密码</span>         
                </div> 
                {
                    this.state.step == 0 ?
                    <div className="forget-first">
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
                        <Button type="primary" className="login-submit" onClick={this.next}>下一步</Button>              
                    </div>
                    :
                    <div className="forget-second">
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
                                placeholder="请设置8-16位（数字+字母）"
                            />
                            {
                                (errorsPsw = getFieldError('password')) ? 
                                <div className="errorTips">{errorsPsw.join(',')}</div> : null
                            }
                        </List>
                        <Button type="primary" className="login-submit" onClick={this.submit}>保存新密码</Button>              
                    </div>
                }
            </div>
        );
    }
}
const CustomForm = createForm()(Forget);
export default connect()(CustomForm);