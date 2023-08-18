# Netlify Flutter Build Plugin

[Netlify Build Plugin](https://docs.netlify.com/configure-builds/build-plugins/)
adding support to build [Flutter](https://flutter.dev) web apps to Netlify.

## Install

Please install this plugin from the Netlify app.

Manual installation:

    $ npm install -D netlify-plugin-flutter

Add the following to your Netlify site's `netlify.toml` file:

```yaml
[[plugins]]

  package = "netlify-plugin-flutter"

  [plugins.inputs]
  channel = "stable"

[build]

command = "flutter build web --release"
publish = "build/web"
```

## Configuration

The following `inputs` options are available.

| Name      | Type   | Default  | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `channel` | string | `stable` | Flutter channel to install. |
| `version` | string | null | Specific Flutter version to install instead of using a channel |

These options should be written in the `netlify.toml` file as in the example
bellow.
