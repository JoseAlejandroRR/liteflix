export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

const { VITE_SITE_TITLE, VITE_SITE_DESCRIPTION } = process.env


import ReactDOMServer from 'react-dom/server'
import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import type { PageContextServer } from './types'

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )

  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) ? `${documentProps.title} - ${VITE_SITE_TITLE}` : VITE_SITE_TITLE
  const desc = (documentProps && documentProps.description) || VITE_SITE_DESCRIPTION

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" sizes="any" href="/icon.png" />
        <meta http-equiv="Content-Language" content="es">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc!}" />
        <title>${title!}</title>
        <link href="https://fonts.cdnfonts.com/css/bebas-neue?styles=17623,17625,169713,17621,17624,17622,17620" rel="stylesheet">
        <!-- Enlace asíncrono de la fuente para navegadores con JavaScript habilitado -->
        <!--link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"-->
         <script>
          /*window.addEventListener('load', () => {
            const fontLink = document.createElement('link');
            fontLink.href = 'https://fonts.cdnfonts.com/css/bebas-neue?styles=17623,17625,169713,17621,17624,17622,17620';
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
          });*/
        </script>

        <!-- Alternativa para usuarios sin JavaScript -->
        <noscript>
          <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/bebas-neue?styles=17623,17625,169713,17621,17624,17622,17620">
        </noscript>
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}
