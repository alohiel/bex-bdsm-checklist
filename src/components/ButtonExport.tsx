import { useContext } from 'react'
import { FormContext } from './FormContext'
import { Button } from 'react-bootstrap'

export const ButtonExport = () => {
  const { forms } = useContext(FormContext)
  const downloadJSON = () => {
    const jsonData = new Blob([JSON.stringify(forms)], { type: 'application/json' })
    const jsonURL = URL.createObjectURL(jsonData)
    const link = document.createElement('a')
    link.href = jsonURL
    link.download = `YesNoMaybe.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return <Button onClick={downloadJSON}>Export Selection</Button>
}
