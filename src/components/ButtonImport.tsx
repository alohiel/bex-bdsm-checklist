import { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FormContext, TableFormKinds } from './FormContext'
import { json } from 'stream/consumers'

export const ButtonImport = () => {
  const { forms, setForms } = useContext(FormContext)
  const [modalOpen, setModalOpen] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0]
      if (uploadedFile.type !== 'application/json') return

      const reader = new FileReader()
      reader.readAsText(uploadedFile, 'UTF-8')
      reader.onload = (reader) => {
        const jsonInput = JSON.parse(reader.target.result as string)
        if (jsonInput.kinks && jsonInput.language && jsonInput.feelings) {
          setForms({
            ...forms,
            [TableFormKinds.kinks]: {
              ...forms[TableFormKinds.kinks],
              ...jsonInput[TableFormKinds.kinks],
            },
            [TableFormKinds.language]: {
              ...forms[TableFormKinds.language],
              ...jsonInput[TableFormKinds.language],
            },
            [TableFormKinds.feelings]: {
              ...forms[TableFormKinds.feelings],
              ...jsonInput[TableFormKinds.feelings],
            },
          })
          setModalOpen(false)
        }
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
