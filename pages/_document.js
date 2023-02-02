import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      Head;
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <title>Portfolio</title>
          <meta name="robots" content="all" />
          <meta
            name="description"
            content="this is my portfolio website parmeshwar.me"
          />
          <script
            src="https://platform.linkedin.com/badges/js/profile.js"
            async
            defer
            type="text/javascript"
          ></script>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          />
          <link rel="icon" type="image/png" href={"/favicon.png"} />
          <link rel="canonical" href="http://www.parmeshwar.me/about" />
          <link rel="alternate" hreflang="en" href ="http://www.parmeshwar.me/" />

        </Head>

        <body>
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    );
  }
}
