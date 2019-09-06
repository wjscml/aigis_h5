import React from 'react';
import BScroll from 'better-scroll';
import './index.styl'

export default class Scroll extends React.Component {
    static defaultProps = {
        x: false,
        y: true,
        pullUpLoad: false,
        probeType: 0
    }
    state = {
        scroll: null
    }
    componentDidMount() {
        const wrapper = this.refs.scroll;
        const scroll = new BScroll(
            wrapper, 
            {
                scrollX: this.props.x,
                scrollY: this.props.y,
                click: true,
                pullUpLoad: this.props.pullUpLoad,
                probeType: this.props.probeType
            }
        );
 
        if (this.props.pullUpLoad) {
            scroll.on('touchEnd', () => {
              if (scroll.y <= scroll.maxScrollY - 40) {
                this.props.touchEnd()
              }
            })
        }
        this.setState({scroll});
    }
    componentDidUpdate() {
        if (this.state.scroll) {
            this.state.scroll.refresh();
        }
    }
    scrollTop = () => {
        this.state.scroll.scrollTo(0, 0, 20)
    }
    render() { 
        return (
            <div className="scroll-wrapper" ref="scroll"> 
                {this.props.children} 
            </div>
        ) 
    }
}