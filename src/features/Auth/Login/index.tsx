"use client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LoginBox } from "./components/LoginBox";
import { LoginContainer } from "./components/LoginContainer";
import { useLogin } from "./hooks/useLogin";

export const LoginForm = () => {
  const { email, setEmail, password, setPassword, handleSubmit } = useLogin();

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <LoginBox>
          <Logo
            src="https://bixtecnologia.com.br/wp-content/uploads/2024/07/bix-tecnologia-png-200x54.webp"
            alt="Bix Tecnologia"
          />
          <h1>Welcome back</h1>
          <Input
            required
            id="email-required"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            required
            id="password-required"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          <Button type="submit">Login</Button>
        </LoginBox>
      </form>
    </LoginContainer>
  );
};
