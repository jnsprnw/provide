## Style Dictionary transformation

The scripts here transforms the design tokens exportted from e.g. Figma using [Amazon style dictionary](https://amzn.github.io/style-dictionary/#/).

1. Export design tokens from e.g. a [Figma file](https://www.figma.com/file/yoiDbDNxMw2pLeeC6QKFOE/Design-Tokens?node-id=0%3A1) using the [Design Tokens exporter plugin](https://github.com/lukasoppermann/design-tokens) to `./in/design_tokens.json`. Make sure to use the following settings:

<img width="637" alt="Screenshot 2022-01-12 at 18 04 10" src="https://user-images.githubusercontent.com/216044/149187257-12f5e3a1-8dcc-4d81-bc51-4d334c2a4efe.png">
<img width="547" alt="Screenshot 2022-01-12 at 18 03 54" src="https://user-images.githubusercontent.com/216044/149187277-b908b825-1034-4b8f-a3dd-34fb1d597c38.png">

1.   run `npm install; npm run build` and it will copy the processed theme files into `/prototype/www` and `/production/www`.
