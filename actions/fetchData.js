import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE,
FETCHING_DATA_SUBJECT, FETCHING_DATA_SUCCESS_SUBJECT, FETCHING_DATA_FAILURE_SUBJECT ,
FETCHING_DATA_REGISTER_SUBJECT,FETCHING_DATA_SUCCESS_REGISTER_SUBJECT,
FETCHING_DATA_FAILURE_REGISTER_SUBJECT,FETCHING_DATA_CHANGECHECK_REGISTER_SUBJECT} from '../constants'



import getAllStudent from '../api/getStudent'
import getAllSubject from '../api/getSubject'
import {getMonHoc,getStudent,getDangKyMon} from '../api/registerSubject'
export function getData() {
  return {
    type: FETCHING_DATA
  }
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  }
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE
  }
}

export function fetchDataAllStudent() {
    return (dispatch) => {
        dispatch(getData())
        getAllStudent()
          .then((data) => {
            dispatch(getDataSuccess(data))
          })
          .catch((err) => {console.log('err:', err);alert('ERROR')})
      }
}




//ADDSUBJECT
export function getDataSubject() {
  return {
    type: FETCHING_DATA_SUBJECT
  }
}

export function getDataSuccessSubject(data) {
  return {
    type: FETCHING_DATA_SUCCESS_SUBJECT,
    data,
  }
}

export function getDataFailureSubject() {
  return {
    type: FETCHING_DATA_FAILURE_SUBJECT
  }
}


export function fetchDataAllSubject() {
  return (dispatch) => {
      dispatch(getDataSubject())
      getAllSubject()
        .then((data) => {
          dispatch(getDataSuccessSubject(data))
        })
        .catch((err) => {console.log('err:', err);alert('ERROR')})
    }
}





//REGISTER SUBJECT
export function getDataRegisterSubject() {
  return {
    type: FETCHING_DATA_REGISTER_SUBJECT
  }
}

export function getDataSuccessRegisterSubject(dataStudent,dataMonHoc,dataDangKyMon,monHoc) {
  return {
    type: FETCHING_DATA_SUCCESS_REGISTER_SUBJECT,
    dataStudent,dataDangKyMon,dataMonHoc,monHoc
  }
}

export function getDataFailureRegisterSubject() {
  return {
    type: FETCHING_DATA_FAILURE_REGISTER_SUBJECT
  }
}
export function fetchDataRegisterSubject(monHoc) {
  return (dispatch) => {
    dispatch(getDataRegisterSubject())
    getStudent() //1
    .then((dataStudent) => {
      getMonHoc().then((dataMonHoc)=>{
        getDangKyMon().then((dataDangKyMon)=>{
          dispatch(getDataSuccessRegisterSubject(dataStudent,dataMonHoc,dataDangKyMon,monHoc))
        })
      })
    })
    .catch((err) => {console.log('err:', err);alert('ERROR')})
  }
}
function changeIndexCheck(index) {
  return {
    type:FETCHING_DATA_CHANGECHECK_REGISTER_SUBJECT,
    index
  }
}
export function changeCheck(index) {
  return (dispatch) => {
    dispatch(changeIndexCheck(index))    
  }
}