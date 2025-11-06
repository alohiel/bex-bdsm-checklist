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
      <header className="App-header">
        <h1>Yes/No/Maybe</h1>
        <p>
          Interactive version of{' '}
          <a href="https://www.bextalkssex.com/" target="_blank">
            Bex Caputo
          </a>
          's Yes/No/Maybe{' '}
          <a
            href="https://www.bextalkssex.com/wp-content/uploads/2016/10/BexCaputoYesNoMaybe.pdf"
            target="_blank">
            worksheet
          </a>
          .
        </p>
      </header>
      <main>
        <section></section>

        <TableForms />
      </main>
    </div>
  )
}
