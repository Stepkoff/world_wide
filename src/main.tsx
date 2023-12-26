import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.sass'
import { App } from '@/app/App'
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
