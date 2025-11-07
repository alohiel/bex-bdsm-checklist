import { Spinner } from 'react-bootstrap'

export const Loading = () => {
  return (
    <Spinner animation="border" role="status" style={{ margin: '30px auto', color: 'white' }}>
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}
