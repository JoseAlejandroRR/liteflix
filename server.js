import 'dotenv/config'
import express from 'express'
import { renderPage } from 'vite-plugin-ssr/server'

const isProduction = process.env.NODE_ENV === 'production'
const root = process.cwd()

async function startServer() {
  const app = express()

  let viteDevServer
  if (!isProduction) {
    const { createServer } = await import('vite')
    viteDevServer = await createServer({
      root,
      server: { middlewareMode: 'ssr' },
    })
    app.use(viteDevServer.middlewares)
  } else {
    console.log("❗️❗️ PRODUCTION MODE ❗️❗️")
    app.use(express.static(`${root}/dist/client`))
  }

  console.log('✅ Server running')

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
        urlOriginal: req.originalUrl
    }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext

    if (!httpResponse) return next()
    res.status(httpResponse.statusCode).set(httpResponse.headers).send(httpResponse.body)
  })

  const port = process.env.PORT || 5175
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

startServer()
