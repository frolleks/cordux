import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Space,
  Modal,
  Box,
} from "@mantine/core";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

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

const API_URI = "https://discord.com/api/v9";

function Login() {
  const [opened, setOpened] = useState(false);
  const [ticket, setTicket] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [captchaKey, setCaptchaKey] = useState("");

  const handleCaptcha = (token: string) => {
    setCaptchaKey(token);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (opened) {
        // Log in with the 2FA code
        const mfaLoginPayload: MFALoginSchema = {
          code,
          ticket,
        };
        const response: AxiosResponse<APILoginResponse> = await axios.post(
          `${API_URI}/auth/mfa/totp`,
          mfaLoginPayload
        );
        // Save the token and log in
        const token = response.data.token;
        // @ts-ignore
        localStorage.setItem("token", token);
      } else {
        // Log in with the email and password
        const loginPayload: LoginSchema = {
          login: email,
          password,
          captcha_key: captchaKey,
        };
        const response: AxiosResponse<APILoginResponse> = await axios.post(
          `${API_URI}/auth/login`,
          loginPayload
        );
        if (response.data.ticket) {
          // Save the MFA ticket and show the 2FA code modal
          const mfaTicket = response.data.ticket;
          setTicket(mfaTicket);
          setOpened(true);
        } else {
          // Save the token and log in
          const token = response.data.token;
          // @ts-ignore
          localStorage.setItem("discord_token", token);
        }
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Two-factor Authentication"
        centered={true}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            name="code"
            label="Enter a Discord 2FA code/backup code"
            placeholder="6-digit code/8-digit backup code"
            value={code}
            withAsterisk
            onChange={(event) => setCode(event.target.value)}
          />
          <Space h="md" />
          <Button type="submit" variant="outline">
            Submit
          </Button>
        </form>
      </Modal>
      <form onSubmit={handleSubmit}>
        <div style={{ maxWidth: 320, margin: "auto" }}>
          <Box
            sx={{
              backgroundColor: "#292a2f",
              padding: "32px"
            }}
          >
            <TextInput
              withAsterisk
              mt="md"
              label="Email"
              placeholder="email@example.com"
              {...form.getInputProps("email")}
              onChange={(event) => setEmail(event.target.value)}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              withAsterisk
              onChange={(event) => setPassword(event.target.value)}
            />
            <Space h="md" />
            <HCaptcha
              sitekey="f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34"
              onVerify={handleCaptcha}
            />
            <Button variant="outline" type="submit" mt="xs">
              Log in
            </Button>
          </Box>
        </div>
      </form>
    </>
  );
}

export default Login;
