
export default () => {
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