import { useContext, useEffect, useState } from 'react'
import Papa from 'papaparse'
import { FormContext, TableFormKinds } from './FormContext'
import { TableForm } from './TableForm'
import { Nav, Tab, TabContainer, TabContent, Tabs } from 'react-bootstrap'
import { Loading } from './Loading'

export enum FormCategories {
  into = 'into',
  willing = 'willing',
  maybe = 'maybe',
  no = 'no',
  often = 'often',
  sometimes = 'sometimes',
  never = 'never',
}
export enum Roles {
  giving = 'giving',
  receiving = 'receiving',
}

export enum Experiences {
  new = 'new',
  favourite = 'favourite',
}
export const generalCategories = {
  [FormCategories.into]: 'Yes (Into)',
  [FormCategories.willing]: 'Yes (Willing)',
  [FormCategories.maybe]: 'Maybe',
  [FormCategories.no]: 'No',
}

export const feelingCategories = {
  [FormCategories.often]: 'Often',
  [FormCategories.sometimes]: 'Sometimes',
  [FormCategories.never]: 'Never',
}

export type GeneralFormValuesType = {
  [key: string]: {
    [FormCategories.into]: ActivityProperties
    [FormCategories.willing]: ActivityProperties
    [FormCategories.maybe]: ActivityProperties
    [FormCategories.no]: LimitedActivityProperties
  }
}

export type FeelingsFormValuesType = {
  [key: string]: {
    [FormCategories.often]: ActivityProperties
    [FormCategories.sometimes]: ActivityProperties
    [FormCategories.never]: LimitedActivityProperties
  }
}

export type RoleProperties = {
  selected: boolean
  [Experiences.new]: boolean
  [Experiences.favourite]: boolean
}

type ActivityProperties = {
  [Roles.giving]: RoleProperties
  [Roles.receiving]: RoleProperties
}

type LimitedActivityProperties = {
  [Roles.giving]: { selected: boolean }
  [Roles.receiving]: { selected: boolean }
}

type RowLabels = {
  kinks: string[]
  language: string[]
  feelings: string[]
}

const emptyRolesExperiences = {
  [Roles.giving]: {
    selected: false,
    new: false,
    favourite: false,
  },
  [Roles.receiving]: {
    selected: false,
    new: false,
    favourite: false,
  },
}

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

      Papa.parse<string[]>(dataText).data.map((data, index) => {
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
          emptyForm[kind][label] =
            kind !== TableFormKinds.feelings
              ? {
                  [FormCategories.into]: emptyRolesExperiences,
                  [FormCategories.willing]: emptyRolesExperiences,
                  [FormCategories.maybe]: emptyRolesExperiences,
                  [FormCategories.no]: {
                    [Roles.giving]: { selected: false },
                    [Roles.receiving]: { selected: false },
                  },
                }
              : {
                  [FormCategories.often]: emptyRolesExperiences,
                  [FormCategories.sometimes]: emptyRolesExperiences,
                  [FormCategories.never]: {
                    [Roles.giving]: { selected: false },
                    [Roles.receiving]: { selected: false },
                  },
                }
        })
        setForms(emptyForm)
      })
    }

    loadInterests()
  }, [])

  if (!Object.keys(forms).length) {
    return <Loading />
  }
  return (
    <div>
      <Nav variant="pills" defaultActiveKey="kinks" className="subnav">
        <Nav.Item>
          <Nav.Link eventKey="kinks" onClick={() => setTab('kinks')}>
            Kinks
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="language" onClick={() => setTab('language')}>
            Language
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="feelings" onClick={() => setTab('feelings')}>
            Feelings
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginLeft: 'auto' }}>
          {' '}
          <Nav.Link eventKey="summary" onClick={() => setTab('summary')}>
            Summary
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {tab === 'kinks' && <TableForm kind={TableFormKinds.kinks} />}
      {tab === 'language' && <TableForm kind={TableFormKinds.language} />}
      {tab === 'feelings' && <TableForm kind={TableFormKinds.feelings} />}
    </div>
  )
}
