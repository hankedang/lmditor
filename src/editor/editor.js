require('./editor.css')
import hotkeys from 'hotkeys-js';

const tmpl = `
    <div class="body">
        <textarea autofocus id="lmarea" name='{name}' placeholder='{placeholder}' htmlEscape="true"></textarea>
        <div id="preview" class="markdown-body"></div>
    </div>
`
const editorItem = {
    lmarea: null,
    lmareaFocusFn: function(){},
    lmareaBlurFn: function(){},

    preview: null,

}

class Editor {
    constructor(lmditor){
        this.lmditor = lmditor
    }
    init() {
        editorItem.lmarea = document.getElementById('lmarea')
        editorItem.preview = document.getElementById('preview')
        editorItem.lmarea.onfocus = editorItem.lmareaFocusFn
        editorItem.lmarea.onblur = editorItem.lmareaBlurFn
        //绑定 tab 快捷键
        this.lmditor.shortKey.bind('tab', () => this.insertBeforeText(this.lmditor.INDENT))
       
    }

    get() {
        let tmp =  tmpl.replace('{name}', this.lmditor.ele.getAttribute('name'))
        if(this.lmditor.cfg.placeholder != undefined) {
            tmp = tmp.replace('{placeholder}', this.lmditor.cfg.placeholder)
        }
        return tmp
    }

    getValue() {
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

    focus() {
        editorItem.lmarea.focus()
    }
    
    blur() {
        editorItem.lmarea.blur()
    }

    getActiveElement() {
        editorItem.lmarea.focus();
        return document.activeElement;
    }

    getSelectRange() {
        let box = this.getActiveElement()
        return {
            'start': box.selectionStart,
            'end': box.selectionEnd
        }
    }
    
    setSelectRange(start, end) {
        let box = this.getActiveElement()
        box.setSelectionRange(start, end)
    }
    
    getSelectText() {
        let box = this.getActiveElement()
        let range = this.getSelectRange()
        return box.value.substring(range.start, range.end)
    }

    setSelectText(text) {
        let box = this.getActiveElement();
        let range = this.getSelectRange();
        box.setRangeText(text);
        if (range.end == range.start) {
          this.setSelectRange(range.start, range.end + text.length);
        }
        this.value = this.getValue();
        setTimeout(() => {
          this.blur();
          this.focus();
        }, 0);
    }

    insertSelectText(before, after) {
        before = (before !== null && before !== undefined) ? before : '';
        after = (after !== null && after !== undefined) ? after : '';
        let range = this.getSelectRange();
        let text = this.getSelectText();
        this.setSelectText(before + text + after);
        let newStart = range.start + before.length;
        let newEnd = range.end + before.length;
        this.setSelectRange(newStart, newEnd);
    }

    insertBeforeText(text) {
        this.insertSelectText(text);
    }
    
    insertAfterText(text) {
        this.insertSelectText('', text);
    }

    // 编辑框获取焦点
    onEditorFocus = (fn) => editorItem.lmareaFocusFn = fn

    // 编辑框失去焦点
    onEditorBlur = (fn) => editorItem.lmareaBlurFn = fn

}

module.exports = Editor