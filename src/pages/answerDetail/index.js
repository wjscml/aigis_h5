import React from 'react';
import Scroll from '../../components/Scroll';
import { getPostContent } from '../../api';
import cookie from '../../common/js/cookie.js';
import './index.styl'

export default class AnswerDetail extends React.Component {
    state = {
        session: cookie.getCookie('session'),
        qusetionData: [],
        data: []
    }
    componentDidMount () {
        let Id = this.props.match.params.answerId;
        //let split_info = info.split(/[:/]/)
        //console.log(info, split_info)
        if (Id) {
            this.getContent(Id);
        }
    }
    getContent = (Id) => {
        getPostContent({
            session: this.state.session,
            postId: Id
        }).then(res => {
            this.setState({
                qusetionData: res.ask,
                data: res
            })
        })
    }
    close = () => {
        window.close()
    }
    render () {
        return (  
            <div className="answer-detail-wrap">
                <div className="top">                 
                    <i className="icon-back" onClick={this.close}></i>
                    <span className="title">咨询详情</span>         
                </div>
                <Scroll>
                <div className="main">
                    {
                        this.state.data ?
                        <div className="content-wrap">
                            <div className="time">
                                <img className="icon-time" src="../../assets/image/icon_point.png" alt="icon_point" />
                                <span>{this.state.data.date} {this.state.data.time}</span>
                            </div>
                            <div className="text">
                                {   this.state.data.content }
                                {
                                    this.state.data.images ?
                                    <div className="images-content"> 
                                    {
                                        this.state.data.images.length == 1 ?
                                        <img src={this.state.data.images[0].image} className="picOne" alt="" /> :
                                        this.state.data.images.map((image, index) => {
                                            return <img src={image.image} className="pic" alt="" key={index} />
                                        })
                                    }
                                    </div> : null
                                }
                            </div>                   
                        </div> :null
                    }
                    {
                        this.state.qusetionData ?
                        <div className="qusetion-wrap">
                            <div className="title">
                                <img className="icon-time" src="../../assets/image/icon_point.png" alt="icon_point" />
                                <span>咨询问题</span>
                            </div>
                            <div className="text">
                                {this.state.qusetionData.content}
                            </div>
                            <div className="time">{this.state.qusetionData.date} {this.state.qusetionData.time}</div>   
                        </div> : null
                    }                           
                </div>
                </Scroll>
            </div> 
        )
    }
}