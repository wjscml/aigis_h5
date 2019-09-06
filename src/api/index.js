import { postApi, postFileApi, postNewsApi, tradingviewApi } from './helpers'

const getLogin = postApi('user.login')
const getLoginByMobileCode = postApi('user.loginByMobileCodeFromApp')
const getForget = postApi('user.retrievePasswordFromApp')
const getCaptcha = postApi('user.getCaptcha')
const getMobileCode = postApi('user.getMobileCodeFromApp')
const getIndicators = postApi('indicator.getIndicatorsFromApp')
const addFavorIndicator = postApi('indicator.addFavorIndicator')
const getFavorIndicatorList = postApi('indicator.getFavorIndicatorList')

const submitQuestion = postFileApi('Post.post')
const getPostList = postApi('Post.getPostList')
const getPostContent = postApi('Post.getPostContent')

const getAbout = postApi('App.userAgreement')
const getCategories = postNewsApi('article.categories')
const getNewsList = postNewsApi('article.getList')
const getNewsDetail = postNewsApi('article.getDetail')

const getReportCategories = postNewsApi('report.categories')
const getReportList = postNewsApi('report.getList')

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
const deleteQuestion = postApi('user.questionDelete')
const changeUserInfo = postFileApi('user.changeUserInfo')

const checkUnReadMessage = postApi('App.checkUnReadMessage')
const getMessageList = postApi('App.getMessageList')

export {
  getLogin,
  getLoginByMobileCode,
  getForget,
  getCaptcha,
  getMobileCode,
  getIndicators,
  addFavorIndicator,
  getFavorIndicatorList,
   
  submitQuestion,
  getPostList,
  getPostContent,

  getAbout,
  getCategories,
  getReportCategories,
  getReportList,

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
  deleteQuestion,
  changeUserInfo,

  checkUnReadMessage,
  getMessageList
}
