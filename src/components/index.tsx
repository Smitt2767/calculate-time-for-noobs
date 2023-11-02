import styled, { css } from "styled-components";

const MOBILE = "550px";

export const AppWrapper = styled.div`
  min-height: 100vh;

  @media (min-width: ${MOBILE}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  color: #ffffff8d;
  flex-grow: 1;
`;

export const Container = styled.div`
  width: 90%;
  max-width: fit-content;
  background-color: rgba(255, 255, 255, 0.08);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${MOBILE}) {
    width: 100%;
    border-radius: 0;
    min-height: 100vh;
    padding: 12px;
    max-width: unset;
    gap: 12px;
  }
`;

export const Input = styled.input`
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 12px;
  border-radius: 4px;
  color: inherit;
  flex-grow: 1;
  min-width: 150px;
`;

type ButtonProps = {
  $icon?: boolean;
  $transparent?: boolean;
  $size?: "default" | "lg";
  $hidden?: boolean;
  $fullWidth?: boolean;
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
  ${({ $hidden }) =>
    $hidden &&
    css`
      pointer-events: none;
      visibility: hidden;
    `}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

export const InputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
  flex-shrink: 0;

  @media (max-width: ${MOBILE}) {
    align-self: stretch;
  }
`;

export const FormItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: ${MOBILE}) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 16px;
  }
`;

export const FormItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-grow: 1;

  @media (max-width: ${MOBILE}) {
    gap: 8px;
    flex-direction: column;
    align-items: start;
  }
`;

export const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 8px;
  gap: 16px;
  flex-grow: 1;

  @media (max-width: ${MOBILE}) {
    padding: 0;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 8px;
  flex-shrink: 0;
`;

export const GithubLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
  cursor: pointer;
  & svg {
    fill: #ffffff80;
    transition: all 0.3s;
  }
  &:hover svg {
    fill: #ffffffde;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media (max-width: ${MOBILE}) {
    padding: 0px 16px 16px;
  }
`;
