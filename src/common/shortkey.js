

class ShortKey{


    /**
     * 
     * @param {按键的ASCII} key 
     */
    mask(key) {
        document.onkeydown = () => {
            console.log(key)
            if (event.keyCode == key) {  
                return false; 
            }
        }
    }


}


module.exports = ShortKey