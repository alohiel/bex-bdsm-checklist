import './theme/bootstrap.min.css'
import './App.css'

import { Main } from './components/Main'
import { FormProvider } from './components/FormContext'

function App() {
  return (
    <FormProvider>
      <Main />
    </FormProvider>
  )
}

export default App
