module.exports = [{
    name: 'bold',
    title: '粗体',
    key: 'ctrl+alt+b',
    icon: 'fa-bold',
    handler() {
      this.lmditor.editor.insertSelectText('**', '**');
    }
  }, {
    name: 'italic',
    title: '斜体',
    key: 'ctrl+alt+i',
    icon: 'fa-italic',
    handler() {
      this.lmditor.editor.insertSelectText('*', '*');
    }
  }, {
    name: 'underline',
    title: '下划线',
    key: 'ctrl+alt+e',
    icon: 'fa-underline',
    handler() {
      this.lmditor.editor.insertSelectText('<u>', '</u>');
    }
  }, {
    name: 'strikethrough',
    title: '删除线',
    key: 'ctrl+alt+d',
    icon: 'fa-strikethrough',
    handler() {
      this.lmditor.editor.insertSelectText('~~', '~~');
    }
  }, {
    name: 'header',
    title: '标题',
    key: 'ctrl+alt+1',
    icon: 'fa-header',
    handler() {
      this.lmditor.editor.insertSelectText('# ');
    }
  }, {
    name: 'quote',
    icon: 'quote-left',
    title: '引用',
    key: 'ctrl+alt+q',
    icon: 'fa-quote-left',
    handler() {
      let selectText = this.lmditor.editor.getSelectText();
      if (selectText.length < 1) {
        this.lmditor.editor.insertSelectText('> ');
        return;
      }
      let textArray = selectText.split(this.EOL);
      let buffer = [];
      textArray.forEach(function (line) {
        buffer.push('> ' + line + '  ');
      });
      this.lmditor.editor.setSelectText(buffer.join(this.EOL) + this.EOL);
    }
  }, {
    name: 'code',
    title: '代码',
    key: 'ctrl+alt+c',
    icon: 'fa-code',
    handler() {
      let lang = 'js' + this.lmditor.EOL;
      let before = '```' + lang;
      let after = '```  ' + this.lmditor.EOL;
      let text = this.lmditor.editor.getSelectText().trim();
      if (text.length > 0) {
        text += this.lmditor.EOL;
      }
      this.lmditor.editor.setSelectText(text);
      this.lmditor.editor.insertSelectText(before, after);
      let range = this.lmditor.editor.getSelectRange();
      let start = range.start - lang.length;
      let end = range.start - this.lmditor.EOL.length;
      this.lmditor.editor.setSelectRange(start, end);
    }
  }, {
    name: 'list-ol',
    title: '有序列表',
    key: 'ctrl+alt+o',
    icon: 'fa-list-ol',
    handler() {
      let selectText = this.lmditor.editor.getSelectText();
      if (selectText.length < 1) {
        this.lmditor.editor.insertSelectText('1. ');
        return;
      }
      let textArray = selectText.split(this.lmditor.EOL);
      let buffer = [];
      for (let i = 0; i < textArray.length; i++) {
        let line = textArray[i];
        buffer.push((i + 1) + '. ' + line);
      }
      this.lmditor.editor.setSelectText(buffer.join(this.lmditor.EOL) + this.lmditor.EOL);
    }
  }, {
    name: 'list-ul',
    title: '无序列表',
    key: 'ctrl+alt+u',
    icon: 'fa-list-ul',
    handler() {
      let selectText = this.lmditor.editor.getSelectText();
      if (selectText.length < 1) {
        this.lmditor.editor.insertSelectText('- ');
        return;
      }
      let textArray = selectText.split(this.lmditor.EOL);
      let buffer = [];
      textArray.forEach(function (line) {
        buffer.push('- ' + line);
      });
      this.lmditor.editor.setSelectText(buffer.join(this.lmditor.EOL) + this.lmditor.EOL);
    }
  }, {
    name: 'link',
    title: '链接',
    key: 'ctrl+alt+l',
    icon: 'fa-link',
    handler() {
      let text = this.lmditor.editor.getSelectText();
      if (!text || /^(https:|http:|ftp:|file:|mailto:|\/|\.)/i.test(text)) {
        this.lmditor.editor.insertSelectText('[link](', ')');
        if (!text) return;
        let range = this.lmditor.editor.getSelectRange();
        let start = range.start - 6;
        this.lmditor.editor.setSelectRange(start, start + 4);
      } else {
        this.lmditor.editor.insertSelectText('[', ']()');
        let range = this.lmditor.editor.getSelectRange();
        let index = range.end + 2;
        this.lmditor.editor.setSelectRange(index, index);
      }
    }
  }, {
    name: 'table',
    title: '表格',
    key: 'ctrl+alt+t',
    icon: 'fa-table',
    handler() {
      let buffer = [
        'column1 | column2 | column3  ',
        '------- | ------- | -------  ',
        'column1 | column2 | column3  ',
        'column1 | column2 | column3  ',
        'column1 | column2 | column3  '
      ];
      this.lmditor.editor.insertSelectText(buffer.join(this.lmditor.EOL) + this.lmditor.EOL);
    }
  }, {
    name: 'line',
    title: '分隔线',
    key: 'ctrl+alt+h',
    icon: 'fa-minus',
    handler() {
      this.lmditor.editor.insertSelectText('----' + this.lmditor.EOL);
    }
  }, {
    name: 'toggleFullScreen',
    title: '全屏',
    icon: 'fa-arrows-alt',
    key: 'ctrl+alt+f',
    handler() {
      this.lmditor.fullscreen()
    }
  }
];