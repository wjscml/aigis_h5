import * as React from 'react';
import './index.styl';
import Datafeed from './api/'

// function getLanguageFromURL() {
// 	const regex = new RegExp('[\\?&]lang=([^&#]*)');
// 	const results = regex.exec(window.location.search);
// 	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
// }

export default class TVChartContainer extends React.Component {
	static defaultProps = {
		symbol: 'USDCNH.FX',
		interval: '1D',
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: true,
		autosize: true,
		studiesOverrides: {},
	};
	componentDidMount() {
		const widgetOptions = {
			debug: false,
			symbol: this.props.symbol,
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			hideideas: true,
      		allow_symbol_change: false,
			locale: 'zh',
			timezone:"Asia/Shanghai",
			loading_screen: { backgroundColor: '#171633' },
			disabled_features: [
				'header_widget_dom_node',
				'header_compare',
				'header_undo_redo',
				'go_to_date'
			],
			enabled_features: [
				'keep_left_toolbar_visible_on_small_screens',
				'side_toolbar_in_fullscreen_mode',
				'widgetbar'
			],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			overrides: {
				'paneProperties.background': 'rgba(36, 36, 72, 1)',
				'paneProperties.vertGridProperties.color': 'rgba(255, 255, 255, 0.07)',
				'paneProperties.horzGridProperties.color': 'rgba(255, 255, 255, 0.07)',
				'paneProperties.crossHairProperties.color': 'rgba(67, 67, 128, 1)',
				'scalesProperties.lineColor': 'rgba(255, 255, 255, 0.17)',
				'scalesProperties.textColor': 'rgba(191, 191, 191, 1)',
				//    K线图样式
				'mainSeriesProperties.candleStyle.upColor': 'rgba( 230, 67, 64, 1)',
				'mainSeriesProperties.candleStyle.downColor': 'rgba( 9, 187, 7, 1)',
				'mainSeriesProperties.candleStyle.wickUpColor': 'rgba( 230, 67, 64, 1)',
				'mainSeriesProperties.candleStyle.wickDownColor': 'rgba( 9, 187, 7, 1)',
				'mainSeriesProperties.candleStyle.borderUpColor': 'rgba( 230, 67, 64, 1)',
				'mainSeriesProperties.candleStyle.borderDownColor': 'rgba( 9, 187, 7, 1)',
				//    空心K线图样式
				'mainSeriesProperties.hollowCandleStyle.upColor': 'rgba( 230, 67, 64, 1)',
				'mainSeriesProperties.hollowCandleStyle.downColor': 'rgba( 9, 187, 7, 1)',
				'mainSeriesProperties.hollowCandleStyle.wickUpColor': 'rgba( 230, 67, 64, 1)',
				'mainSeriesProperties.hollowCandleStyle.wickDownColor': 'rgba( 9, 187, 7, 1)',
				'mainSeriesProperties.hollowCandleStyle.borderUpColor': 'rgba( 230, 67, 64, 1)',
				'mainSeriesProperties.hollowCandleStyle.borderDownColor': 'rgba( 9, 187, 7, 1)',
				//    美国线样式
				'mainSeriesProperties.barStyle.upColor': 'rgba( 230, 67, 64, 1)',
				'mainSeriesProperties.barStyle.downColor': 'rgba( 9, 187, 7, 1)',
				//    线形图样式
				'mainSeriesProperties.lineStyle.color': 'rgba(6, 238, 254, 1)',
				'mainSeriesProperties.lineStyle.linewidth': 2,
				//    面积图样式
				'mainSeriesProperties.areaStyle.color1': 'rgba(37, 97, 239, 0.1)',
				'mainSeriesProperties.areaStyle.color2': 'rgba(37, 97, 239, 0.1)',
				'mainSeriesProperties.areaStyle.linecolor': 'rgba(37, 97, 239, 1)',
				'mainSeriesProperties.areaStyle.linewidth': 2,
				// 基准线样式
				'mainSeriesProperties.baselineStyle.topFillColor1': 'rgba( 230, 67, 64, 0.1)',
				'mainSeriesProperties.baselineStyle.topFillColor2': 'rgba( 230, 67, 64, 0.1)',
				'mainSeriesProperties.baselineStyle.bottomFillColor1': 'rgba( 9, 187, 7, .1)',
				'mainSeriesProperties.baselineStyle.bottomFillColor2': 'rgba( 9, 187, 7, .1)',
				'mainSeriesProperties.baselineStyle.topLineColor': 'rgba( 230, 67, 64, 1)',
				'mainSeriesProperties.baselineStyle.bottomLineColor': 'rgba( 9, 187, 7, 1)',
				'mainSeriesProperties.baselineStyle.topLineWidth': 2,
				'mainSeriesProperties.baselineStyle.bottomLineWidth': 2,
				'linetoolicon.color': 'rgba( 230, 67, 64, 1)'
			},
			custom_css_url: '/charting_library/static/bundles/chart.css'
		};

		window.TradingView.onready(() => {
			const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);
			widget.onChartReady(() => {
				console.log('Chart has loaded!')
			});
		});
	}

	render() {
		return (
			<div className="marketDetail">
				<div
					id={ this.props.containerId }
					className={ 'TVChartContainer' }
				/>
			</div>
		);
	}
}