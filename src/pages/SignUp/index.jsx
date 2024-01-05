import { api } from '../../services/api'
import { useState } from "react";
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Container, Form, Background } from './styles';

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleSignUp() {
    if(!name || !email || !password) {
      return alert("fill in all fields")
    }
    api.post("/users", {name, email, password})
    .then(() => {
      alert("user successfully registered")
      navigate("/");
    })
    .catch(error => {
     if(error.response) {
     alert(error.response.data.message); 
    }else {
      alert("user has not been registered")
    }
 })
}

return (
<Container>
<Background />
<Form>
  <h1>Rocket Note</h1>
  <p>application to save and manage your useful links.</p>
  <h2>Create an account</h2>
  <Input 
  placeholder="Name"
  type="text"
  icon={FiUser}
  onChange={e => setName(e.target.value)}
  />
  <Input 
  placeholder="E-mail"
  type="text"
  icon={FiMail}
  onChange={e => setEmail(e.target.value)}
  />
  <Input 
  placeholder="Password"
  type="Password"
  icon={FiLock}
  onChange={e => setPassword(e.target.value)}
  />

  <Button title="Register" onClick={handleSignUp} />
  <Link to="/">
  Return to login
  </Link>
</Form>
</Container>
);
}