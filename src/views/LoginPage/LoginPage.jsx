import React, { useState, useContext } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { FormGroup } from "components";
import { loginUser } from "functions";
import { UserContext } from "context";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const user = useContext(UserContext);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const response = await loginUser(login, password);
        user.changeToken(response.token);
        history.push("/");
      } catch (err) {
        setError(err.message);
      }
    }

    setValidated(true);
  };

  return (
    <Container>
      <Card>
        <Card.Header>Login page</Card.Header>
        <Card.Body
          as={Form}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <FormGroup
            value={login}
            required
            setValue={setLogin}
            placeholder={"Login"}
            invalid="This field is required."
          />
          <FormGroup
            value={password}
            setValue={setPassword}
            placeholder={"Password"}
            required
            invalid="This field is required."
          />
          <Button type="submit">Send</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
