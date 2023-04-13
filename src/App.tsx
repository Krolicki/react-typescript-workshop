import './App.css'
import { Select } from './components/Select/Select'

const options = [
  { label: "one", value: 1},
  { label: "two", value: 2},
  { label: "three", value: 3},
  { label: "four", value: 4},
  { label: "five", value: 5}
]

function App() {

  return (
    <div className="App">
      <Select options={options}/>
    </div>
  )
}

export default App
