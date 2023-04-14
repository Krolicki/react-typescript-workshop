import { useState } from 'react'
import './App.css'
import { Select, SelectOption } from './components/Select/Select'

const options = [
  { label: "one", value: 1 },
  { label: "two", value: 2 },
  { label: "three", value: 3 },
  { label: "four", value: 4 },
  { label: "five", value: 5 }
]

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0])

  return (
    <div className="App">
      <Select
        options={options}
        value={value}
        onChange={o => setValue(o)}
      />
    </div>
  )
}

export default App
