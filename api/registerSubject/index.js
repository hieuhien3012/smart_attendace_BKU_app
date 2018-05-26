getMonHoc = () => {
    return new Promise((resolve, reject) => {
        fetch('http://doantotnghiep.herokuapp.com/monHoc', {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
            console.log(JSON.stringify(responseJson))
            resolve(responseJson)
        }).catch((error) => {
            console.error(error);
            return reject('ERROR')
        });
    })
}

getDangKyMon = () => {
    return new Promise((resolve, reject) => {
        fetch('http://doantotnghiep.herokuapp.com/dangKyMonHoc', {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
            console.log(JSON.stringify(responseJson))
            resolve(responseJson)
        }).catch((error) => {
            console.error(error);
            return reject('ERROR')
        });
    })
}

getStudent = () => {
    return new Promise((resolve, reject) => {
        fetch('https://doantotnghiep.herokuapp.com/allData1', {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
            console.log(JSON.stringify(responseJson))
            resolve(responseJson)
        }).catch((error) => {
            console.error(error);
            return reject('ERROR')
        });
    })
}

sendRemoveRegisterSubject = (monHoc) => {
    return new Promise((resolve, reject) => {
        fetch('https://doantotnghiep.herokuapp.com/removeDangKyMonHoc/?monHoc='+monHoc, {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
            if(responseJson.status == 'OK') {
                console.log(JSON.stringify(responseJson))
                resolve()
            } else {
                console.error(error);
                return reject('ERROR')    
            }
        }).catch((error) => {
            console.error(error);
            return reject('ERROR')
        });
    })
}
sendRegisterSubject = (data) => {
    return new Promise((resolve, reject) => {
        fetch('https://doantotnghiep.herokuapp.com/saveJsonDangKyMon/?json='+JSON.stringify(data), {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
            if(responseJson.status == 'OK') {
                console.log(JSON.stringify(responseJson))
                resolve("Register Success")
            } else {
                console.error(error);
                return reject('ERROR')                
            }
        }).catch((error) => {
            console.error(error);
            return reject('ERROR')
        });
    })
}

export {getMonHoc,getStudent,getDangKyMon,sendRegisterSubject,sendRemoveRegisterSubject};