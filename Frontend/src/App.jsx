import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import Dashboard from './Dashboard'
import ChatWithReviews from './components/ChatWithReviews'
import Aiboxfet from './components/Aiboxfet'
const App = () => {
  return (
    <div>
      <Navbar />
      <Searchbar />
      {/* <ChatWithReviews /> */}
      <Dashboard />
      <div className=' relative'>
      <Aiboxfet />
      </div>
    </div>
  )
}

export default App