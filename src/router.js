import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Login from './Login'
import LoginPsw from './pages/login'
import Admin from './Admin'
import Index from './pages/index'
import Market from './pages/market'
//import LoginMobile from './pages/login/login_mobile'

export default class IRouter extends React.Component{
    render () {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path="/login" render={() => 
                            <Login>
                                <Switch>
                                    <Route path="/login/psw" component={LoginPsw} />
                                    {/* <Route path="/login/psw" component={LoginPsw} />
                                    <Route path="/login/mobile" component={LoginMobile} /> */}
                                    
                                    <Redirect to="/login/psw" />
                                </Switch>           
                            </Login>
                        } />

                        <Route path="/" render={() => 
                            <Admin>
                                <Switch>
                                    <Route path='/index' component={Index} />
                                    <Route path='/market' component={Market} />
                                    {/* <Route path='/algorithm' component={Algorithm} />
                                    <Route path='/report' component={Report} />
                                    <Route path='/market' component={Market} />
                                    <Route path='/vip/report' component={VipReport} />
                                    <Route path='/vip/follow' component={VipFollow} />
                                    <Route path='/vip/value' component={VipValue} />
                                    <Route path='/vip/question' component={VipQuestion} /> */}

                                    <Redirect to="/index" />
                                </Switch>     
                            </Admin>
                        } /> 
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}