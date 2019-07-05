const Parser = require('../common/parser')
const ShortKey = require('../common/shortkey')
const Toolbar = require('../toolbar/toolbar')
const Editor = require('../editor/editor')

require('./index.css')
require('github-markdown-css/github-markdown.css');
require('prismjs/themes/prism.css');

const tmpl = `
    <div id="lmditor" style="width:{width}; height:{height};">
        <toolbar/>
        <editor/>
    </div>
`

class LMditor {
    constructor(ele, cfg){
        this.ele = ele
        this.cfg = cfg || {}
        this.PLATFORM = navigator.platform.toLowerCase();
        this.EOL = this.PLATFORM == 'win32' ? '\r\n' : '\n';
        this.INDENT = '  ';
        this.isFullscreen = false;

        this.shortKey = new ShortKey()
        this.parser = new Parser(this)
        this.toolbar = new Toolbar(this)
        this.editor = new Editor(this)
        const html = tmpl.replace('<toolbar/>', this.toolbar.get())
            .replace('<editor/>', this.editor.get())
            .replace('{width}', this.cfg.width == undefined ? '100%' : this.cfg.width)
            .replace('{height}', this.cfg.height == undefined ? '400px' : this.cfg.height)
        this.ele.insertAdjacentHTML('beforebegin', html)
        this.ele.style = 'display:none'
        this.ele.setAttribute('disabled', 'true')
        this.onReady()
    }

    onReady() {
        this.toolbar.init()
        this.editor.init()
        this.editor.setSelectText(this.ele.innerHTML)
    }

    getValue(){
        return this.editor.getValue()
    }

    html() {
        return this.parser.parse(this.getValue())
    }

    fullscreen() {
        const lmditor = document.getElementById('lmditor')
        !this.isFullscreen 
            ? lmditor.classList.add('fullscreen')
            : lmditor.classList.remove('fullscreen')
        this.isFullscreen = !this.isFullscreen
    }

    
}

module.exports = window.LMditor = LMditor;