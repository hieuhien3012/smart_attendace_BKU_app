import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE,
FETCHING_DATA_SUBJECT, FETCHING_DATA_SUCCESS_SUBJECT, FETCHING_DATA_FAILURE_SUBJECT,
} from '../../constants'
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

function allStudent (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
function allSubject (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA_SUBJECT:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS_SUBJECT:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE_SUBJECT:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
export {allStudent,allSubject}