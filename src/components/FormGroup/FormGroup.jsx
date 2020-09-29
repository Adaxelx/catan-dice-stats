import { readlink } from "fs";
import React, { useMemo } from "react";
import { Form, InputGroup, Col, Button } from "react-bootstrap";

const FormGroup = ({ invalid, setValue, ...rest }) => {
  const FormControl = useMemo(() => {
    const handleChange = (e) => {
      const value = e.target.value;
      setValue(value);
    };
    return <Form.Control required {...rest} onChange={handleChange} />;
  }, [rest, setValue]);
  return (
    <Form.Group controlId={invalid}>
      {FormControl}
      <Form.Control.Feedback type="invalid">{invalid}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormGroup;
