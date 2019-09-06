import React from 'react';
import Scroll from '../../components/Scroll';
import ScrollX from '../../components/ScrollX';
import LoadingTips from '../../components/LoadingTips';
import ArticleDetail from '../../components/ArticleDetail';
import { Tabs } from 'antd-mobile';
import { getCategories, getNewsList, getNewsDetail } from '../../api';

import './index.styl';

export default class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navlist: [],
            page: 0,
            type: 0,
            data: [],
            list: [],
            tips: '上拉加载更多',
            isLoading: null,
            showDetail: null
        }
    }
    
    componentWillMount () {
        this.getNavList()   
        this._getNewsList(this.state.type) 
    }
    componentDidMount() {
        document.title="Aigis - 埃癸斯风险控制系统";
    }

    getNavList = () => {
        getCategories({
            isShowLoading: false
        }).then(res => {
            if (res) {
                this.setState({
                    navlist: res
                })
            }
        })
    }
    _getNewsList = (type) => {
        getNewsList({
            page: 0,
            type: type
        }).then((res) => {
            if (res) {
                this.setState({
                    data: res,
                    list: res
                })
            }
        })
    };
    loadmore = () => {    
        let page = this.state.page + 1
        this.setState({
            tips: '加载中...',
            isLoading: true,
            page
        })
        getNewsList({
            page,
            type: this.state.type
        }).then((res) => {
            this.setState({
                isLoading: false
            })
            if (res) {
                const data = this.state.data.concat(res)
                this.setState({
                    data,
                    list: data,
                    tips: '上滑加载更多'
                })
            } else {
                this.setState({
                    tips: '没有更多数据了'
                })
            }
        })
    }
    handleChange = (index) => {
        this.setState({type: index})
        this._getNewsList(index)
        this.refs.listScroll.scrollTop()
    }
    touchEnd = () => {
        this.loadmore()
    }
    toDetail = (id) => {
        //window.open(`./common/news/${id}`)
        getNewsDetail({
            session: this.state.session,
            articleId: id
        }).then(res => {
            this.setState({
                data: [res, '_NEWS_'],
                content: res.content,
                showDetail: true
            })
        })
    }
    close = () => {
        this.setState({
            showDetail: false
        })
    }
 
    render() {
        return (
            <div className="news-wrap">
                <div className="news-top">新闻视点</div>
                <ScrollX navlist={this.state.navlist} type={this.state.type} handleChange={this.handleChange} />
                <div className="news-list">
                    <Scroll pullUpLoad={true} probeType={2} touchEnd={this.touchEnd} ref="listScroll">
                        <div className="content"> 
                            {
                                this.state.list.map((item, index) => {
                                    return <div className="news-item" key={index} onClick={()=>this.toDetail(item.id)}>
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
                                this.state.list.length ?
                                <LoadingTips tips={this.state.tips} isLoad={this.state.isLoading} />
                                : null
                            }            
                        </div>                     
                    </Scroll>                  
                </div>     
                {
                    this.state.showDetail ?
                    <ArticleDetail data={this.state.data} content={this.state.content} close={this.close} />
                    : null
                }      
            </div>
        )
    }
}
