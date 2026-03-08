/**
 * App component - Main application entry point
 * 
 * Renders the router provider to enable client-side routing throughout the application.
 * Currently includes unused state management (count/setCount) that should be removed or utilized.
 * 
 * @component
 * @returns {React.ReactElement} The root App component with router configuration
 * 
 * @example
 * // Usage in index.jsx or main entry point
 * import App from './App'
 * 
 * ReactDOM.createRoot(document.getElementById('root')).render(<App />)
 */
import { useState } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'
import './style.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
