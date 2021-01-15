
import {
    SET_THEME, GET_THEME_REQUEST, GET_THEME_SUCCESS, GET_THEME_FAIL
} from '../constants/themeConstants'

export const getThemeReducer = (state = {theme: {}}, action) => {

    switch(action.type){
        case GET_THEME_REQUEST:
            return {
              loading: true,
              theme: {}
            }
        case GET_THEME_SUCCESS:
          return {
            loading: false,
            theme: action.payload
          }
        case GET_THEME_FAIL:
            return {
              loading: false,
              error: action.payload
            }
        default: 
            return state
    }

}
