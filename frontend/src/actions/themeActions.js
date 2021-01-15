
import {SET_THEME, GET_THEME_REQUEST, GET_THEME_SUCCESS, GET_THEME_FAIL} from '../constants/themeConstants'


  export const getTheme = () => (dispatch) => {

    try {
      dispatch({ type: GET_THEME_REQUEST })
  
      const themes = [
        {
            gradient: 'linear-gradient(20deg, #167ddd 30%, #12e3ff 90%)',
            image: '/icons/cart-blue.png',


        },
        {
            gradient: 'linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)',
            image: '/icons/cart-tri.png',

        },
        {
            gradient: 'linear-gradient(30deg, #43C6AC 30%, #191654 90%)',
            image: '/icons/cart-green.png',

        }
      ]
  
      dispatch({
        type: GET_THEME_SUCCESS,
        payload: themes[Math.floor(Math.random()*3)],
      })
    } catch (error) {
      dispatch({
        type: GET_THEME_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  