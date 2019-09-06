import React from 'react';
import { NavLink } from 'react-router-dom';
import Scroll from '../../components/Scroll';
import LoadingTips from '../../components/LoadingTips';
import { getPostList, checkUnReadMessage, getPostContent } from '../../api';
import cookie from '../../common/js/cookie.js';
import './index.styl'

export default class Index extends React.Component {
    state = {
        session: cookie.getCookie('session'),
        list: [],
        firstList: [],
        page: 0,
        tips: '上拉加载更多',
        isLoading: null
    }
    componentDidMount() {
        document.title="Aigis - 埃癸斯风险控制系统";
        this.getIndexList()
    }
    showConfirm = () => {
        console.log('123')
    }
    formatDate = (res) => {
        let dateO = res.map(item => {
            return item.date
        })

        //返回去重之后的数组
        let date = [];
        dateO.forEach(item => {
            !(date.indexOf(item) > -1) && date.push(item)
        })

        let list = [];
        date.forEach(dateItem => {
            list.push(res.filter(item => {
                return item.date == dateItem
            }))
        })
        return list  
    }
    getIndexList = () => {
        getPostList({
            session: this.state.session,
            page: 0
        }).then(res => {
            let list = this.formatDate(res)    
            this.setState({
                list,
                firstList: res
            })
        })
    }
    loadmore = () => {
        let page = this.state.page + 1;
        this.setState({
            tips: '加载中...',
            isLoading: true,
            page
        })
        getPostList({
            session: this.state.session,
            page
        }).then(res => {
            this.setState({
                isLoading: false
            })
            if (res.length) {
                let newlist = this.formatDate(res)
                let list = this.state.list.concat(newlist)
                this.setState({
                    list,
                    tips: '上拉加载更多'
                })
            } else {
                this.setState({
                    tips: '没有更多数据了'
                })
            }
        })
    }
    touchEnd = () => {
        this.loadmore()
    }
    render() {
        return (
            <div className="index-wrapper">    
                <IndexTopBar /> 
                <IndexMain firstList={this.state.firstList} list={this.state.list} touchEnd={this.touchEnd} tips={this.state.tips} isLoading={this.state.isLoading} />
            </div>   
        );
    }
}
class IndexTopBar extends React.Component {
    state = {
        session: cookie.getCookie('session'),
        exist: null
    }
    componentDidMount () {
        this.checkMessage()
    }
    checkMessage = () => {
        checkUnReadMessage({
            session: this.state.session
        }).then(res => {
            if (res.exist !== 0) {
                this.setState({
                    exist: false
                })
            } else {
                this.setState({
                    exist: true
                })
            }
        })
    }
    openSearch = () => {
        window.location.href = './common/search'
    }
    render() {
        return (
            <div className="top-bar-wrapper">     
                <NavLink to="./common/message" className="notice">
                    <i className="icon-notice" />
                    {
                        this.state.point ?
                        <div className="point"></div>
                        : null
                    } 
                </NavLink>
                <NavLink to="./common/search" className="search" >
                    <i className="icon-search"></i>
                </NavLink>
                <NavLink to="./common/edit" className="select">
                    <i className="icon-edit" />
                </NavLink>
            </div>   
        );
    }
}
class IndexMain extends React.Component {
    state = {
        session: cookie.getCookie('session'),
        imgUrl: '',
        qusetionData: [],
        data: []
    }
    toDetail = (id) => {
        getPostContent({
            session: this.state.session,
            postId: id
        }).then(res => {
            this.setState({
                qusetionData: res.ask,
                data: res
            })   
        })
        this.answerPage.show()    
    }
    toImg = (e, url) => {
        e.stopPropagation();
        //window.open(url)
        this.setState({
            imgUrl: url
        })
        this.imgPage.show()
    }
    render() {
        return (
            <div className="main-wrapper">     
                <Scroll pullUpLoad={true} probeType={2} touchEnd={this.props.touchEnd}>
                    <div className="main-content">
                    {
                        this.props.list.map((items, index) => {
                            return <div className="column-wrap" key={index}>
                                <div className="date">{items[0].date}</div>
                                {
                                    items.map((item, index) => {
                                        return <div className="content" key={index} onClick={()=>this.toDetail(item.id)}>
                                            <div className="time">
                                                <img className="icon-time" src="./assets/image/icon_point.png" alt="icon_point" />
                                                <span>{item.time}</span>
                                            </div>
                                            <div className="text" style={item.ask_time?{fontWeight:600}:{}}>
                                                {
                                                    item.ask_time ?
                                                    <span>
                                                        <span className="tips">—— Aigis【回复】</span>
                                                        {/* <i className="ask-time">#{item.ask_time}#</i> */}
                                                        <br />
                                                    </span>
                                                    : null
                                                }
                                                { item.content }
                                                {
                                                    item.images.length ?
                                                    <div className="images-content">                           
                                                        {
                                                            item.images.length == 1 ?
                                                            <div style={{backgroundImage:`url(${item.images[0].image})`}} className="picOne" onClick={(e)=>this.toImg(e, item.images[0].image)} ></div> :
                                                            item.images.map((image, index) => {
                                                                return <div style={{backgroundImage:`url(${image.image})`}} className="pic" key={index} onClick={(e)=>this.toImg(e, image.image)} />
                                                            })
                                                        }
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                    {
                        this.props.firstList.length > 9 ?
                        <LoadingTips tips={this.props.tips} isLoad={this.props.isLoading} />
                        : null
                    }  
                    </div>
                </Scroll>
                <ImgContainer url={this.state.imgUrl} onRef={(ref) => {this.imgPage = ref}} />
                <AnswerDetail data={this.state.data} qusetionData={this.state.qusetionData} onRef={(ref) => {this.answerPage = ref}} />
            </div>   
        );
    }
}
class ImgContainer extends React.Component {
    state = {
        visible: null
    }
    componentDidMount () {
        this.props.onRef(this)
    }
    show = () => {
        this.setState({
            visible: true
        })
    }
    hide = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        return (
            this.state.visible ?
            <div className="img-container" onClick={this.hide}>
                <img src={this.props.url} alt="" />
            </div>
            : null
        )
    }
}
class AnswerDetail extends React.Component {
    state = {
        visible: null
    }
    componentDidMount () {
        this.props.onRef(this)
    }
    show = () => {
        this.setState({
            visible: true
        })
    }
    hide = () => {
        this.setState({
            visible: false
        })
    }

    render () {
        return (  
            this.state.visible ?
            <div className="answer-detail-wrap">
                <div className="top">                 
                    <i className="icon-back" onClick={this.hide}></i>
                    <span className="title">咨询详情</span>         
                </div>
                <Scroll>
                <div className="main">
                    {
                        this.props.data ?
                        <div className="content-wrap">
                            <div className="time">
                                <img className="icon-time" src="../../assets/image/icon_point.png" alt="icon_point" />
                                <span>{this.props.data.date} {this.props.data.time}</span>
                            </div>
                            <div className="text">
                                {   this.props.data.content }
                                {
                                    this.props.data.images ?
                                    <div className="images-content"> 
                                    {
                                        this.props.data.images.length == 1 ?
                                        <img src={this.props.data.images[0].image} className="picOne" alt="" /> :
                                        this.props.data.images.map((image, index) => {
                                            return <img src={image.image} className="pic" alt="" key={index} />
                                        })
                                    }
                                    </div> : null
                                }
                            </div>                   
                        </div> :null
                    }
                    {
                        this.props.qusetionData ?
                        <div className="qusetion-wrap">
                            <div className="title">
                                <img className="icon-time" src="../../assets/image/icon_point.png" alt="icon_point" />
                                <span>咨询问题</span>
                            </div>
                            <div className="text">
                                {this.props.qusetionData.content}
                            </div>
                            <div className="time">{this.props.qusetionData.date} {this.props.qusetionData.time}</div>   
                        </div> : null
                    }                           
                </div>
                </Scroll>
            </div> 
            : null
        )
    }
}