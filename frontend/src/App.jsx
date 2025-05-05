import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [userInfo, setUserInfo] = useState()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo())
    })();
    fetchProducts()
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      console.log('Client Principal:', clientPrincipal);
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  // Fetch products from the API
  async function fetchProducts() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const redirect = window.location.pathname
  const provider = 'github'

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Azure WebApps</h1>
      <div className="card">
      <a href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}>
          Login
        </a>
        <br/>
        <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>Logout</a>
        <br/>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <hr />
        <h2>Products</h2>
        {loading && <p>Loading products...</p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong>: {product.description} (Qty: {product.quantity})
            </li>
          ))}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
