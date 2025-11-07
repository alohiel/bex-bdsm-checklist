import { useContext, useState } from 'react'
import { Button, Form, Modal, ModalBody } from 'react-bootstrap'
import { FormContext } from './FormContext'

export const ButtonImport = () => {
  const { setForms } = useContext(FormContext)
  const [modalOpen, setModalOpen] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0]
      if (uploadedFile.type !== 'application/json') return

      const reader = new FileReader()
      reader.readAsText(uploadedFile, 'UTF-8')
      reader.onload = (reader) => {
        const string = JSON.parse(reader.target.result as string)
        setForms(string)
        setModalOpen(false)
      }
    }
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Import Selection</Button>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload File (.json)</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  )
}
