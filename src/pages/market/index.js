import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Checkbox, Modal } from 'antd-mobile';
import NoResult from '../../components/NoResult';
import Scroll from '../../components/Scroll';
import { getIndicators, addFavorIndicator, getFavorIndicatorList } from '../../api';
import WebSocketClass from '../../api/socket.js';
import { toDecimal, toPercent } from '../../common/js/data.js';
//import { addClass, removeClass } from '../../common/js/dom.js';
import cookie from '../../common/js/cookie';
import './index.styl';

const alert = Modal.alert
const CheckboxItem = Checkbox.CheckboxItem
var socket = null;
var classNum = [];
class Market extends React.Component {
    state = {
        session: cookie.getCookie('session'),
        type: 0,
        subType: 0,
        marketNav: [],
        subNavData: [],
        originData: [],
        favorData: [],
        isFirst: true,
        listData: [],
        listDataAll: []
    }
    componentDidMount () {
        document.title="Aigis - 埃癸斯风险控制系统";
        this._getIndicators() 
    }
    componentWillUnmount () {
        socket.closeMyself()
    }

    getRefresh = () => {    
        this.setState({
            isFirst: true
        })
        socket.closeMyself() 
        this._getIndicators()
    }
    _getIndicators = () => {
        getIndicators().then(res => {
            //console.log(res)
            let marketNav = []
            marketNav = res.map(item => ({
                name: item.cateName
            }))
            marketNav.push({name: '自选'})

            this.setState({
                marketNav
            })
            let originData = res.map(items => {
                if (!items.exchange) {
                    return {
                        indicators: items.indicators
                    }
                }
                return {
                    exchange: items.exchange,
                    indicators: items.indicators.map(item => ({
                        indicator_id: item.id,
                        indicator_name: item.indicator_name,
                        indicator_code: item.indicator_code,
                        table_name: item.table_name,
                        favor: item.favor,
                        exchange_id: item.exchange_id
                    }))
                }
            })
            this.setState({originData})
            this._getMarketsData(this.state.type)
        })    
    }
    _getMarketsData = (type) => {
        if (type < 3) {
            let nameData = this.state.originData[type]
            let subNavData = []
            let addTypeAll = [{ exchange_code: "全部" }]
            subNavData = addTypeAll.concat(nameData.exchange)
            this.setState({subNavData})
            
            let exchangeNameData = []
            for (let a in nameData.exchange) {
                exchangeNameData[a] = []
                for (let b in nameData.indicators) {
                    if (nameData.exchange[a].id === nameData.indicators[b].exchange_id) {
                        exchangeNameData[a].push(nameData.indicators[b])
                    }
                }
            }
            
            exchangeNameData.unshift(nameData.indicators)
            //this.nameData = exchangeNameData[this.subType]

            let nameDataAll = []
            
            exchangeNameData.map(item => (
                nameDataAll = nameDataAll.concat(item)
            ))
            classNum = []
            exchangeNameData.map(item => (
                classNum.push(item.length)
            ))
            //console.log(classNum)
            this.sendSocketData(nameDataAll)        
            this.setState({
                nameData: nameDataAll
            })
        } else {
            this.getFavorList()
        }
    }
    getFavorList = () => {
        getFavorIndicatorList({
            session: this.state.session,
            isShowLoading: false
        }).then(res => {
            if (res && res.length !== 0) {
                classNum = [res.length]
                let favorData = res
                this.sendSocketData(favorData)
                this.setState({
                    favorData,
                    nameData: favorData
                }) 
            } else {
                let favorData = []
                this.sendSocketData(favorData)
                this.setState({
                    favorData,
                    nameData: favorData
                }) 
            }
        })
    }
    sendSocketData = (data) => {
        if (data.length !== 0) {
            var agentData = []
            agentData = data.map(item => (
                item.table_name
            ))
            
            socket = new WebSocketClass('markets', agentData, this.getConfigResult)
            socket.connect()
        } else {
            this.setState({
                listData: []
            })
        }
    }
    getConfigResult = (res) => {
        //console.log(res)
        if (res.length) {
            let valueData = res.map(item => {
                if (item !== '--') return ({
                    price: toDecimal(item[0]),
                    high: toDecimal(item[1]),
                    low: toDecimal(item[2]),
                    open: toDecimal(item[3]),
                    change: toDecimal(item[6]),
                    changePer: toPercent(item[7])
                })
                return '--'
            })
            valueData = valueData.concat(valueData)

            let listDataAll = []
            for (let n in this.state.nameData) { 
                listDataAll.push({
                    name: this.state.nameData[n].indicator_name,
                    code: this.state.nameData[n].indicator_code,
                    id: this.state.nameData[n].indicator_id,
                    favor: this.state.nameData[n].favor,
                    value: valueData[n]
                })             
            } 
    
            if (this.state.isFirst) {
                this.setState({
                    isFirst: false,
                    listData: []
                })
                
                let listData =[]
                classNum.map(item => (
                    listData.push(listDataAll.splice(0, item))
                ))       
                this.setState({
                    listData
                })           
            } else {
                let listData = this.state.listData
                let newValueData =[]
                classNum.map(item => (
                    newValueData.push(valueData.splice(0, item))
                ))
                for (let m in newValueData) {
                    for (let n in newValueData[m]) {
                        if (newValueData[m][n] !== '--') {
                            listData[m][n].value = newValueData[m][n]
                            this.setState({
                                listData
                            })
                        }
                    }
                }            
            }
        }
    }
    handleSelect = (i) => {
        socket.closeMyself()
        this.setState({
            type: i,
            subType: 0,
            isFirst: true
        })
        this._getMarketsData(i)
    }
    openSearch = () => {
        window.location.href = './common/search'
    }

