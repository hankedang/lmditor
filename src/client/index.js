const parse = require('../common/parser')
const prismjs = require('prismjs')
const Toolbar = require('../toolbar/toolbar')

require('github-markdown-css/github-markdown.css');
require('prismjs/themes/prism.css');

const tmpl = `
    <div>

    </div>
`

class LMditor {
    constructor(textarea){
        this.textarea = textarea
        const toolbar = new Toolbar()
        this.textarea.insertAdjacentHTML('beforebegin', toolbar.get())
    } 
    val(){
        return this.textarea.innerHTML
    }
}

module.exports = window.LMditor = LMditor;