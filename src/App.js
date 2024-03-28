import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App() {
  const [showModal, setShowModal] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const availableSchemas = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];
  const [newSchemaDropdownValue, setNewSchemaDropdownValue] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddNewSchema = () => {
    if (newSchemaDropdownValue) {
      const selectedSchema = availableSchemas.find(schema => schema.value === newSchemaDropdownValue);
      setSelectedSchemas(prevSelectedSchemas => [...prevSelectedSchemas, selectedSchema]); // Append new schema to the end
      setNewSchemaDropdownValue('');
    }
  };

  const handleRemoveSchema = (schemaToRemove) => {
    setSelectedSchemas(selectedSchemas.filter(schema => schema.value !== schemaToRemove.value));
  };

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label })),
    };
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <Button variant="primary" onClick={handleShowModal}>Save Segment</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header >
          <Modal.Title>Saving Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="segmentName">
              <Form.Label>Enter the Name of the Segment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of the segment"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="addSchema">
              
              {selectedSchemas.map((schema, index) => (
              <div key={schema.value} className="d-flex align-items-center mt-2">
                <Form.Control
                  as="select"
                  value={schema.value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const updatedSchemas = selectedSchemas.map((s, i) =>
                      i === index ? availableSchemas.find(s => s.value === newValue) : s
                    );
                    setSelectedSchemas(updatedSchemas);
                  }}
                >
                  {availableSchemas.map(schema => (
                    <option key={schema.value} value={schema.value}>
                      {schema.label}
                    </option>
                  ))}
                </Form.Control>
                <Button variant="danger" onClick={() => handleRemoveSchema(schema)} className="ml-2">Remove</Button>
              </div>
            ))}
            <br></br>
            
              <Form.Control
                as="select"
                value={newSchemaDropdownValue}
                onChange={(e) => setNewSchemaDropdownValue(e.target.value)}
              >
                <option value="">--Add schema to segment--</option>
                {availableSchemas.map(schema => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br></br>
            <p className="add-schema-link" onClick={handleAddNewSchema}>+ Add new schema</p>

           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleSaveSegment}>Save the Segment</Button>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
