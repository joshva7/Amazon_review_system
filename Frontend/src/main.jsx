import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import { Prodatesprov } from './globalcontext/Prodatesetprov.jsx'
createRoot(document.getElementById('root')).render(
  <>
    <Prodatesprov>
    <Home />
    </Prodatesprov>
  </>,
)
