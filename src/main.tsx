import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './Router.tsx'
import "./styles/variables.css";
import "./styles/style.css";
import { AuthProvider } from './context/Auth/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
