import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.sass'
import { App } from '@/app/App'
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";
import {ThemeProvider} from "@/features/Theme";
import {AuthProvider} from "@/features/AuthFake";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
