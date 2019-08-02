import React from 'react';
import { Tabs } from 'antd-mobile';
import { getIndicators, addFavorIndicator, getFavorIndicatorList } from '../../api';
import WebSocketClass from '../../api/socket.js';
import { toDecimal, toPercent } from '../../common/js/data.js';
import { addClass, removeClass } from '../../common/js/dom.js';
import './index.styl';

var socket = null;
var classNum = [];
export default class Market extends React.Component {
    state = {
        type: 0,
        subType: 0,
        marketNav: [],
        subNavData: [],
        originData: [],
        favorData: [],
        isFirst: true,
        listData: []
    }
    componentDidMount () {
        document.title="行情数据 - Aigis - 埃癸斯风险控制系统";
        this._getIndicators() 
    }
    _getIndicators () {
        getIndicators({
            session: 'xdYVS57m7ZtpLXgsnBlOlXr-iRCtWMDw'
        }).then(res => {
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
    _getMarketsData (type) {
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
            console.log(classNum)
            this.sendSocketData(nameDataAll)        
            this.setState({
                nameData: nameDataAll
            })
        } else {
            getFavorIndicatorList({
                session: this.props.userInfo.session,
                isShowLoading: false
            }).then(res => {
                if (res && res.length !== 0) {
                    let favorData = res
                    this.sendSocketData(favorData)
                    this.setState({
                        nameData: favorData,
                        subNavData: []
                    }) 
                } else {
                    let favorData = []
                    this.sendSocketData(favorData)
                    this.setState({
                        nameData: favorData,
                        subNavData: []
                    }) 
                }
            })
        }
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
            
            if (this.state.isFirst) {
                this.setState({
                    isFirst: false
                })
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
                let listData =[]
                classNum.map(item => (
                    listData.push(listDataAll.splice(0, item))
                ))
                this.setState({
                    listData
                })
            } else { 
                let listData = this.state.listData
                for (let n in this.state.nameData) {
                    //if (valueData[n] !== '--') {
                        //let oldValue = parseFloat(this.state.listData[n].value.change)
                        //let newValue = parseFloat(valueData[n].change)
                        //let m = parseFloat(n) + 1
                        // let changeDom = this.div.current.content.current.children[m]

                        // if (oldValue < newValue) {   
                        //     listData[n].value = valueData[n]
                        //     this.setState({ listData })
                        //     addClass(changeDom, 'shadowUp')
                        //     setTimeout(() => {
                        //         removeClass(changeDom, 'shadowUp')
                        //     }, 500)
                        // } else {
                        //     listData[n].value = valueData[n]
                        //     this.setState({ listData })
                        //     addClass(changeDom, 'shadowDown')
                        //     setTimeout(() => {
                        //         removeClass(changeDom, 'shadowDown')
                        //     }, 500)
                        // }
                    //}
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
    render() {
        return (
            <div className="market-wrap">   
                <div className="market-top">
                    <div className="nav-wrap">
                        {
                            this.state.marketNav.map((item, index) => {
                                return <div className={this.state.type==index ? "nav-btn nav-btn-s" : "nav-btn"} 
                                    onClick={()=>this.handleSelect(index)}
                                    key={index}>
                                    {item.name}
                                </div>
                            })
                        }
                        
                    </div>
                    <div className="edit-btn" style={this.state.type===3?{}:{display:'none'}}>编辑</div>
                    <div className="search-btn">
                        <i className="icon-search"></i>
                    </div>
                </div> 
                <div className="market-main">
                    <MarketList tabs={this.state.subNavData} data={this.state.listData} type={this.state.type} subType={this.state.subType} />
                </div>

            </div>   
        );
    }
}
class MarketList extends React.Component{
    renderContent = data => {
        return data.map(items =>  
            items.map((item, index) => 
                <div key={index}>{item.name}</div> 
            )                     
        )
    }   
    render() {
        const tabs = this.props.tabs.map(item => ({
            title: item.exchange_code         
        }))
        return (
            <div>
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
                
            </div>
            
        )
    }
}