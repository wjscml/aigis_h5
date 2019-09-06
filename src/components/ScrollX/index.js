import React from 'react';
import Scroll from '../../components/Scroll';
import './index.styl'

export default class ScrollX extends React.Component {
    state = {

    }
    handleChange = (i) => {
        this.props.handleChange(i)
    }
    render() { 
        return (
            <div className="x-nav-wrap">
                <Scroll x={true} y={false}>
                    <div className="content" style={{width:`${this.props.navlist.length*6}rem`}}>
                        {
                            this.props.navlist.map((item, index) => {
                                return <div className={this.props.type===index?'navBtn navBtn-s':'navBtn'} onClick={()=>this.handleChange(index)} key={index}>
                                    {item.name}
                                </div>
                            })
                        }
                    </div>
                </Scroll>
            </div>
        ) 
    }
}