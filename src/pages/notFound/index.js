import React from 'react';
import { Result } from 'antd-mobile';
import './index.styl'

export default  class NotFound extends React.Component{
    componentDidMount() {
        document.title="404 - Aigis - 埃癸斯风险控制系统";
    }
    render () {
        return (
            <div className="notFound-wrap">
                <Result 
                    img={<i className="icon-no_result"></i>}
                    title="404"
                    message="你来到了没有知识的荒原 🙊"
                    buttonText="返回首页"
                    buttonType="primary"
                    onButtonClick={()=>{
                        window.location.href = '/index'
                    }}
                />
            </div>
        )
    }
}