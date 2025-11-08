import { TableForms } from './TableForms'
import { ButtonExport } from './ButtonExport'
import { ButtonImport } from './ButtonImport'

export const Main = (props: {}) => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="maxWidth">
          <h1>Yes/No/Maybe</h1>
          <p>
            This is an interactive version of{' '}
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
          <p>
            Pick as many or as few options as you like; the summary will only show the options you
            have selected.
          </p>

          <div className="fileOptions">
            <ButtonExport />
            <ButtonImport />
          </div>
        </div>
      </header>
      <main>
        <TableForms />
      </main>
    </div>
  )
}
