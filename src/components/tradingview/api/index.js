import historyProvider from './historyProvider'
import { getSearch, getRefresh } from '../../../api'
const supportedResolutions = ["1", "5", "60", "D", "W", "M"]

const config = {
    supported_resolutions: supportedResolutions
}; 
const subcribeArr = {}
export default {
	onReady: cb => {
	// console.log('=====onReady running')	
		setTimeout(() => cb(config), 0)	
	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		// console.log('====Search Symbols running')
		var qs = {
			q: userInput.toUpperCase()
		}
		getSearch(qs).then(data => {
			onResultReadyCallback(data)
		})
	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		// expects a symbolInfo object in response
		// console.log('======resolveSymbol running')
		// console.log('resolveSymbol:',{symbolName})
		var split_data = symbolName.split(/[:/]/)
		// console.log({split_data})
		var symbol_stub = {
			name: split_data[0],
			description: split_data[1],
			type: 'stock',
			session: '24x7',
			timezone: 'Asia/Shanghai',
			ticker: split_data[0],
			exchange: '',
			minmov: 1,
			pricescale: 100000000,
			has_no_volume: true,
			has_intraday: true,
			intraday_multipliers: ['1'],
			supported_resolution: supportedResolutions,
			volume_precision: 8,
			data_status: 'streaming'
		}

		if (split_data[2] && split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
			symbol_stub.pricescale = 100
		}
		setTimeout(function() {
			onSymbolResolvedCallback(symbol_stub)
			// console.log('Resolving that symbol....', symbol_stub)
		}, 0)

		// onResolveErrorCallback('Not feeling it today')
	},
	getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		// console.log('=====getBars running')
		// console.log('function args',arguments)
		// console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
		.then(bars => {
			if (bars.length) {
				onHistoryCallback(bars, {noData: false})
			} else {
				onHistoryCallback(bars, {noData: true})
			}
		}).catch(err => {
			// console.log({err})
			onErrorCallback(err)
		})
	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
		// console.log('=====subscribeBars runnning')
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

		var ajaxObj = setInterval(function() {
		getRefresh({
			code: symbol,
			reso: reso
		}).then(el => {
			if (!el.errorCode) {
			var bar = {
				time: el.time * 1000, //TradingView requires bar time in ms
				low: el.low,
				high: el.high,
				open: el.open,
				close: el.close
			}
			onRealtimeCallback(bar)
			}
		})
		}, 3000)
		subcribeArr[subscriberUID] = ajaxObj
	},
	unsubscribeBars: subscriberUID => {
		// console.log('=====unsubscribeBars running')
		var ajaxObj = subcribeArr[subscriberUID]
    	clearInterval(ajaxObj);
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		//optional
		// console.log('=====calculateHistoryDepth running')
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		// console.log('=====getMarks running')
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		// console.log('=====getTimeScaleMarks running')
	},
	getServerTime: cb => {
		// console.log('=====getServerTime running')
	}
}
