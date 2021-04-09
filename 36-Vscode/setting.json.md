```json
{

"files.associations": {
"*.vue": "vue",
"*.wpy": "vue",
"*.wxml": "html",
"*.wxss": "css"
},
"terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
"git.enableSmartCommit": true,
"git.autofetch": true,
"emmet.triggerExpansionOnTab": true,
"emmet.showAbbreviationSuggestions": true,
"emmet.showExpandedAbbreviation": "always",
"emmet.includeLanguages": {
"vue-html": "html",
"vue": "html",
"wpy": "html"
},
//主题颜色
//"workbench.colorTheme": "Monokai",
"git.confirmSync": false,
"explorer.confirmDelete": false,
"editor.fontSize": 12,
"window.zoomLevel": 1,
"editor.wordWrap": "on",
"editor.detectIndentation": false,
// 重新设定tabsize
"editor.tabSize": 2,
//失去焦点后自动保存
"files.autoSave": "onFocusChange",
// #值设置为true时，每次保存的时候自动格式化；
"editor.formatOnSave": false,
//每120行就显示一条线
"editor.rulers": [
],
// 在使用搜索功能时，将这些文件夹/文件排除在外
"search.exclude": {
"**/node_modules": true,
"**/bower_components": true,
"**/target": true,
"**/logs": true,
},
// 这些文件将不会显示在工作空间中
"files.exclude": {
"**/.git": true,
"**/.svn": true,
"**/.hg": true,
"**/CVS": true,
"**/.DS_Store": true,
"**/*.js": {
"when": "$(basename).ts" //ts编译后生成的js文件将不会显示在工作空中
},
"**/node_modules": true
},
// #让vue中的js按"prettier"格式进行格式化
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatter.js": "prettier",
"vetur.format.defaultFormatterOptions": {
"js-beautify-html": {
// #vue组件中html代码格式化样式
"wrap_attributes": "force-aligned", //也可以设置为“auto”，效果会不一样
"wrap_line_length": 200,
"end_with_newline": false,
"semi": false,
"singleQuote": true
},
"prettier": {
"semi": false,
"singleQuote": true
}
},
"workbench.iconTheme": "vscode-icons",
"editor.fontLigatures": null,
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[json]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"js/ts.implicitProjectConfig.experimentalDecorators": true,
"javascript.updateImportsOnFileMove.enabled": "always",
"[scss]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[less]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"hediet.vscode-drawio.local-storage": "eyIuZHJhd2lvLWNvbmZpZyI6IntcImxhbmd1YWdlXCI6XCJcIixcImN1c3RvbUZvbnRzXCI6W10sXCJsaWJyYXJpZXNcIjpcImdlbmVyYWxcIixcImN1c3RvbUxpYnJhcmllc1wiOltcIkwuc2NyYXRjaHBhZFwiXSxcInBsdWdpbnNcIjpbXSxcInJlY2VudENvbG9yc1wiOltdLFwiZm9ybWF0V2lkdGhcIjpcIjI0MFwiLFwiY3JlYXRlVGFyZ2V0XCI6ZmFsc2UsXCJwYWdlRm9ybWF0XCI6e1wieFwiOjAsXCJ5XCI6MCxcIndpZHRoXCI6ODUwLFwiaGVpZ2h0XCI6MTEwMH0sXCJzZWFyY2hcIjp0cnVlLFwic2hvd1N0YXJ0U2NyZWVuXCI6dHJ1ZSxcImdyaWRDb2xvclwiOlwiI2QwZDBkMFwiLFwiZGFya0dyaWRDb2xvclwiOlwiIzZlNmU2ZVwiLFwiYXV0b3NhdmVcIjp0cnVlLFwicmVzaXplSW1hZ2VzXCI6bnVsbCxcIm9wZW5Db3VudGVyXCI6MCxcInZlcnNpb25cIjoxOCxcInVuaXRcIjoxLFwiaXNSdWxlck9uXCI6ZmFsc2UsXCJ1aVwiOlwiXCJ9In0=",
"workbench.colorTheme": "Default Dark+",
"[vue]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"vetur.ignoreProjectWarning": true,
"[jsonc]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"code-runner.runInTerminal": true,
"explorer.confirmDragAndDrop": false,
"[html]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascriptreact]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"vsicons.dontShowNewVersionMessage": true
}

```

