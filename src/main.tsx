import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './Router.tsx'
import "./styles/variables.css";
import "./styles/style.css";
import { AuthProvider } from './context/Auth/AuthProvider.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
)
