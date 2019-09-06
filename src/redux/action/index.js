import { saveLoginState, saveStick, saveSearch, clearSearch, 
    saveFavorite, deleteFavorite, 
    saveFavoriteReports, deleteFavoriteReports,
    saveFavoriteVip, deleteFavoriteVip } from '../../common/js/cache.js'
export const type = {
    USER_INFO: 'USER_INFO',
    STICK: 'STICK',
    INDEX_BAR: 'INDEX_BAR',
    SEARCH_HISTORY: 'SEARCH_HISTORY',
    FAVORITE: 'FAVORITE',
    FAVORITE_REPORTS: 'FAVORITE_REPORTS',
    FAVORITE_VIP: 'FAVORITE_VIP'
}

export function saveUserInfo(val) {
    return {
        type: type.USER_INFO,
        userInfo: saveLoginState(val)
    }
}

export function saveStickNumber(val) {
    return {
        type: type.STICK,
        stickNumber: saveStick(val)
    }
}

export function saveIndexBar(val) {
    return {
        type: type.INDEX_BAR,
        indexBar: val
    }
}

export function saveSearchHistory(val) {
    return {
        type: type.SEARCH_HISTORY,
        searchHistory: saveSearch(val)
    }
}

export function clearSearchHistory(val) {
    return {
        type: type.SEARCH_HISTORY,
        searchHistory: clearSearch(val)
    }
}

export function saveFavoriteList(val) {
    return {
        type: type.FAVORITE,
        favoriteList: saveFavorite(val)
    }
}

export function deleteFavoriteList(val) {
    return {
        type: type.FAVORITE,
        favoriteList: deleteFavorite(val)
    }
}

export function saveFavoriteReportsList(val) {
    return {
        type: type.FAVORITE_REPORTS,
        favoriteReportsList: saveFavoriteReports(val)
    }
}

export function deleteFavoriteReportsList(val) {
    return {
        type: type.FAVORITE_REPORTS,
        favoriteReportsList: deleteFavoriteReports(val)
    }
}

export function saveFavoriteVipList(val) {
    return {
        type: type.FAVORITE_VIP,
        favoriteVipList: saveFavoriteVip(val)
    }
}

export function deleteFavoriteVipList(val) {
    return {
        type: type.FAVORITE_VIP,
        favoriteVipList: deleteFavoriteVip(val)
    }
}