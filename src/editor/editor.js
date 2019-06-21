require('./editor.css')

const tmpl = `
    <div class="body">
        <textarea autofocus id="lmarea"></textarea>
        <div id="preview" class="markdown-body"></div>
    </div>
`
const editorItem = {
    lmarea: null,
    lmareaFocusFn: function(){},


    preview: null,

}

class Editor {
    constructor(lmditor){
        this.lmditor = lmditor
    }
    init() {
        editorItem.lmarea = document.getElementById('lmarea')
        editorItem.preview = document.getElementById('preview')
        editorItem.lmarea.onfocus = () => editorItem.lmareaFocusFn
    }

    get() {
        return tmpl
    }

    value() {
       return editorItem.lmarea.value
    }

    editor() {
        editorItem.preview.style = 'display:none'
        editorItem.lmarea.style = 'display:block'
    }

    preview() {
        editorItem.preview.style = 'display:block'
        editorItem.lmarea.style = 'display:none'
        editorItem.preview.innerHTML = ''
        editorItem.preview.insertAdjacentHTML('afterbegin', this.lmditor.html())
    }

    /**
     *  编辑框获取焦点回调
     */
    onEdtorFocus = (fn) => editorItem.lmareaFocusFn = fn

}

module.exports = Editor