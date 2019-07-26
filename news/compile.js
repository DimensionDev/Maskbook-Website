const fs = require('fs');
const markdown = require('markdown-it')();

var entriesList = JSON.parse(fs.readFileSync('list.json').toString()).reverse();

var templates = {
    indexPage: fs.readFileSync('index.template.html').toString(),
    eventItem: fs.readFileSync('item.template.html').toString(),
    link: fs.readFileSync('templates/link.html').toString(),
    news: fs.readFileSync('templates/news.html').toString(),
    host: fs.readFileSync('templates/host.html').toString(),
    guest: fs.readFileSync('templates/guest.html').toString()
};

var renderHtmlWithArgv = function (tmplName, argv) {
    return templates[tmplName].replace(/\$\{\s+?([0-9A-Za-z\_\-]+)\s+?\}/gi, function () {
        return argv[arguments[1]];
    });
};

var entriesListHtml = entriesList.map(function (entryDataObj) {
    var entryHtml = renderHtmlWithArgv(entryDataObj.type, entryDataObj);
    return entryHtml;
}).join('');

var indexPage = renderHtmlWithArgv('indexPage', { entriesListHtml: entriesListHtml });
fs.writeFileSync('index.html', indexPage);

entriesList.map(function (entryDataObj) {
    if (['host','guest','news'].indexOf(entryDataObj.type) >= 0) {
        entryDataObj.content = markdown.render(fs.readFileSync(`db/${entryDataObj.index}.md`).toString());
        fs.writeFileSync(`a/${entryDataObj.index}.html`, renderHtmlWithArgv('eventItem', entryDataObj));
    };
});
