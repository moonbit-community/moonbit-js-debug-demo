# moonbit-js-debug-demo

## How to debug

You need [moonbit toolchain](https://www.moonbitlang.com/download/) and a http server first.

```bash
moon build --target js --debug
@python3 -m http.server 8080
```

Open your chrome browser, then you can use devtools to debug.
