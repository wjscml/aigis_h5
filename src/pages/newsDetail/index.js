import React from 'react';

import { getNewsDetail } from '../../api';
import ArticleDetail from '../../components/ArticleDetail';

import cookie from '../../common/js/cookie.js';
import './index.styl'

export default class newsDetail extends React.Component {
    state = {
        session: cookie.getCookie('session'),
        data: [],
        content: ''
    }
    componentDidMount () {
        let Id = this.props.match.params.newsId;
        //let split_info = info.split(/[:/]/)
        //console.log(info, split_info)
        if (Id) {
            this.getContent(Id);
        }
    }
    getContent = (Id) => {
        getNewsDetail({
            session: this.state.session,
            articleId: Id
        }).then(res => {
            this.setState({
                data: [res, 1],
                content: res.content
            })
        })
    }
    close = () => {
        window.close()
    }
    render () {
        return (    
            <ArticleDetail data={this.state.data} content={this.state.content} close={this.close} />
        )
    }
}