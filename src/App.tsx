import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ThemeProvider } from 'styled-components'
import { useState } from 'react'
import { Main } from './components/Main'
import { FormProvider } from './components/FormContext'

function App() {
  const [selectedTheme, setSelectedTheme] = useState()
  const defaultTheme = {
    primary: '#44ff00',
    background: '#000000',
    text: '#ffffff',
  }
  return (
    <FormProvider>
      <ThemeProvider theme={defaultTheme}>
        <Main />
      </ThemeProvider>
    </FormProvider>
  )
}

export default App
