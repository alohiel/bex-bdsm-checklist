import { useContext } from 'react'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import {
  FaHeart,
  FaLeaf,
  FaArrowUp,
  FaArrowDown,
  FaVolumeUp,
  FaAssistiveListeningSystems,
  FaHandHoldingHeart,
  FaHands,
} from 'react-icons/fa'
import { TableFormKinds, FormContext } from './FormContext'
import { feelingCategories, generalCategories, RoleProperties, Roles } from './TableForms'
import { Loading } from './Loading'

export const TableForm = (props: { kind: TableFormKinds }) => {
  const { forms, setForms } = useContext(FormContext)
  const tableFormValues = forms[props.kind]
  const categories = props.kind !== TableFormKinds.feelings ? generalCategories : feelingCategories

  const handleChange = (
    activity: string,
    category: string,
    role: string,
    field: 'selected' | 'favourite' | 'new'
  ) => {
    const currentValue = tableFormValues[activity][category][role][field]

    const updatedForm = {
      ...tableFormValues,
      [activity]: {
        ...tableFormValues[activity],
        [category]: {
          ...tableFormValues[activity][category],
          [role]: {
            ...tableFormValues[activity][category][role],
            [field]: !currentValue,
          },
        },
      },
    }
    setForms({ ...forms, [props.kind]: updatedForm })
  }

  if (!Object.keys(tableFormValues).length) {
    return <Loading />
  }

  return (
    <Table striped bordered size="sm" className="form-table">
      <thead className="table-head">
        <tr>
          <th style={{ width: ' 150px' }}>{props.kind}</th>
          {Object.keys(categories).map((category) => {
            return <th key={`heading-${category}`}>{categories[category]}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {tableFormValues &&
          Object.keys(tableFormValues).map((row) => {
            return (
              <tr key={`interest-${row}`}>
                <td>{row}</td>
                {Object.keys(categories).map((column) => {
                  return (
                    <td key={`answers-${row}-${column}`}>
                      <Container className="grid">
                        <Row className="row">
                          {[Roles.giving, Roles.receiving].map((role) => {
                            return (
                              <OptionInput
                                label={role}
                                id={`${row}|${column}|${role}`}
                                kind={props.kind}
                                key={`${row}|${column}|${role}`}
                                isNeverColumn={column === 'no' || column === 'never'}
                                field={tableFormValues[row][column][role]}
                                onChange={(field) => handleChange(row, column, role, field)}
                              />
                            )
                          })}
                        </Row>
                      </Container>
                    </td>
                  )
                })}
              </tr>
            )
          })}
      </tbody>
    </Table>
  )
}

const OptionInput = (props: {
  id: string
  label: string
  kind: TableFormKinds
  field: RoleProperties
  isNeverColumn: boolean
  onChange: (field: 'selected' | 'new' | 'favourite') => void
}) => {
  const id = props.id
  const isChecked = props.field.selected
  const isNew = props.field.new
  const isFavourite = props.field.favourite

  const { name, icon } = getLabelAndIcon(props.kind, props.label)
  return (
    <Col className="column">
      <div className={`field-group ${props.isNeverColumn && 'never'}`}>
        <Button
          className="field"
          variant={isChecked ? 'primary' : 'secondary'}
          aria-selected={isChecked}
          onClick={(event) => {
            event.stopPropagation()
            props.onChange('selected')
          }}>
          <span className="label">{name}</span>
          <span className="icon" aria-hidden={true}>
            {icon}
          </span>
        </Button>

        <Button
          className="favourite"
          aria-label={`Favourite`}
          aria-checked={isFavourite}
          variant={isFavourite ? 'danger' : 'secondary'}
          onClick={(event) => props.onChange('favourite')}>
          <FaHeart />
        </Button>

        <Button
          className="new"
          aria-label={`Never Tried`}
          aria-checked={isNew}
          variant={isNew ? 'success' : 'secondary'}
          onClick={(event) => props.onChange('new')}>
          <FaLeaf />
        </Button>
      </div>
    </Col>
  )
}

const getLabelAndIcon = (kind: TableFormKinds, role: string) => {
  if (kind === TableFormKinds.kinks) {
    switch (role) {
      case Roles.giving:
        return { name: 'Top', icon: <FaArrowUp /> }
      case Roles.receiving:
        return { name: 'Bottom', icon: <FaArrowDown /> }
      default:
        break
    }
  }
  if (kind === TableFormKinds.language) {
    switch (role) {
      case Roles.giving:
        return { name: 'Speaker', icon: <FaVolumeUp /> }
      case Roles.receiving:
        return { name: 'Listener', icon: <FaAssistiveListeningSystems /> }
      default:
        break
    }
  }
  if (kind === TableFormKinds.feelings) {
    switch (role) {
      case Roles.giving:
        return { name: 'Giving', icon: <FaHandHoldingHeart /> }
      case Roles.receiving:
        return { name: 'Receiving', icon: <FaHands /> }
      default:
        break
    }
  }
}
