import React from 'react';
import { Modal } from 'antd-mobile';
import SearchBar from '../../components/SearchBar';
import NoResult from '../../components/NoResult';
import { getSearch, getFavorIndicatorList, addFavorIndicator } from '../../api';
import { connect } from 'react-redux';
import { saveSearchHistory, clearSearchHistory } from '../../redux/action';
import cookie from '../../common/js/cookie';

import './index.styl';
const alert = Modal.alert

class Search extends React.Component {
    state = {
        session: this.props.userInfo.session,
        searchData: [],
        query: '',
        favorList: []
    }
    componentDidMount() {
        document.title="搜索 - Aigis - 埃癸斯风险控制系统";
    }
    componentWillMount() {
        getFavorIndicatorList({
            session: this.state.session,
            isShowLoading: false
        }).then(res => {
            this.setState({
                favorList: res
            })
        })
    }
    search = (query) => {
        getSearch({
            q: query
        }).then(res => {
            if (res ) {    
                let searchData = res   
                let favorList = this.state.favorList
                //console.log(searchData, favorList)
                for (let n in searchData) {
                    for (let m in favorList) {
                        if (searchData[n].symbol == favorList[m].indicator_code) {
                            searchData[n].favor = true
                        }
                    }
                }
                this.setState({
                    searchData,
                    query
                })
            }
        })
    }
    toDetail = (item) => {
        let history = { name: item.description, code: item.symbol };
        const { dispatch } = this.props;
        dispatch(saveSearchHistory(history));
        window.open(`/common/market/${item.code}:${item.name}`, '_blank')
    }
    handleDelete = () => {
        const { dispatch } = this.props;
        dispatch(clearSearchHistory());
    }
    close = () => {
        window.location.href = "/market"
    }
    toggleFavor = (item, n) => {
        addFavorIndicator({
            indicatorId: item.indicator_id,
            session: this.state.session,
            action: n
        }).then(res => {
            item.favor = res.favor
            this.setState({      
            })
        })
    }

    render() {  
        return (    
            <div className="search-wrap" >
                <SearchBar search={query => this.search(query)} close={this.close} />
                <Suggest searchData={this.state.searchData} query={this.state.query} 
                    toDetail={this.toDetail}  
                    addFavor={this.toggleFavor}
                />
                <SearchHistory data={this.props.searchHistory} handleDelete={this.handleDelete} />              
            </div>
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo,
    searchHistory: state.searchHistory
}))(Search)

class Suggest extends React.Component {   
    render() {  
        return (
            this.props.query !== '' ?
            <div className="suggest-wrap">
                {   
                    this.props.searchData.length !== 0 ?
                    this.props.searchData.map((item, index) => {
                        return <div className="suggest-column" key={index}>
                            <p className="name" onClick={()=>this.props.toDetail(item)}>{item.description}</p>
                            <p className="code" onClick={()=>this.props.toDetail(item)}>{item.symbol}</p>
                            <i className="icon-round_check" style={item.favor?{}:{display: 'none'}}></i>
                            <i className="icon-round_add" style={item.favor?{display: 'none'}:{}} onClick={()=>this.props.addFavor(item, 1)}></i>
                        </div>
                    }) 
                    : <div style={{marginTop: '5rem'}}>
                        <NoResult tips="没有符合您搜索条件的商品品种代码." />
                    </div>    
                }
            </div> : null 
        );
    }
}

class SearchHistory extends React.Component {   
    showAlert = () => {
        alert('', '是否清空所有搜索历史记录', [
            { text: '取消', style: {color: 'rgb(0, 122, 255)'}},
            { text: '清空', onPress: this.props.handleDelete, style: {color: 'rgb(171, 171, 171)'}}
        ])
    }
    toDetail = (item) => {
        window.open(`/common/market/${item.code}:${item.name}`, '_blank')
    }
    render() {  
        return (
            this.props.data.length ?
            <div className="search-history">
                <div className="top">
                    <div className="title">历史搜索</div>
                    <i className="icon-delete_all" onClick={this.showAlert}></i>
                </div>
                <div className="main">
                    {
                        this.props.data.map((item, index) => {
                            return <div className="main-item" key={index} onClick={()=>this.toDetail(item)}>
                                <div className="name">{item.name}</div>
                                <div className="code">{item.code}</div>
                            </div>
                        })
                    }               
                </div>
            </div> : null
        );
    }
}
