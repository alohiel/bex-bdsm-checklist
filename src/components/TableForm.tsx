import { useContext, useState } from 'react'
import { Table, Container, Row, Col, Button, OverlayTrigger, Tooltip, Form } from 'react-bootstrap'
import {
  FaHeart,
  FaLeaf,
  FaArrowUp,
  FaArrowDown,
  FaVolumeUp,
  FaAssistiveListeningSystems,
  FaHandHoldingHeart,
  FaCheck,
} from 'react-icons/fa'
import { FaHeartPulse } from 'react-icons/fa6'
import { TableFormKinds, FormContext } from './FormContext'
import { Loading } from './Loading'
import {
  Roles,
  categoryText,
  RoleProperties,
  FormCategories,
  experienceText,
  Experiences,
  setEmptyRow,
} from '../utils/types'

export const TableForm = (props: { kind: TableFormKinds }) => {
  const { forms, setForms } = useContext(FormContext)
  const [newRow, setNewRow] = useState('')
  const tableFormValues = forms[props.kind]
  const categories =
    props.kind !== TableFormKinds.feelings
      ? [FormCategories.into, FormCategories.willing, FormCategories.maybe, FormCategories.no]
      : [FormCategories.often, FormCategories.sometimes, FormCategories.never]

  const handleAddRow = () => {
    if (newRow.length) {
      const newRowObject = { [newRow]: setEmptyRow(props.kind) }
      const newKind = { ...forms[props.kind], ...newRowObject }
      setForms({ ...forms, [props.kind]: newKind })
      setNewRow('')
    }
  }

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
    <Table striped bordered size="sm" className="form-table max-width" hover>
      <thead>
        <tr>
          <th style={{ width: '120px', textTransform: 'capitalize' }}>{props.kind}</th>
          {categories.map((category) => {
            return (
              <th key={`heading-${category}`}>
                <Category kind={props.kind} category={category} />
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {tableFormValues &&
          Object.keys(tableFormValues).map((row) => {
            return (
              <tr key={`interest-${row}`}>
                <td>{row}</td>
                {categories.map((column) => {
                  return (
                    <td key={`answers-${row}-${column}`}>
                      <Container className="grid">
                        <Row className="row">
                          {[Roles.giving, Roles.receiving].map((role) => {
                            return (
                              <FieldOptions
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
      <tfoot>
        <tr>
          <td colSpan={props.kind !== TableFormKinds.feelings ? 5 : 4}>
            <div className="add-row">
              <Form.Group>
                <Form.Control
                  aria-label="Row name"
                  type="text"
                  placeholder="Row Name"
                  value={newRow}
                  onChange={(event) => {
                    setNewRow(event.target.value)
                  }}
                />
              </Form.Group>
              <Button onClick={() => handleAddRow()}>Add Row</Button>
            </div>
          </td>
        </tr>
      </tfoot>
    </Table>
  )
}

const Category = (props: { kind: TableFormKinds; category: string }) => {
  const categoryInfo = categoryText[props.category]
  const renderOverlay = (props) => {
    return <Tooltip {...props}>{categoryInfo.tooltip}</Tooltip>
  }

  return (
    <OverlayTrigger placement="bottom" overlay={renderOverlay}>
      <Button className="category-header">{categoryInfo.label}</Button>
    </OverlayTrigger>
  )
}

const FieldOptions = (props: {
  id: string
  label: string
  kind: TableFormKinds
  field: RoleProperties
  isNeverColumn: boolean
  onChange: (field: 'selected' | 'new' | 'favourite') => void
}) => {
  const isChecked = props.field.selected
  const isNew = props.field.new
  const isFavourite = props.field.favourite

  const { name, icon } = getFieldLabelAndIcon(props.kind, props.label)
  return (
    <Col className="column">
      <div className={`field-group ${props.isNeverColumn && 'never'}`}>
        <Button
          id={props.id}
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

          {isChecked && <CheckedIndicator />}
        </Button>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>{experienceText[Experiences.favourite].text}</Tooltip>}>
          <Button
            className="favourite"
            aria-label={experienceText[Experiences.favourite].label}
            aria-checked={isFavourite}
            variant={isFavourite ? 'danger' : 'secondary'}
            onClick={(event) => props.onChange('favourite')}>
            <FaHeart />
            {isFavourite && <CheckedIndicator />}
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>{experienceText[Experiences.new].text}</Tooltip>}>
          <Button
            className="new"
            aria-label={experienceText[Experiences.new].label}
            aria-checked={isNew}
            variant={isNew ? 'success' : 'secondary'}
            onClick={(event) => props.onChange('new')}>
            {isNew && <CheckedIndicator />}
            <FaLeaf />
          </Button>
        </OverlayTrigger>
      </div>
    </Col>
  )
}

const CheckedIndicator = () => {
  return (
    <div className="checked-indicator">
      <FaCheck />
    </div>
  )
}

const getFieldLabelAndIcon = (kind: TableFormKinds, role: string) => {
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
        return { name: 'Inspiring', icon: <FaHandHoldingHeart /> }
      case Roles.receiving:
        return { name: 'Feeling', icon: <FaHeartPulse /> }
      default:
        break
    }
  }
}
