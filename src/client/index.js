const Parser = require('../common/parser')
const ShortKey = require('../common/shortkey')
const Toolbar = require('../toolbar/toolbar')
const Editor = require('../editor/editor')

require('./index.css')
require('github-markdown-css/github-markdown.css');
require('prismjs/themes/prism.css');

const tmpl = `
    <div class="lmditor">
        <toolbar/>
        <editor/>
    </div>
`

class LMditor {
    constructor(ele){
        this.ele = ele
        this.toolbar = new Toolbar(this)
        this.editor = new Editor(this)
        const html = tmpl.replace('<toolbar/>', this.toolbar.get())
            .replace('<editor/>', this.editor.get())
        this.ele.insertAdjacentHTML('afterbegin', html)
        this.onReady()
    }

    onReady() {
        this.toolbar.init()
        this.editor.init()
        this.parser = new Parser(this)
        this.shortKey = new ShortKey()
        this.editor.onEdtorFocus = () => this.shortKey.mask(9)
    }

    value(){
        return this.editor.value()
    }

    html() {
        return this.parser.parse(this.value())
    }

    
}

module.exports = window.LMditor = LMditor;