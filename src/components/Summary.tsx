import './Summary.css'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { FormContext } from './FormContext'
import {
  ActivityProperties,
  categoryText,
  FormCategories,
  kindText,
  RoleProperties,
  Roles,
  roleText,
} from '../utils/types'
import { FaHeart, FaLeaf } from 'react-icons/fa'

type CategoryLists = {
  [Roles.giving]?: { [key: string]: RoleProperties }
  [Roles.receiving]?: { [key: string]: RoleProperties }
}
type ListsByCategory = {
  kinks?: {
    [FormCategories.into]?: CategoryLists
    [FormCategories.willing]?: CategoryLists
    [FormCategories.maybe]?: CategoryLists
    [FormCategories.into]?: CategoryLists
  }
  language?: {
    [FormCategories.into]?: CategoryLists
    [FormCategories.willing]?: CategoryLists
    [FormCategories.maybe]?: CategoryLists
    [FormCategories.into]?: CategoryLists
  }
  feelings?: {
    [FormCategories.often]?: CategoryLists
    [FormCategories.sometimes]?: CategoryLists
    [FormCategories.never]?: CategoryLists
  }
}
export const Summary = (props: any) => {
  const { forms } = useContext(FormContext)
  const [listsByCategory, setListsByCategory] = useState<ListsByCategory>({})

  useEffect(() => {
    const resortedObject = Object.keys(forms).reduce((kinds, kind) => {
      const kindsWithCategories = Object.keys(Object.values(forms[kind])[0]).reduce(
        (accum: Object, category: string) => {
          return { ...accum, [category]: {} }
        },
        {}
      )

      Object.keys(forms[kind]).forEach((activity) => {
        Object.keys(forms[kind][activity]).forEach((category) => {
          Object.keys(forms[kind][activity][category]).forEach((role) => {
            kindsWithCategories[category] = {
              ...kindsWithCategories[category],
              [role]: {
                ...kindsWithCategories[category][role],
                [activity]: forms[kind][activity][category][role],
              },
            }
          })
        })
      })

      return {
        ...kinds,
        [kind]: kindsWithCategories,
      }
    }, {})

    const filterEmptyActivities = (unfilteredActivities) => {
      return Object.keys(unfilteredActivities).reduce((accumActivities, activity) => {
        if (unfilteredActivities[activity].selected)
          return { ...accumActivities, [activity]: unfilteredActivities[activity] }
        return accumActivities
      }, {})
    }

    const filterEmptyRoles = (unfilteredRoles) => {
      return Object.keys(unfilteredRoles).reduce((accumRoles, role) => {
        if (
          Object.values(unfilteredRoles[role]).some((currentActivity: RoleProperties) => {
            return currentActivity.selected
          })
        )
          return { ...accumRoles, [role]: filterEmptyActivities(unfilteredRoles[role]) }

        return accumRoles
      }, {})
    }

    const filterEmptyCategories = (unfilteredCategories) => {
      return Object.keys(unfilteredCategories).reduce((accumCategories, category) => {
        if (
          Object.keys(unfilteredCategories[category]).some((currentActivity) => {
            return Object.values(unfilteredCategories[category][currentActivity]).some(
              (currentRoles: RoleProperties) => {
                return currentRoles.selected
              }
            )
          })
        ) {
          return {
            ...accumCategories,
            [category]: filterEmptyRoles(unfilteredCategories[category]),
          }
        }
        return accumCategories
      }, {})
    }

    const filterEmptyKinds = Object.keys(resortedObject).reduce((accumKind, kind) => {
      if (
        Object.keys(resortedObject[kind]).some((category) => {
          return Object.keys(resortedObject[kind][category]).some((currentActivity) => {
            return Object.values(resortedObject[kind][category][currentActivity]).some(
              (currentRoles: RoleProperties) => {
                return currentRoles.selected || currentRoles.selected
              }
            )
          })
        })
      ) {
        return { ...accumKind, [kind]: filterEmptyCategories(resortedObject[kind]) }
      }
      return accumKind
    }, {})

    setListsByCategory(filterEmptyKinds)
  }, [forms])

  return (
    <div className="summary">
      {Object.keys(listsByCategory).map((kind) => {
        return (
          <div key={kind}>
            <h2>{kindText[kind]}</h2>
            <Row>
              {Object.keys(listsByCategory[kind]).map((category) => {
                return (
                  <Col key={category}>
                    <h3>{categoryText[category].label}</h3>
                    <Row>
                      {Object.keys(listsByCategory[kind][category]).map((role) => {
                        return (
                          <Col key={role}>
                            <h4>{roleText[kind][role].label}</h4>
                            <ListGroup variant="">
                              {Object.keys(listsByCategory[kind][category][role]).map(
                                (activity) => {
                                  return (
                                    <ListGroup.Item key={`${role}-${activity}`}>
                                      {activity}
                                      {listsByCategory[kind][category][role][activity]
                                        .favourite && (
                                        <span className="favourite">
                                          <FaHeart />
                                          <div className="sr-only">Favourite</div>
                                        </span>
                                      )}
                                      {listsByCategory[kind][category][role][activity].new && (
                                        <span className="new">
                                          <FaLeaf />
                                          <div className="sr-only">New</div>
                                        </span>
                                      )}
                                    </ListGroup.Item>
                                  )
                                }
                              )}
                            </ListGroup>
                          </Col>
                        )
                      })}
                    </Row>
                  </Col>
                )
              })}
            </Row>
          </div>
        )
      })}
    </div>
  )
}
