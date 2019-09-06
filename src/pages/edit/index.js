import React from 'react';
import { TextareaItem, ImagePicker, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Modal } from 'antd-mobile';
import { submitQuestion } from '../../api';

import './index.styl';
import cookie from '../../common/js/cookie.js';

const alert = Modal.alert
class Edit extends React.Component {
    state = {
        session: cookie.getCookie('session'),
        files: [],
        content: ''
    }
    componentDidMount () {
        document.title="咨询 - Aigis - 埃癸斯风险控制系统";
    }
    send = () => {
        this.props.form.validateFields((error, value) => {
            //console.log(error, value)
            this.setState({
                content: value.note
            })
            if (error == null) {            
                alert('', '是否提交问题', [
                    { text: '取消', style: {color: 'rgb(171, 171, 171)'}},
                    { text: '确定', onPress: this.submit, style: {color: 'rgb(0, 122, 255)'}}
                ])
            }
        })
    }
    submit = () => {
        let formData = new FormData()
        formData.append('session', this.state.session)
        formData.append('content', this.state.content)
        this.state.files.map(item => {
            return formData.append('image[]', item.file)
        })
        submitQuestion(formData).then(res => {  
            //console.log(res)
            if (!res.errorCode) {
                Toast.success('提交成功，请等待回复')
                setTimeout(() => {
                    window.location.href="./index"
                }, 2500)
            }
        })
    }
    onChange = (files, type, index) => {
        //console.log(files, type, index);
        files.forEach(item => {         
            if (item.file.size > 2048000) {
                alert('', '请上传小于2M的图片', [
                    { text: '取消', style: {color: 'rgb(171, 171, 171)'}},
                    { text: '确定', style: {color: 'rgb(0, 122, 255)'}}
                ])
                Toast.error('图片太大，请上传小于2M的图片')                    
            }
        })
        this.setState({
            files
        })  
    }
    close = () => {
        window.location.href = "/index"
    }

    render() {  
        let errorsNote;
        const { getFieldProps, getFieldError } = this.props.form;
        const { files } = this.state;
        return (
            <div className="edit-wrap" >
                <div className="edit-top">
                    <span className="cancle" onClick={this.close}>取消</span>
                    <span className="title">问题咨询</span>
                    <span className="send" onClick={this.send}>发送</span>
                </div>
    
                <div className="edit-main">
                    <div>   
                        <TextareaItem 
                            {...getFieldProps('note', {
                                rules: [
                                    {
                                        required: true,
                                        message: ' 内容不能为空 '
                                    }
                                ]
                            })}
                            placeholder="请输入您要咨询的问题..."
                            autoHeight
                            labelNumber={5}
                        />
                        {
                            (errorsNote = getFieldError('note')) ? 
                            <div className="errorTips">{errorsNote.join(',')}</div> : null
                        }
                    </div>
                    <div>
                        <ImagePicker 
                            files={files}
                            onChange={this.onChange}
                            length={3}
                            selectable={files.length < 6}
                        />
                    </div>
                </div>
            </div> 
        );
    }
}
export default createForm()(Edit);