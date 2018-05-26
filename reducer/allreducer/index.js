import {combineReducers} from 'redux';
import animatingDrawer from '../reducerMain'
import {allStudent,allSubject} from '../fetchDataReducer'
import {getRegisterSubjectData} from '../fetchDataRegisterSubject'
export default combineReducers({
    animatingDrawer:animatingDrawer,
    allStudent,allSubject,getRegisterSubjectData
})