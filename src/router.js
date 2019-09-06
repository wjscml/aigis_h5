import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Login from './Login'
import LoginPsw from './pages/login'
import LoginMobile from './pages/login/mobile'
import Forget from './pages/forget'
import Admin from './Admin'
import Common from './Common'
import NotFound from './pages/notFound'

import Search from './pages/search'
import MarketDetail from './pages/marketDetail';
import Setting from './pages/setting';
import About from './pages/about';
import Edit from './pages/edit';
import UserInfo from './pages/userInfo';
import MessageCenter from './pages/messageCenter';
import Collect from './pages/collect';

export default class IRouter extends React.Component{
    render () {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path="/login" render={() => 
                            <Login>   
                                <Switch>
                                    <Route exact path="/login/psw" component={LoginPsw} />
                                    <Route exact path="/login/mobile" component={LoginMobile} />
                                    <Route exact path="/login/forget" component={Forget} />
                                    <Redirect to="/login/psw" />
                                </Switch>  
                            </Login>
                        } />

                        <Route path="/common" render={() => 
                            <Common>
                                <Switch>
                                    <Route path='/common/market/:marketName' component={MarketDetail} />

                                    <Route exact path='/common/search' component={Search} />
                                    <Route exact path='/common/setting' component={Setting} />
                                    <Route exact path='/common/about' component={About} />
                                    <Route exact path='/common/edit' component={Edit} />
                                    <Route exact path='/common/userinfo' component={UserInfo} />
                                    <Route exact path='/common/message' component={MessageCenter} />
                                    <Route exact path='/common/collect' component={Collect} />

                                    <Redirect to="/404" />
                                </Switch>
                            </Common>
                        } />

                        <Route path="/" render={() => 
                            <Switch>
                                <Route exact path="/index" component={Admin} />
                                <Route exact path='/user' component={Admin} />
                                <Route exact path='/market' component={Admin} />
                                <Route exact path='/404' component={NotFound} />

                                <Redirect to="/index" />
                            </Switch> 
                        } />
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}