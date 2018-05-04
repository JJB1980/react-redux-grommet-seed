import { Map } from 'immutable'

const NS = 'COMPONENTS_'

const SMALL = `${NS}SMALL`

const initialState = Map()

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case SMALL:
      return state.set('isSmall', payload)

    default:
      return state
  }
}

// actions ---------

export function setSmall (flag) {
  return { type: SMALL, payload: flag }
}


// selectors --------

export function isSmall (state) {
  return state.components.get('isSmall')
}

// thunks -----------

export const resizeWindow = (window, dispatch) => {
  if (window.innerWidth < 720) {
    dispatch(setSmall(true))
  } else {
    dispatch(setSmall(false))
  }
}

export function initialize () {
  return async (dispatch, _, {window}) => {
    window.onresize = resizeWindow.bind(this, window, dispatch)
    resizeWindow(window, dispatch)
  }
}
