import React from 'react';
import { TabBar } from 'antd-mobile';
import Index from '../../pages/index';
import Market from '../../pages/market';
import Report from '../../pages/report';
import News from '../../pages/news';
import User from '../../pages/user';
import './index.styl';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.selectedTab
        }
    }
    static defaultProps = {
        selectedTab: '/index'
    }
    handlePress = (i) => {  
        this.setState({
            selectedTab: i
        })
        //window.location.href = i;
    }
    renderContent = (name) => {
        if (name === 'index') {
            return <Index />
        }
        if (name === 'market') {
            return <Market />
        }
        if (name === 'report') {
            return <Report />
        }
        if (name === 'news') {
            return <News />
        }
        if (name === 'user') {
            return <User />
        }
    }
    
    render() { 
        const MenuList = [
            {
                title: '首页',
                key: '/index',
                name: 'index',
                icon: './assets/image/tab_home@3x.png',
                selectedIcon: './assets/image/tab_home_pre@3x.png'
            },
            {
                title: '行情',
                key: '/market',
                name: 'market',
                icon: './assets/image/tab_market@3x.png',
                selectedIcon: './assets/image/tab_market_pre@3x.png'
            },
            {
                title: '报告',
                key: '/report',
                name: 'report',
                icon: './assets/image/tab_report@3x.png',
                selectedIcon: './assets/image/tab_report_pre@3x.png'
            },
            {
                title: '新闻',
                key: '/news',
                name: 'news',
                icon: './assets/image/tab_news@3x.png',
                selectedIcon: './assets/image/tab_news_pre@3x.png'
            },
            {
                title: '我的',
                key: '/user',
                name: 'user',
                icon: './assets/image/tab_user@3x.png',
                selectedIcon: './assets/image/tab_user_pre@3x.png'
            }
        ]
        return (                 
            <TabBar
                tintColor="#007aff"
                unselectedTintColor="#8e8e8e"
                prerenderingSiblingsNumber="0"
            >
                { 
                    MenuList.map((item, index) => {
                        return <TabBar.Item 
                            title={item.title}  
                            key={index}  
                            icon={
                                <div
                                    style={{
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        background: `url(${item.icon}) center center / 2.5rem 2.5rem no-repeat`
                                    }} 
                                />
                            }
                            selectedIcon={
                                <div
                                    style={{
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        background: `url(${item.selectedIcon}) center center / 2.5rem 2.5rem no-repeat`
                                    }} 
                                />
                            }
                            selected={this.state.selectedTab === item.key}
                            onPress={()=>this.handlePress(item.key)}
                        >
                            {this.renderContent(item.name)}
                        </TabBar.Item >
                    })
                }
            </TabBar>
        );
    }
}