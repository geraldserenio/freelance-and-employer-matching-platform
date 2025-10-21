import React, { useState } from "react";
import styled from "styled-components";
import { useField } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { ErrorText } from "./ErrorText";

const LoginField = ({
  id,
  name,
  type,
  placeholder,
  disabled = false,
  width = "100%",
  allowNumbersOnly = false,
  allowLettersOnly = false,
  maxLength,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const validateInput = (inputValue) => {
    if (type === "email") return true;

    let regex;
    if (allowNumbersOnly) {
      regex = /^[0-9]*$/;
    } else if (allowLettersOnly) {
      regex = /^[a-zA-Z .-]*$/;
    } else {
      regex = /^[a-zA-Z0-9 .-]*$/;
    }
    const specialCharCount = (inputValue.match(/[.-]/g) || []).length;
    return regex.test(inputValue) && specialCharCount <= 2;
  };

  const handleChange = (e) => {
    const { value: newValue } = e.target;
    if (validateInput(newValue)) {
      field.onChange(e);
      if (onChange) onChange(e);
    } else {
      helpers.setValue(field.value);
    }
  };

  return (
    <InputWrapper width={width}>
      <InputContainer>
        <StyledInput
          {...field}
          id={id}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          onChange={handleChange}
        />
        {type === "password" && (
          <EyeIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </EyeIcon>
        )}
      </InputContainer>
      {meta.error && meta?.touched && <ErrorText>{meta.error}</ErrorText>}
    </InputWrapper>
  );
};

export default LoginField;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  border: 1px solid #99aebb;
  border-radius: 8px;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0%;
  outline: none;
  box-sizing: border-box;
  background: white; /* Updated Background */
  cursor: pointer;
  &::placeholder {
    font-size: 14px;
    color: #99aebb;
  }

  &:focus {
    border-color: black;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #777;

  &:hover {
    color: black;
  }
`;
