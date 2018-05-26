import {
    FETCHING_DATA_REGISTER_SUBJECT, FETCHING_DATA_SUCCESS_REGISTER_SUBJECT, 
    FETCHING_DATA_FAILURE_REGISTER_SUBJECT,
    FETCHING_DATA_CHANGECHECK_REGISTER_SUBJECT} from '../../constants'
    const initialState = {
      data: [],
      dataFetched: false,
      isFetching: false,
      error: false
    }
    

    function getRegisterSubjectData (state = initialState, action) {
      switch (action.type) {
        case FETCHING_DATA_CHANGECHECK_REGISTER_SUBJECT : {
            var data = state.data
            data[action.index].check = ! data[action.index].check
            return {
                ...state,
                data,
            }
        }
        case FETCHING_DATA_REGISTER_SUBJECT:
          return {
            ...state,
            data: [],
            isFetching: true
          }
        case FETCHING_DATA_SUCCESS_REGISTER_SUBJECT: {
            const dsMonHoc = action.dataMonHoc;
            var student = action.dataStudent;
            const dangKyMon = action.dataDangKyMon
            student.map((value)=>{
                value.check = false
                if (dangKyMon.length !=0) {
                    dangKyMon.map((valueDangKyMon)=>{
                        if (valueDangKyMon.tenMonHoc == action.monHoc) {
                            value.id == valueDangKyMon.id?value.check = true:null
                        }  
                    })
                } else {
                    value.check = false
                }
                dsMonHoc.map((valueMonHoc)=>{
                    if (valueMonHoc.tenMonHoc == action.monHoc) {
                        value.timeStart = valueMonHoc.timeStart;
                        value.timeEnd = valueMonHoc.timeEnd;
                        value.thu = valueMonHoc.thu;
                        value.nghihoc = false;
                        value.tenMonHoc = action.monHoc
                    }
                })               
            })
            return {
                ...state,
                isFetching: false,
                data: student
            }
        } 
        case FETCHING_DATA_FAILURE_REGISTER_SUBJECT: 
          return {
            ...state,
            isFetching: false,
            error: true
          }
        default:
          return state
      }
    }
   
    export {getRegisterSubjectData}