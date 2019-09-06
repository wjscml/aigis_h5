import React from 'react';
import Tradingview from '../../components/tradingview'
import './index.styl';

export default class MarketDetail extends React.Component {
	state = {
		symbol: ''
	}
	componentDidMount () {
        document.title=`${this.props.match.params.marketName} - Aigis`
    }
	render() {
		console.log(this.props.match)
		return (
			<div className="marketDetail">
				<Tradingview symbol={this.props.match.params.marketName} interval={'1D'} />
			</div>
		);
	}
}