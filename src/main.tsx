import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

/** 禁用右键菜单 */
window.addEventListener("contextmenu", (e) => e.preventDefault(), false);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
