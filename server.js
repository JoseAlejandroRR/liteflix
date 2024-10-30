// server.mjs
import express from 'express';
import { createPageRenderer } from 'vite-plugin-ssr';

const isProduction = process.env.NODE_ENV === 'production';
const root = process.cwd();

async function startServer() {
  const app = express();

  let viteDevServer;
  if (!isProduction) {
    const { createServer } = await import('vite');
    viteDevServer = await createServer({
      root,
      server: { middlewareMode: 'ssr' },
    });
    app.use(viteDevServer.middlewares);
  } else {
    app.use(express.static(`${root}/dist/client`));
  }

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root });

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;
    const pageContext = await renderPage({ url });
    const { httpResponse } = pageContext;

    if (!httpResponse) return next();
    res.status(httpResponse.statusCode).set(httpResponse.headers).send(httpResponse.body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
