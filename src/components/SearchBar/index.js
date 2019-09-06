import React from 'react';
import './index.styl'

export default class SearchBar extends React.Component {
    state = {
        value: ''
    }
    clear = () => {
        this.setState({
            value: ''
        })
        this.myInput.focus()
        this.props.search('')
    }
    updateState = (e) => {
        this.setState({
            value: e.target.value
        })
        this.props.search(e.target.value)
    }
    render() { 
        return (
            <div className="search-bar">     
                <i className="icon-back" onClick={this.props.close}></i>
                <div className="inputBox">
                    <input type="text" 
                        placeholder="请输入商品代码" 
                        value={this.state.value}
                        onChange={this.updateState}
                        ref={myInput=>this.myInput=myInput}
                    ></input>
                </div>
                <i className="icon-dismiss" onClick={this.clear} style={this.state.value===''?{display:'none'}:{}}></i>
            </div>
        ) 
    }
}