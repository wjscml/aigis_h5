import React from 'react';
import { connect } from 'react-redux';
import Scroll from '../../components/Scroll';
import ScrollX from '../../components/ScrollX';
import LoadingTips from '../../components/LoadingTips';
import ArticleDetail from '../../components/ArticleDetail';
import { DatePicker, Toast } from 'antd-mobile';
import NoResult from '../../components/NoResult';
import { getReportCategories, getReportList, getSpecialList, getReportContent } from '../../api';
import { formatDate } from '../../common/js/data.js';
import cookie from '../../common/js/cookie';
import './index.styl';

const nowTimeStamp = Date.now();
const minDate = new Date(2018, 12)
const maxDate = new Date(nowTimeStamp + 1e7)
const LIMIT = 10
class Report extends React.Component {
    state = {
        session: cookie.getCookie('session'),
        reportNav: [ '公开研报', '专享研报'],
        type: 0,
        subType: 1,
        subNavData: [],
        listO: {},
        list: [],
        page: 0,
        tips: '上拉加载更多',
        isLoading: null,
        hasData: true,
        showDetail: null,
        reportInfo: [],
        content: ''
    }
    componentDidMount() {
        document.title="Aigis - 埃癸斯风险控制系统";
        this.getReportData(this.state.type)     
    }
    getReportData = (type) => {
        if (type == 0) {
            getReportCategories().then(res => {
                let subNavData = []
                for (let i in res) {
                    let o = {};
                    o.name = res[i];
                    o.cateId = i;
                    subNavData.push(o)
                }
                this.setState({ subNavData })
            })
            this.getList(this.state.subType)          
        }
        if (type == 1) {
            getSpecialList({
                session: this.state.session,
                page: 0,
                limit: LIMIT
            }).then(res => {
                if (!res.length&&res.length!==0) {
                    let listO = res;
                    let list = [];
                    for (let i in res) {
                        list = list.concat(res[i])
                    }
                    this.setState({ 
                        listO, 
                        list,
                        hasData: true
                    })     
                } else {
                    this.setState({
                        hasData: false
                    }) 
                }                               
            })
        }
    }
    getList = (type) => {
        getReportList({
            page: this.state.page,
            cateId: type
        }).then(res => {
            this.setState({
                list: res
            })   
        })
    }
    loadmore = () => {    
        let page = this.state.page + 1
        this.setState({
            tips: '加载中...',
            isLoading: true,
            page
        })
        getReportList({
            page,
            cateId: this.state.subType
        }).then((res) => {
            this.setState({
                isLoading: false
            })
            if (res) {
                const list = this.state.list.concat(res)
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
    loadmoreSpecial = () => {
        let page = this.state.page + 1
        this.setState({
            tips: '加载中...',
            isLoading: true,
            page,
            limit: LIMIT
        })
        getSpecialList({
            session: this.state.session,
            page
        }).then((res) => {
            this.setState({
                isLoading: false
            })
            if (!res.length&&res.length!==0) {
                let listO = {};
                listO = Object.assign(listO, this.state.listO, res);

                let list = [];
                for (let i in res) {
                    list = list.concat(res[i])
                }
                list = this.state.list.concat(list)
                this.setState({
                    listO,
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
        if (this.state.type == 0) {
            this.loadmore()
        }
        if (this.state.type == 1) {
            this.loadmoreSpecial()
        }
    }
    handleSelect = (i) => {
        this.setState({
            list: [],
            type: i,
            page: 0,
            tips: '上拉加载更多',
            isLoading: null
        })
        this.getReportData(i)
    }
    handleChange = (index) => {
        this.setState({subType: index + 1})
        this.getList(index + 1)
        this.refs.listScroll.scrollTop()
    }
    changeTime = (date) => {
        let time = formatDate(date)
        if (this.state.listO[time]) {
            let list = this.state.listO[time]
            this.setState({ 
                list
            })
        } else {
            Toast.info(`没有 ${time} 的内容`)
            this.setState({ 
                list: []
            })
        }
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
        //window.open(`/common/report/${item.id}`, '_blank') 
        this.setState({
            showDetail: true,
            reportInfo: [item, i]
        })
    }
    close = () => {
        this.setState({
            showDetail: false
        })
    }
    
    render() {
        return (
            <div className="report-wrap"> 
                {
                    this.state.showDetail ?
                    <ArticleDetail data={this.state.reportInfo} content={this.state.content} close={this.close} /> 
                    : null
                }
                
                <div className="report-top">
                    <div className="nav-wrap">
                        {
                            this.state.reportNav.map((item, index) => {
                                return <div className={this.state.type===index ? "nav-btn nav-btn-s" : "nav-btn"} 
                                    onClick={()=>this.handleSelect(index)}
                                    key={index}>
                                    {item}
                                </div>
                            })
                        }                  
                    </div>          
                    {
                        this.state.type === 1 && this.state.hasData ?
                        <DatePicker
                            mode="month"
                            maxDate={maxDate}
                            minDate={minDate}                       
                            onChange={this.changeTime}
                        >
                            <div className="select-btn" >
                                <i className="icon-filter"></i>
                            </div>
                        </DatePicker> 
                        : null
                    }        
                </div>               
                
                <div className="report-main">                
                    {
                        this.state.type===0 ?
                        <div>
                            <ScrollX navlist={this.state.subNavData} type={this.state.subType - 1} handleChange={this.handleChange} />
                            <div className="report-list">
                                <Scroll pullUpLoad={true} probeType={2} touchEnd={this.touchEnd} ref="listScroll">
                                    <div className="content"> 
                                        {
                                            this.state.list.map((item, index) => {
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
                                        {
                                            this.state.list.length ?
                                            <LoadingTips tips={this.state.tips} isLoad={this.state.isLoading} />
                                            : null
                                        }                  
                                    </div>
                                </Scroll>   
                            </div>   
                        </div>
                        : null
                    } 
                    {
                        this.state.type === 1 ?
                        <div className="news-list">
                            <Scroll pullUpLoad={true} probeType={2} touchEnd={this.touchEnd} ref="listScroll">
                                <div className="content"> 
                                    {
                                        this.state.list.map((item, index) => {
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
                                    {
                                        this.state.list.length > 5 ?
                                        <LoadingTips tips={this.state.tips} isLoad={this.state.isLoading} />
                                        : null
                                    }                  
                                </div> 
                                {
                                    this.state.hasData ? null :
                                    <NoResult tips="暂无数据~" />
                                }        
                            </Scroll>                   
                        </div> 
                        : null
                    }            
                </div>
            </div>   
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(Report);