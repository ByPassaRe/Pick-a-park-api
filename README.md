<p align="center">
  <img src="/assets/images/logo.png" alt="Pick-A-Park"/>
</p>
 
API backend for Pick-a-park project

![](https://github.com/ByPassaRe/Pick-a-park-api/workflows/Node%20CI/badge.svg)
![](https://github.com/ByPassaRe/Pick-a-park-api/workflows/Development%20container/badge.svg)

## VSCode autofix using ESlint and Prettier

To make VsCode autofix your code using prettier and Eslint add this to the general settings.json file (search using Ctrl+Shift+p)


```
"eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ]
```

For example this is my configuration:
```
{
    "editor.suggestSelection": "first",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ]
    
}
```
