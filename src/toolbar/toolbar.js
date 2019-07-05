const items = require('./items')
require('./toolbar.css')

let tmpl = `
    <div class='toolbar'>
        <nav class='tabs' id="tabs">
            <button type="button" class="active">Markdown</button>
            <button type="button">预览</button>
        </nav>
        <ul class="tbs" id="items">
           <items/>
        </ul>
    </div>
`

const toolbarItem = {
    tabs: null,
    bm: null,
    preview: null,

    init: function(_this){
        const div = document.getElementById('items')
        for(let child of div.children) {
            const name = child.getAttribute('data-cmd')
            for(let item of items) {
                if(name == item.name) {
                    const fn = item.handler.bind(_this)
                    child.onclick = fn
                    _this.lmditor.shortKey.bind(`${item.key}`, fn)
                    break;
                }
            }
        }
    }
}


class Toolbar {
    constructor(lmditor){
        this.lmditor = lmditor
        let itemstag = ''
        for(let item of items) {
            itemstag += `<i data-cmd="${item.name}" class="item fa ${item.icon}" title="${ item.title + ' ' + item.key }"></i>` + '\n'
        }
        tmpl = tmpl.replace('<items/>', itemstag)
    }

    init(){
        toolbarItem.init(this)
        toolbarItem.tabs = document.getElementById('tabs')
        toolbarItem.bm = toolbarItem.tabs.firstElementChild
        toolbarItem.preview = toolbarItem.tabs.lastElementChild
        toolbarItem.bm.onclick = () => this.active(toolbarItem.bm)
        toolbarItem.preview.onclick = () => this.active(toolbarItem.preview)


        //绑定 toolbar 快捷键
        // this.lmditor.shortKey.bind('ctrl+alt+b', () => this.lmditor.editor.insertSelectText('**','**'))
        // this.lmditor.shortKey.bind('ctrl+alt+i', () => this.lmditor.editor.insertSelectText('*','*'))
        // this.lmditor.shortKey.bind('ctrl+alt+e', () => this.lmditor.editor.insertSelectText('<u>','</u>'))
        // this.lmditor.shortKey.bind('ctrl+alt+d', () => this.lmditor.editor.insertSelectText('~~','~~'))
        // this.lmditor.shortKey.bind('ctrl+alt+1', () => this.lmditor.editor.insertSelectText('#',''))
        // this.lmditor.shortKey.bind('ctrl+alt+q', () => this.lmditor.editor.insertSelectText('>',''))
        // this.lmditor.shortKey.bind('ctrl+alt+c', () => this.lmditor.editor.insertSelectText('```js', this.lmditor.EOL + '```'))
        // this.lmditor.shortKey.bind('ctrl+alt+o', () => this.lmditor.editor.insertSelectText('1. ',''))
        // this.lmditor.shortKey.bind('ctrl+alt+u', () => this.lmditor.editor.insertSelectText('-- ',''))
        // this.lmditor.shortKey.bind('ctrl+alt+l', () => this.lmditor.editor.insertSelectText('[link](',')'))
        // this.lmditor.shortKey.bind('ctrl+alt+t', () => {
        //     let buffer = [
        //         'column1 | column2 | column3  ',
        //         '------- | ------- | -------  ',
        //         'column1 | column2 | column3  ',
        //         'column1 | column2 | column3  ',
        //         'column1 | column2 | column3  '
        //       ];
        //       this.lmditor.editor.insertSelectText(buffer.join(this.lmditor.EOL) + this.lmditor.EOL,'')
        // })
        // this.lmditor.shortKey.bind('ctrl+alt+h', () => this.lmditor.editor.insertSelectText('----', this.lmditor.EOL))
    }
    
    get() {
        return tmpl
    }

    active(ele){
        ele.classList.add('active')
        if(ele == toolbarItem.bm) {
            toolbarItem.preview.classList.remove('active')
            this.lmditor.editor.editor()
        } else {
            toolbarItem.bm.classList.remove('active')
            this.lmditor.editor.preview()
        }
    }

     onactivebm = (fn) => fn
     onactivepreview = (fn) => fn

}

module.exports = Toolbar