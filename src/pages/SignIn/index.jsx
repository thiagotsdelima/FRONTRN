import { useState } from "react";
import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Container, Form, Background } from './styles';
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  function handleSignIn(){ signIn({ email, password}) }

return (
<Container>
<Form>
  <h1>Rocket Note</h1>
  <p>application to save and manage your useful links.</p>
  <h2>login</h2>
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

  <Button title="let's go" onClick={handleSignIn} />
  <Link to="/register">
  Create an account
  </Link>
</Form>

<Background />
</Container>
);
}