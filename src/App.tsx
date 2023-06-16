import { useState } from 'react'
import './App.css'
import { Select, SelectOption } from './components/Select/Select'
import { FetchData } from './components/FetchData/FetchData'

const options = [
  { label: "one", value: 1 },
  { label: "two", value: 2 },
  { label: "three", value: 3 },
  { label: "four", value: 4 },
  { label: "five", value: 5 }
]

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0])
  const [multipleValues, setMultipleValues] = useState<SelectOption[]>([options[0]])

  return (
    <div className="App">
      <Select
        multiple
        options={options}
        value={multipleValues}
        onChange={o => setMultipleValues(o)}
        data-testid="multipleSelect"
      />
      <Select
        options={options}
        value={value}
        onChange={o => setValue(o)}
        data-testid="singleSelect"
      />
      <FetchData />
    </div>
  )
}

export default App
