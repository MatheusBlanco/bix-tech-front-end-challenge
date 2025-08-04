"use client";
import { Form } from "@/components/Form";
import { useLogin } from "./hooks/useLogin";

export const LoginForm = () => {
  const { email, setEmail, password, setPassword, handleSubmit } = useLogin();

  return (
    <>
      <div>
        <Form.Input
          required
          id="email-required"
          label="Required"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <Form.Input
          required
          id="password-required"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
    </>
  );
};
