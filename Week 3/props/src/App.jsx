import './App.css'
import Country from './components/Country'

function App() {

  const countryName = "Canada";

  return (
    <div>
      <Country countryValue={countryName} />
    </div>
  )
}

export default App
