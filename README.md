# moonbit-js-debug-demo

## How to debug

You need [moonbit toolchain](https://www.moonbitlang.com/download/) first.

### Debug in browser

```bash
moon build --target js --debug
@python3 -m http.server 8080 # Or other http server
```

Open your chrome browser, then you can use devtools to debug.

### Debug in vscode

See `.vscode/launch.json`
