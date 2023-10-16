import styled, { css } from "styled-components";

export const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  background: -webkit-linear-gradient(
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.1)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Container = styled.div`
  width: 90%;
  max-width: 445px;
  background-color: rgba(255, 255, 255, 0.08);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 12px;
  border-radius: 4px;
  color: inherit;
  width: 100%;
`;

type ButtonProps = {
  $icon?: boolean;
  $transparent?: boolean;
  $size?: "default" | "lg";
};

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border: none;
  border-radius: 3px;
  transition: background-color 0.3s;
  background-color: rgba(255, 255, 255, 0.15);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${({ $icon }) =>
    $icon &&
    css`
      background-color: transparent;
    `}
  ${({ $size }) =>
    $size === "lg" &&
    css`
      padding: 10px 14px;
      border-radius: 4px;
    `}
`;

export const InputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const FormItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 8px;
`;
