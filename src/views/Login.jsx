import { useEffect } from "react";
import keycloak from "../keycloak"
import { Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (keycloak.authenticated) {
      setUsername(keycloak.tokenParsed.preferred_username);
      navigate('/profile');
    }
  }, [username]);

  const handleLogin = async () => {
    keycloak.login({ 
      redirectUri: 'https://my-fit-one.vercel.app/profile'
    });
  };

  const handleRegister = () => {
    keycloak.register();
  };

  const handleToken = () => {
    console.log(keycloak.tokenParsed);
    console.log(keycloak.token);
  };

  return (
    <div className="login-btn-grp">
      <h1>Welcome!</h1>
      <button onClick={handleLogin} className="login-btn">Login</button>
      <button onClick={handleRegister} className="login-btn">Register</button>
      <button onClick={handleToken} className="login-btn">Test</button>
    </div>
  );
};

export default Login;
