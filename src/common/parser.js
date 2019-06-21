const marked = require('marked')
const prismjs = require('prismjs')


require('prismjs/components/prism-java')

const Parser = function (options) {
    options = options || {};
    this.options = options;
}
  
Parser.highlights = {};
Parser.marked = marked;
Parser.Prism = Prism;

//使标题解析 # 号可以无空格
marked.Lexer.rules.gfm.heading = marked.Lexer.rules.heading;
marked.Lexer.rules.tables.heading = marked.Lexer.rules.heading;

let renderer = new marked.Renderer();
Parser.renderer = renderer;
marked.setOptions({
    renderer: renderer, gfm: true, tables: true, breaks: true, //可行尾不加两空格直接换行
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    mangle: false,
    highlight: function (code, lang, callback) {
        if (Parser.highlights[lang]) {
        let result = Parser.highlights[lang].parse(code, lang, callback);
        if (!callback)
            return result;
        } else if (Prism.languages[lang]) {
        let result = Prism.highlight(code, Prism.languages[lang]);
        if (callback)
            return callback(null, result);
        else
            return result;
        } else {
        if (callback) //eslint-disable-line
            return callback(null, code);
        else
            return code;
        }
    }
});
  
Parser.prototype.parse = function (mdText, callback) {
    return marked(mdText, callback);
};

module.exports = Parser