import React from "react";
import Modal from 'react-modal';
import axios, { AxiosResponse } from "axios";
import "./Login.css"

interface LoginSchema {
  login: string;
  password: string;
  undelete?: boolean;
  captcha_key?: string;
  login_source?: string;
  gift_code_sku_id?: string;
}

interface MFALoginSchema {
  code: string;
  ticket: string;
}

type APILoginResponse = {
  token: string | null,
  settings: any,
  ticket?: string | undefined, // MFA ticket
  sms?: boolean | undefined,
  mfa?: boolean | undefined,
}

function Login() {
  const [login, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response: AxiosResponse<APILoginResponse> = await axios.post(
        "https://discord.com/api/v9/auth/login",
        {
          login,
          password,
        }
      );
      if (response.data.mfa) {
        // Display the 2FA code input field
        setShowModal(true);
      } else {
        const token = response.data.token;
        localStorage.setItem('user_token', token);
        // Your success code here
      }
    } catch (error) {
      console.error(`You've encountered an error: ${error}`)
    }
  };

  const handleCloseModal = () => {
    // Close the 2FA code modal
    setShowModal(false);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        value={login}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button type="submit">Login</button>
    </form>
    <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
      <input
        type="text"
        id="code"
        placeholder="Enter your two-factor authentication code/backup code"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
    </Modal>
    <footer>
      <p>Image by <a href="https://unsplash.com/@randomlies">Ashim D'Silva</a> on <a href="https://unsplash.com">Unsplash</a></p>
    </footer>
    </>
  );
};

export default Login;