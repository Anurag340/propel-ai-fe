import ReactDOM from 'react-dom/client'
import App from './App'
import '../index.css' // Share the same CSS for consistent look (Tailwind/Variables)

ReactDOM.createRoot(document.getElementById('extension-root')!).render(
    <App />
)
