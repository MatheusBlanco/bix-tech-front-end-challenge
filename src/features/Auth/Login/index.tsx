"use client";
import { Input } from "@/components/ui/Input";
import { useLogin } from "./hooks/useLogin";

export const LoginForm = () => {
  const { email, setEmail, password, setPassword, handleSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit}>
      <Input
        required
        id="email-required"
        label="Required"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <Input
        required
        id="password-required"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};
