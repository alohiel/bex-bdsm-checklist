import { Button } from 'react-bootstrap'
import { useTheme } from 'styled-components'
import { TableForms } from './TableForms'
import ButtonExport from './ButtonExport'
import { ButtonImport } from './ButtonImport'
export const Main = (props: {}) => {
  const theme = useTheme()

  return (
    <div className="App">
      <ButtonImport />
      <ButtonExport />
      <header className="App-header">Yes/No/Maybe</header>
      <TableForms />
      <div style={{ minHeight: '100vh' }}>
        <h1>Summary</h1>
        {/* <Summary form={activityFormValues} /> */}
      </div>
    </div>
  )
}
