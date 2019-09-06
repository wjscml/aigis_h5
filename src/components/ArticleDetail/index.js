import React from 'react';
import Scroll from '../../components/Scroll';
import { connect } from 'react-redux';
import { saveFavoriteList, deleteFavoriteList, saveFavoriteReportsList, deleteFavoriteReportsList, saveFavoriteVipList, deleteFavoriteVipList } from '../../redux/action';

import './index.styl';

class ArticleDetail extends React.Component {
    openPdf = (url) => {
        window.open(url)
    }
    //NEWS
    getFavoriteIcon = (article) => {
        if (this.isFavorite(article)) {
            return 'icon-favor_fill'
        }
        return 'icon-favor'
    }
    toggleFavorite = (article) => {
        const { dispatch } = this.props;
        if (this.isFavorite(article)) {   
            dispatch(deleteFavoriteList(article));
        } else {
            dispatch(saveFavoriteList(article));
        }
    }
    isFavorite = (article) => {
        const index = this.props.favoriteList.findIndex((item) => {
            return item.id === article.id
        })
        return index > -1
    }
    //Reports
    getFavoriteReportsIcon = (article) => {
        if (this.isFavoriteReports(article)) {
            return 'icon-favor_fill'
        }
        return 'icon-favor'
    }
    toggleFavoriteReports = (article) => {
        const { dispatch } = this.props;
        if (this.isFavoriteReports(article)) {   
            dispatch(deleteFavoriteReportsList(article));
        } else {
            dispatch(saveFavoriteReportsList(article));
        }
    }
    isFavoriteReports = (article) => {
        const index = this.props.favoriteReportsList.findIndex((item) => {
            return item.id === article.id
        })
        return index > -1
    }
    //Reports-vip
    getFavoriteVipIcon = (article) => {
        if (this.isFavoriteVip(article)) {
            return 'icon-favor_fill'
        }
        return 'icon-favor'
    }
    toggleFavoriteVip = (article) => {
        const { dispatch } = this.props;
        if (this.isFavoriteVip(article)) {   
            dispatch(deleteFavoriteVipList(article));
        } else {
            dispatch(saveFavoriteVipList(article));
        }
    }
    isFavoriteVip = (article) => {
        const index = this.props.favoriteVipList.findIndex((item) => {
            return item.id === article.id
        })
        return index > -1
    }
    render () {
        let type = this.props.data[1]
        let data = this.props.data[0]
        return (    
            <div >
                {
                    type === '_REPORTS_' ?
                    <div className="report-detail-wrap">
                        <div className="top">                      
                            <i className="icon-back" onClick={this.props.close}></i>
                            <i className={this.getFavoriteReportsIcon(data)} onClick={()=>this.toggleFavoriteReports(data)}></i>                  
                        </div>
                        <div className="main">
                            <div className="report-info">
                                <div className="title">{data.title}</div>
                                <div className="info">
                                    <span>{data.report_time || data.publish_time}</span> · <span>{data.author_name}</span>
                                </div>
                            </div> 
                            <div className="report-content">     
                                <p className="pdf-tips">研报内容请查看附件</p>
                                <div className="pdf-box" onClick={()=>this.openPdf(data.attach_url)} >
                                    <i className="icon-pdf"></i>
                                    <span className="text">{data.attach_name}</span>
                                </div>
                                <div className="notice">
                                    免责声明：此信息由各大期货研究机构提供，与本产品立场无关。本产品不保证该信息的准确性、真实性、完整性、及时性、原创性等，不对您构成任何的投资建议，据此操作，风险自担。
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
                {
                    type === '_REPORTS_VIP_' ?
                    <div className="report-detail-wrap">
                        <div className="top">                      
                            <i className="icon-back" onClick={this.props.close}></i>
                            <i className={this.getFavoriteVipIcon(data)} onClick={()=>this.toggleFavoriteVip(data)}></i>                  
                        </div> 
                        <div className="main">
                            <Scroll>
                                <div>
                                    <div className="report-info">
                                        <div className="title">{data.title}</div>
                                        <div className="info">
                                            <span>{data.report_time || data.publish_time}</span> · <span>{'Aigis研究'}</span>
                                        </div>
                                    </div>       
                                    <div className="report-content" dangerouslySetInnerHTML={{__html:this.props.content}}></div>
                                </div> 
                            </Scroll>
                        </div>
                    </div> : null
                }
                {
                    type === '_NEWS_' ?
                    <div className="report-detail-wrap">
                        <div className="top">                      
                            <i className="icon-back" onClick={this.props.close}></i>
                            <i className={this.getFavoriteIcon(data)} onClick={()=>this.toggleFavorite(data)}></i>                  
                        </div> 
                        <div className="main">
                            <Scroll>
                                <div>
                                    <div className="report-info">
                                        <div className="title">{data.title}</div>
                                        <div className="info">
                                            <span>{data.report_time || data.publish_time}</span> · <span>{'Aigis研究'}</span>
                                        </div>
                                    </div>       
                                    <div className="report-content" dangerouslySetInnerHTML={{__html:this.props.content}}></div>
                                </div> 
                            </Scroll>
                        </div>
                    </div> : null
                }              
            </div> 
        )
    }
}
export default connect(state => ({
    favoriteList: state.favoriteList,
    favoriteReportsList: state.favoriteReportsList,
    favoriteVipList: state.favoriteVipList,
}))(ArticleDetail);