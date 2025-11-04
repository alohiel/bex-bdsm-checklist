import { act, ChangeEvent, MouseEventHandler, useEffect, useState } from 'react'
import Papa from 'papaparse'
import './App.css'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Summary } from './components/Summary'
import {
  BsArrowDownSquareFill,
  BsArrowUpSquareFill,
  BsBookmarkStar,
  BsChatSquare,
  BsChatSquareHeart,
} from 'react-icons/bs'
import exp from 'constants'

export enum FormCategories {
  into = 'into',
  willing = 'willing',
  maybe = 'maybe',
  no = 'no',
}

export enum Roles {
  top = 'top',
  bottom = 'bottom',
}

export enum Experience {
  new = 'new',
  favourite = 'favourite',
}

export type FormValuesType = {
  [key: string]: {
    [FormCategories.into]: ActivityProperties
    [FormCategories.willing]: ActivityProperties
    [FormCategories.maybe]: ActivityProperties
    [FormCategories.no]: ActivityProperties
    // comments?: string
  }
}

export type ActivityProperties = {
  [Roles.top]: boolean
  [Roles.bottom]: boolean
  [Experience.new]: boolean
  [Experience.favourite]: boolean
}

function App() {
  const [activityFormValues, setActivityFormValues] = useState<FormValuesType>({})
  const roles = [Roles.top, Roles.bottom]
  const experience = [Experience.new, Experience.favourite]
  const category = [
    FormCategories.into,
    FormCategories.willing,
    FormCategories.maybe,
    FormCategories.no,
  ]

  const categoryNames = {
    [category[0]]: `Yes (Into)`,
    [category[1]]: `Yes (Willing)`,
    [category[2]]: `Maybe`,
    [category[3]]: `No`,
  }

  useEffect(() => {
    async function loadInterests() {
      const data = await fetch('./YesNoMaybe.csv')
      const dataText = await data.text()
      const form: FormValuesType = {}
      const roles = {
        [Roles.top]: false,
        [Roles.bottom]: false,
        [Experience.favourite]: false,
        [Experience.new]: false,
      }
      Papa.parse<string[]>(dataText).data.map((data) => {
        form[data[0]] = {
          [FormCategories.into]: roles,
          [FormCategories.willing]: roles,
          [FormCategories.maybe]: roles,
          [FormCategories.no]: roles,
        }
      })
      setActivityFormValues(form)
    }

    loadInterests()
  }, [])

  useEffect(() => {
    console.log(activityFormValues)
  }, [activityFormValues])

  const handleChange = (activity: string, category: FormCategories, role: Roles | Experience) => {
    const currentValue = activityFormValues[activity][category][role]

    setActivityFormValues({
      ...activityFormValues,
      [activity]: {
        ...activityFormValues[activity],
        [category]: { ...activityFormValues[activity][category], [role]: !currentValue },
      },
    })
  }
  const renderIcon = (role: Roles | Experience) => {
    switch (role) {
      case Roles.top:
        return <BsArrowUpSquareFill />
      case Roles.bottom:
        return <BsArrowDownSquareFill />
      case Experience.favourite:
        return <BsChatSquareHeart />
      case Experience.new:
        return <BsChatSquare />
      default:
        break
    }
  }
  return (
    <div className="App">
      <header className="App-header">Yes/No/Maybe</header>
      <Table striped bordered className="form-table">
        <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
          <tr>
            <th>Sex and Kink</th>
            {category.map((category) => {
              return <th key={`heading-${category}`}>{categoryNames[category]}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {activityFormValues &&
            Object.keys(activityFormValues).map((interest) => {
              return (
                <tr key={`interest-${interest}`}>
                  <td>{interest}</td>
                  {category.map((category) => {
                    return (
                      <td key={`answers-${interest}-${category}`}>
                        <Container className="grid">
                          <Row className="row">
                            {roles.map((role) => {
                              const id = `${interest}|${category}|${role}`
                              const isChecked = activityFormValues[interest][category][role]

                              return (
                                <Col
                                  className="column"
                                  key={`answers-${interest}-${category}-${role}`}
                                  onClick={(event) => {
                                    event.stopPropagation()
                                    handleChange(interest, category, role)
                                  }}>
                                  <div key={id}>
                                    <input
                                      className="sr-only"
                                      name={id}
                                      checked={isChecked}
                                      type={'checkbox'}
                                      onChange={(event) => {
                                        event.stopPropagation()
                                        handleChange(interest, category, role)
                                      }}
                                    />
                                    <label
                                      htmlFor={id}
                                      className={`role-column ${isChecked && 'checked-column'}`}>
                                      <span className="icon" aria-hidden={true}>
                                        {renderIcon(role)}
                                      </span>
                                      <span className="label">{role}</span>
                                    </label>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                          {category !== FormCategories.no && (
                            <Row className="role-row">
                              {experience.map((experience) => {
                                const id = `${interest}|${category}|${experience}`

                                return (
                                  <Col
                                    key={`answers-${interest}-${category}-${experience}`}
                                    className="role-column"
                                    onClick={(event) => {
                                      event.stopPropagation()
                                      handleChange(interest, category, experience)
                                    }}>
                                    <Form.Check
                                      id={id}
                                      name={id}
                                      label={
                                        <div>
                                          {experience} {renderIcon(experience)}
                                        </div>
                                      }
                                      key={id}
                                      checked={activityFormValues[interest][category][experience]}
                                      onChange={(event) => {
                                        event.stopPropagation()
                                        handleChange(interest, category, experience)
                                      }}
                                    />
                                  </Col>
                                )
                              })}
                            </Row>
                          )}
                        </Container>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </Table>
      {Object.keys(activityFormValues).length > 0 && (
        <div style={{ minHeight: '100vh' }}>
          <h1>Summary</h1>
          <Summary form={activityFormValues} />
        </div>
      )}
    </div>
  )
}

export default App
