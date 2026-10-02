import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SrContextProvider } from './context/srcontextprovider.tsx'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SrContextProvider>
        <HashRouter>
              <App />
        </HashRouter>
    </SrContextProvider>
  </StrictMode>,
)
