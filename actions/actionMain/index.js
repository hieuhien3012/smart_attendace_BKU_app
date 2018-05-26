onOrOffAnimating = (state) => {
    if (state == true)
        return {
            type : 'on',
            value:true
        } 
    else 
        return {
            type : 'off',
            value:false
        }
}
export {onOrOffAnimating}
