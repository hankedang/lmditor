

const tmpl = `
    <div class='toolbar'>
        <nav class='tabs'>

        </nav>
        <ul class="toolbar">
        <i data-cmd="bold" class="item fa fa-bold  " title="粗体 shift+alt+b"></i>
        <i data-cmd="italic" class="item fa fa-italic  " title="斜体 shift+alt+i"></i>
        <i data-cmd="underline" class="item fa fa-underline  " title="下划线 shift+alt+e"></i>
        <i data-cmd="strikethrough" class="item fa fa-strikethrough  " title="删除线 shift+alt+d"></i>
        <i data-cmd="header" class="item fa fa-header  " title="标题 shift+alt+1"></i>
        <i data-cmd="quote" class="item fa fa-quote-left  " title="引用 shift+alt+q"></i>
        <i data-cmd="code" class="item fa fa-code  " title="代码 shift+alt+c"></i>
        <i data-cmd="list-ol" class="item fa fa-list-ol  " title="有序列表 shift+alt+o"></i>
        <i data-cmd="list-ul" class="item fa fa-list-ul  " title="无序列表 shift+alt+u"></i>
        <i data-cmd="link" class="item fa fa-link" title="链接 shift+alt+l"></i>
        <i data-cmd="table" class="item fa fa-table" title="表格 shift+alt+t"></i>
        <i data-cmd="line" class="item fa fa-minus" title="分隔线 shift+alt+h"></i>
        <i data-cmd="toggleFullScreen" class="item fa fa-arrows-alt  control" title="全屏 shift+alt+f"></i>
      </ul>
    </div>
`


class Toolbar {
    constructor(){
 
    }
    
    get(){
        return tmpl
    }
}

module.exports = Toolbar