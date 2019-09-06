import React from 'react';
import { Modal, Tabs } from 'antd-mobile';
import Scroll from '../../components/Scroll';
import ArticleDetail from '../../components/ArticleDetail';
import { getReportContent} from '../../api';
import { connect } from 'react-redux';
//import { saveUserInfo } from '../../redux/action';
import cookie from '../../common/js/cookie.js';
import './index.styl'; 
//const alert = Modal.alert;

const tabs = [
    { title: '新闻视点' },
    { title: '市场报告' },
    { title: '专享报告' }
]
class Collect extends React.Component{
    state= {
        session: cookie.getCookie('session'),
        showDetail: null,
        reportInfo: [],
        content: ''
    }
    componentDidMount() {
        document.title="我的收藏 - Aigis - 埃癸斯风险控制系统";
    }
    close = () => {
        //window.history.back(-1);
        //this.props.history.goBack();
        window.location.href = '/user'
    }
    hide = () => {
        this.setState({
            showDetail: false
        })
    }
    toDetail = (item, i) => {
        if (i === '_REPORTS_VIP_') {
            getReportContent({
                session: this.state.session,
                reportId: item.id
            }).then(res => {
                let content = res.content
                this.setState({
                    content
                })  
            })
        }
        this.setState({
            showDetail: true,
            reportInfo: [item, i]
        })
    }
    render () {
        return (
            <div className="collect-wrap">
                <div className="top">                 
                    <i className="icon-back" onClick={this.close}></i>
                    <span className="title">我的收藏</span>         
                </div>         
                <Tabs tabs={tabs} 
                    tabBarBackgroundColor="rgb(245, 245, 245)" 
                    tabBarInactiveTextColor="rgb(94,94,94)"
                >
                    <div className="collect-content">
                        <Scroll>
                            <div className="content">
                            {
                                this.props.favoriteList.map((item, index) => {
                                    return <div className="news-item" key={index} onClick={()=>this.toDetail(item, '_NEWS_')}>
                                        <div className="image">
                                            <img src={item.thumb} alt={item.title} />
                                        </div>
                                        <div className="right">
                                            <div className="title">{item.title}</div>
                                            <div className="info">
                                                <span>{item.author_name}</span>
                                                <span>{item.publish_time}</span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            </div>
                        </Scroll>
                    </div>
                    <div className="collect-content">
                        <Scroll>
                            <div className="content">
                            {
                                this.props.favoriteReportsList.map((item, index) => {
                                    return <div className="report-item" key={index} onClick={()=>this.toDetail(item, '_REPORTS_')}>
                                        <div className="title">
                                            {item.title}
                                        </div>
                                        <div className="info">                                                    
                                            <div className="name">
                                                <span>{item.future_company}</span> ·
                                                <span>{item.author_name}</span>        
                                            </div>
                                            <div className="time">{item.report_time}</div>
                                        </div>
                                    </div>
                                })
                            }
                            </div>
                        </Scroll>
                    </div>
                    <div className="collect-content">
                        <Scroll>
                            <div className="content">
                            {
                                this.props.favoriteVipList.map((item, index) => {
                                    return <div className="news-item" key={index} onClick={()=>this.toDetail(item, '_REPORTS_VIP_')}>
                                        <div className="image">
                                            <img src={item.thumb} alt={item.title} />
                                        </div>
                                        <div className="right">
                                            <div className="title">{item.title}</div>
                                            <div className="info">
                                                <span>{item.author_name}</span>
                                                <span>{item.publish_time}</span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            </div>
                        </Scroll>
                    </div> 
                </Tabs>
                {
                    this.state.showDetail ?
                    <ArticleDetail data={this.state.reportInfo} content={this.state.content} close={this.hide} /> 
                    : null
                }
            </div>
        )
    }
}
export default connect(state => ({
    favoriteList: state.favoriteList,
    favoriteReportsList: state.favoriteReportsList,
    favoriteVipList: state.favoriteVipList,
}))(Collect);