import { getHistory } from '../../../api'
const history = {}

export default {
	history: history,
    getBars: function(symbolInfo, resolution, from, to, first, limit) {
		var symbol = symbolInfo.name
		var reso = 'day'
		switch (resolution) {
			case '1':
				reso = 'minute';
				break;
			case 'D':
				reso = 'day';
				break;
			default:
				reso = 'day'
		}
		const qs = {
			code: symbol,
			timeTo: to ? to : '',
			reso: reso
		}
		// console.log({qs})

        return getHistory(
                qs,
            )
            .then(data => {
				if (data.Response && data.Response === 'Error') {
					// console.log('CryptoCompare API error:',data.Message)
					return []
				}
				if (data.length) {
					//console.log(`Actually returned: ${new Date(data.TimeFrom * 1000).toISOString()} - ${new Date(data.TimeTo * 1000).toISOString()}`)
					var bars = data.map(el => {
						return {
							time: el.time * 1000, //TradingView requires bar time in ms
							low: el.low,
							high: el.high,
							open: el.open,
							close: el.close,
							volume: el.volumefrom 
						}
					})
						if (first) {
							var lastBar = bars[bars.length - 1]
							history[symbolInfo.name] = {lastBar: lastBar}
						}
					return bars
				} else {
					return []
				}
			})
	}
}