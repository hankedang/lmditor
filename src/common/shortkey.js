import hotkeys from 'hotkeys-js';

hotkeys.filter = function(event){
    var tagName = (event.target || event.srcElement).tagName;
    hotkeys.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
    return true;
}

class ShortKey{

    /**
     * @param {string} key  绑定的快捷键
     * @param {function} fn 快捷键操作
     */
    bind(key, fn){
        hotkeys(key, function(event, handler){
            event.preventDefault()
            fn()
            return false
        })
    }

    unbind(key) {
        hotkeys.unbind(key)
    }
    

}


module.exports = ShortKey