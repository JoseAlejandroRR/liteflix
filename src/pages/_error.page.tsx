// src/pages/error.page.tsx
import React from 'react';

export { Page, renderError };

interface ErrorPageProps {
  is404?: boolean;
}

const Page: React.FC<ErrorPageProps> = ({ is404 }) => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>{is404 ? 'Página No Encontrada' : 'Ocurrió un Error'}</h1>
      <p>
        {is404
          ? 'Lo sentimos, no pudimos encontrar la página que estás buscando.'
          : 'Ocurrió un error inesperado. Intenta nuevamente más tarde.'}
      </p>
    </div>
  );
};

// Esta función le indica a `vite-plugin-ssr` que esta es una página de error
function renderError({ is404 }: { is404: boolean }) {
  return { Page, pageProps: { is404 } };
}