    showMyFavor = () => { 
        this.myFavor.show()
    }
    onMyFavorRef = (ref) => {
        this.myFavor = ref
    }
    deleteAll = (ids) => {
        ids.forEach(id => {
            addFavorIndicator({
                indicatorId: id,
                session: this.state.session,
                action: 2
            }).then(res => {
                //console.log(res)
                this.myFavor.hide()
            })
        })     
        this.getRefresh()
    }
    render() {
        return (
            <div className="market-wrap">   
                <div className="market-top">
                    <div className="nav-wrap">
                        {
                            this.state.marketNav.map((item, index) => {
                                return <div className={this.state.type===index ? "nav-btn nav-btn-s" : "nav-btn"} 
                                    onClick={()=>this.handleSelect(index)}
                                    key={index}>
                                    {item.name}
                                </div>
                            })
                        }                  
                    </div>
                    <div className="edit-btn" 
                        style={this.state.type===3&&this.state.listData.length!==0?{}:{display:'none'}} 
                        onClick={this.showMyFavor}
                    >编辑</div>
                    <div className="search-btn" onClick={this.openSearch}>
                        <i className="icon-search"></i>
                    </div>
                </div> 
                <MarketList tabs={this.state.subNavData} data={this.state.listData} 
                    type={this.state.type} subType={this.state.subType} />
                
                <MyFavor onRef={this.onMyFavorRef} data={this.state.favorData} 
                    deleteAll={this.deleteAll} />
            </div>
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(Market);

class MarketList extends React.Component{
    toDetail = (item) => {
        window.open(`/common/market/${item.code}:${item.name}`, '_blank')
    }
    renderContent = data => {
        if (data.length == 0) {
            return <div style={{marginTop:'10rem'}}>
                <NoResult tips="暂无数据~" />
            </div>
        }
        return data.map((items, index) =>  
            <div className="list-main" key={index}>
                <Scroll>
                    <div className="list-content">
                        {
                            items.map((item, index) => 
                                <div key={index} className="listItem" onClick={()=>this.toDetail(item)}>
                                    <div>
                                        <div className="name">{item.name}</div>
                                        <div className="code">{item.code}</div>
                                    </div>
                                    <div className="price">{item.value.price}</div>
                                    <div className={item.value.change<0?"changePer green":"changePer red"}>{item.value.changePer}</div>    
                                </div> 
                            )
                        }
                    </div>   
                </Scroll>  
            </div>             
        )
    }   
    render() {
        const tabs = this.props.tabs.map(item => ({
            title: item.exchange_code         
        }))
        return (
            <div className="list-wrap">
                {
                    this.props.type===0 ?
                    <Tabs 
                        tabs={tabs} 
                        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
                        tabBarUnderlineStyle={{borderWidth: 0}}
                        tabBarBackgroundColor="none"
                        tabBarInactiveTextColor="rgb(94,94,94)"
                    >
                        {this.renderContent(this.props.data)}
                    </Tabs> : null
                }
                {
                    this.props.type===1 ?
                    <Tabs 
                        tabs={tabs} 
                        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
                        tabBarUnderlineStyle={{borderWidth: 0}}
                        tabBarBackgroundColor="none"
                        tabBarInactiveTextColor="rgb(94,94,94)"
                    >
                        {this.renderContent(this.props.data)}
                    </Tabs> : null
                }
                {
                    this.props.type===2 ?
                    <Tabs 
                        tabs={tabs} 
                        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
                        tabBarUnderlineStyle={{borderWidth: 0}}
                        tabBarBackgroundColor="none"
                        tabBarInactiveTextColor="rgb(94,94,94)"
                    >
                        {this.renderContent(this.props.data)}
                    </Tabs> : null
                }
                {
                    this.props.type===3 ?
                    <div className="zixuan">
                        {this.renderContent(this.props.data)}
                    </div> : null  
                }          
            </div>     
        )
    }
}

class MyFavor extends React.Component{
    state = {
        visible: null,
        listId: []
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
    onChange = (val) => {
        let arr = this.state.listId
        const index = arr.findIndex((item) => {
            return item === val
        })
        if (index === 0) {
            return
        }
        if (index > 0) {
            arr.splice(index, 1)  
        }
        if (index < 0) {
            arr.push(val)    
        }
        this.setState({
            listId: arr
        })        
    }
    confirm = () => {
        alert('', '是否取消关注所选项', [
            { text: '取消', style: {color: 'rgb(171, 171, 171)'}},
            { text: '确定', onPress: () => this.props.deleteAll(this.state.listId)}
        ])
    }

    render() {
        return (   
            this.state.visible ?
            <div className="myFavor-wrap">
                <div className="top">
                    <div className="small" onClick={this.hide}>返回</div>
                    <div className="big">我的自选</div>
                    <NavLink to="./common/search" className="small" >添加</NavLink>
                </div>
                
                <div className="edit-box">
                    <Scroll>
                        <div>
                        {
                            this.props.data.map((item, index) => {
                                return <CheckboxItem key={index} onChange={()=>this.onChange(item.indicator_id)}>
                                    { item.indicator_name }
                                    <span className="code">
                                        { item.indicator_code }
                                    </span>
                                </CheckboxItem>
                            })
                        }
                        </div>
                    </Scroll>
                    {
                        this.state.listId.length ?
                        <div className="delete-bar" onClick={this.confirm}>
                            <i className="icon-delete_all" />
                        </div>
                        : null
                    }     
                </div>
            </div> : null
        )
    }
}