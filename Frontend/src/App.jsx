import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import Dashboard from './Dashboard'
import Aiboxfet from './components/Aiboxfet'
const App = () => {
  return (
    <div>
      <Navbar />
      <Searchbar />
      <Dashboard />
      <div className=' relative'>
      <Aiboxfet />
      </div>
    </div>
  )
}

export default App