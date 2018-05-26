
export default () => {
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