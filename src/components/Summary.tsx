import { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { BsArrowUpSquareFill } from 'react-icons/bs'
export const Summary = (props: any) => {
  // const [intoToppingList, setIntoToppingList] = useState<string[]>([])

  // useEffect(() => {
  //   const test = Object.keys(props.form).reduce((previousValue: string[], currentValue) => {
  //     if (props.form[currentValue][FormCategories.into][Roles.top]) {
  //       return [...previousValue, currentValue]
  //     }
  //     return [...previousValue]
  //   }, [])
  //   setIntoToppingList(test)
  // }, [props])

  return (
    <div>
      <div>
        <h2>Into!</h2>
        <h3>Topping {<BsArrowUpSquareFill />}</h3>
        <ListGroup>
          {/* {intoToppingList.map((item) => {
            return <ListGroup.Item key={`top-${item}`}>{item}</ListGroup.Item>
          })} */}
        </ListGroup>
      </div>
    </div>
  )
}
