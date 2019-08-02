import { postApi, postFileApi, postNewsApi, tradingviewApi } from './helpers'

const getLogin = postApi('user.login')
const getLoginByMobileCode = postApi('user.loginByMobileCode')
const getForget = postApi('user.retrievePassword')
const getCaptcha = postApi('user.getCaptcha')
const getMobileCode = postApi('user.getMobileCode')
const getIndicators = postApi('indicator.getIndicators')
const addFavorIndicator = postApi('indicator.addFavorIndicator')
const getFavorIndicatorList = postApi('indicator.getFavorIndicatorList')

const getCategories = postNewsApi('article.categories')
const getNewsList = postNewsApi('article.getList')
const getNewsDetail = postNewsApi('article.getDetail')

const getNomalList = postApi('report.getNomalList')
const getSpecialList = postApi('report.getSpecialList')
const getReportContent = postApi('report.getReportContent')
const getFollowList = postApi('purchase.getList')
const getLastTimeData = postApi('quantification.getLastTimeData')
const getValueList = postApi('assetmanagement.getList')

const getHistoryChartData = postApi('quantification.tradingview')
const getDaysData = postApi('quantification.getDaysData')
const getPeriodData = postApi('quantification.getPeriodData')

const getHistory = tradingviewApi('quantification.tradingview')
const getSearch = tradingviewApi('quantification.tradingsearch')
const getRefresh = tradingviewApi('quantification.tradingRefresh')

const getSearchList = postApi('article.getSearchList')
const getAllQuestion = postApi('user.getAllQuestion')
const submitQuestion = postFileApi('user.submitQuestion')
const deleteQuestion = postApi('user.questionDelete')
const changeUserInfo = postFileApi('user.changeUserInfo')

export {
  getLogin,
  getLoginByMobileCode,
  getForget,
  getCaptcha,
  getMobileCode,
  getIndicators,
  addFavorIndicator,
  getFavorIndicatorList,

  getCategories,
  getNomalList,
  getSpecialList,
  getReportContent,
  getFollowList,
  getValueList,
  getLastTimeData,

  getHistoryChartData,
  getDaysData,

  getNewsList,
  getNewsDetail,
  getPeriodData,

  getHistory,
  getSearch,
  getRefresh,

  getSearchList,
  getAllQuestion,
  submitQuestion,
  deleteQuestion,
  changeUserInfo
}
