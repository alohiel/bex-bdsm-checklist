import { useContext, useEffect, useState } from 'react'
import Papa from 'papaparse'
import { FormContext, TableFormKinds } from './FormContext'
import { TableForm } from './TableForm'
import { Nav } from 'react-bootstrap'
import { Loading } from './Loading'
import { RowLabels, kindText, setEmptyRow } from '../utils/types'
import { Summary } from './Summary'

export const TableForms = (props: {}) => {
  const { forms, setForms } = useContext(FormContext)
  const [tab, setTab] = useState('kinks')

  useEffect(() => {
    async function loadInterests() {
      const data = await fetch(process.env.PUBLIC_URL + '/rows.csv')
      const dataText = await data.text()
      let kinks: string[] = []
      let language: string[] = []
      let feelings: string[] = []

      Papa.parse<string[]>(dataText).data.forEach((data, index) => {
        if (index === 0) return
        if (data[0]) kinks.push(data[0])
        if (data[1]) language.push(data[1])
        if (data[2]) feelings.push(data[2])
      })

      const rowLabels: RowLabels = { kinks, language, feelings }
      let emptyForm = {
        [TableFormKinds.kinks]: {},
        [TableFormKinds.language]: {},
        [TableFormKinds.feelings]: {},
      }
      Object.keys(rowLabels).forEach((kind) => {
        rowLabels[kind].forEach((label: string) => {
          emptyForm[kind][label] = setEmptyRow(kind)
        })
        setForms(emptyForm)
      })
    }

    loadInterests()
  }, [setForms])

  const tabHandler = (kind) => {
    setTab(kind as TableFormKinds)
    window.scrollTo(0, 0)
  }

  if (!Object.keys(forms).length) {
    return <Loading />
  }
  return (
    <div>
      <div className="subnav print-hide" role="navigation">
        <Nav variant="pills" defaultActiveKey="kinks" className="max-width">
          {Object.keys(forms).map((kind) => {
            return (
              <Nav.Item key={kind}>
                <Nav.Link eventKey={kind} onClick={() => tabHandler(kind)}>
                  {kindText[kind]}
                </Nav.Link>
              </Nav.Item>
            )
          })}
          <Nav.Item style={{ marginLeft: 'auto' }} key="summary">
            <Nav.Link eventKey="summary" onClick={() => tabHandler('summary')}>
              Summary
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      {Object.keys(forms).map((kind) => {
        return tab === kind && <TableForm key={kind} kind={kind as TableFormKinds} />
      })}
      {tab === 'summary' && <Summary />}
    </div>
  )
}
