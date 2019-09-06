import { loadLoginState, loadStick, loadSearch, loadFavorite, loadFavoriteReports, loadFavoriteVip } from '../../common/js/cache.js'
import { type } from '../action'
const initialState = {
    userInfo: loadLoginState(),
    stickNumber: loadStick(),
    indexBar: null,
    searchHistory: loadSearch(),
    favoriteList: loadFavorite(),
    favoriteReportsList: loadFavoriteReports(),
    favoriteVipList: loadFavoriteVip()
}

export default (state=initialState, action) => {
    switch (action.type) {
        case type.USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case type.STICK:
            return {
                ...state,
                stickNumber: action.stickNumber
            }
        case type.INDEX_BAR:
            return {
                ...state,
                indexBar: action.indexBar
            }
        case type.SEARCH_HISTORY:
            return {
                ...state,
                searchHistory: action.searchHistory
            }
        case type.FAVORITE:
            return {
                ...state,
                favoriteList: action.favoriteList
            }
        case type.FAVORITE_REPORTS:
            return {
                ...state,
                favoriteReportsList: action.favoriteReportsList
            }
        case type.FAVORITE_VIP:
            return {
                ...state,
                favoriteVipList: action.favoriteVipList
            }
        default:
            return {
                ...state
            }
    }
}