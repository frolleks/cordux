import React, { useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from "axios";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import "./Login.css";
import config from "../../../config.json"

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
  token: string | null;
  settings: any;
  ticket?: string | undefined; // MFA ticket
  sms?: boolean | undefined;
  mfa?: boolean | undefined;
};

function Login() {
  const [showModal, setShowModal] = React.useState(false);
  const [ticket, setTicket] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [captchaKey, setCaptchaKey] = React.useState("");

  const navigate = useNavigate();

  const handleCaptcha = (token: string) => {
    setCaptchaKey(token);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // User is already logged in, redirect them to the /app route
      navigate("/app");
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (showModal) {
        // Log in with the 2FA code
        const mfaLoginPayload: MFALoginSchema = {
          code,
          ticket,
        };
        const response: AxiosResponse<APILoginResponse> = await axios.post(
          "https://discord.com/api/v9/auth/mfa/totp",
          mfaLoginPayload
        );
        // Save the token and log in
        const token = response.data.token;
        // @ts-ignore
        localStorage.setItem("token", token);
        navigate('/app');
      } else {
        // Log in with the email and password
        const loginPayload: LoginSchema = {
          login: email,
          password,
          captcha_key: captchaKey,
        };
        const response: AxiosResponse<APILoginResponse> = await axios.post(
          "https://discord.com/api/v9/auth/login",
          loginPayload
        );
        if (response.data.ticket) {
          // Save the MFA ticket and show the 2FA code modal
          const mfaTicket = response.data.ticket;
          setTicket(mfaTicket);
          setShowModal(true);
        } else {
          // Save the token and log in
          const token = response.data.token;
          // @ts-ignore
          localStorage.setItem("discord_token", token);
          navigate('/app');
        }
      }
      
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {/* Modal for 2FA code input */}
        <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="code">2FA Code:</label>
            <input
              type="text"
              name="code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            <button type="submit">Log In</button>
          </form>
        </Modal>
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {captchaKey ? (
            <input type="hidden" name="captcha_key" value={captchaKey} />
          ) : (
            <HCaptcha sitekey={config.hCaptchaSiteKey} onVerify={handleCaptcha} />
          )}
          <button type="submit">Log In</button>
        </form>
      </div>
      <footer>
        <p>
          Image by <a href="https://unsplash.com/@randomlies">Ashim D'Silva</a>{" "}
          on <a href="https://unsplash.com">Unsplash</a>
        </p>
      </footer>
    </>
  );
}

export default Login;
