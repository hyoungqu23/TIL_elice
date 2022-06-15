import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const InputStatus = {
  NORMAL: 'normal',
  ERROR: 'error',
  SUCCESS: 'success',
};

function RegisterForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [nameError, setNameError] = useState(null);
  const [ageError, setAgeError] = useState(null);

  const [nameInputStatus, setNameInputStatus] = useState(InputStatus.NORMAL);
  const [ageInputStatus, setAgeInputStatus] = useState(InputStatus.NORMAL);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const validateName = (name) => {
    if (name.length < 1 || name.length > 10) {
      setNameError('이름은 1글자 이상, 10글자 이하여야 합니다.');
      setNameInputStatus(InputStatus.ERROR);
      return;
    }

    setNameInputStatus(InputStatus.SUCCESS);
  };

  const validateAge = (age) => {
    const numberedAge = Number(age);
    if (numberedAge < 1 || numberedAge > 100) {
      setAgeError('나이는 1부터 100 사이여야 합니다.');
      setAgeInputStatus(InputStatus.ERROR);
      return;
    }

    setAgeInputStatus(InputStatus.SUCCESS);
  };

  const validateForm = (form) => {
    validateName(form.name);
    validateAge(form.age);
  };

  const handleSubmit = () => {
    const formData = { name, age };
    validateForm(formData);
  };

  const handleReset = () => {
    setName('');
    setAge('');
  };

  const getInputStatusStyle = (status) => {
    if (status === InputStatus.ERROR) {
      return 'input-invalid';
    } else if (status === InputStatus.SUCCESS) {
      return 'input-valid';
    }
    return '';
  };

  return (
    <FormContainer>
      <FormFieldset>
        <FormLabel error={nameInputStatus === InputStatus.ERROR} htmlFor="name">
          이름
        </FormLabel>
        <FormInput
          value={name}
          id="name"
          onChange={handleNameChange}
          type="text"
          name="name"
          status={nameInputStatus}
          placeholder="이름을 입력해 주세요."
        />

        <FormError>
          {nameInputStatus === InputStatus.ERROR && nameError}
        </FormError>
      </FormFieldset>

      <FormFieldset>
        <FormLabel error={nameInputStatus === InputStatus.ERROR} htmlFor="age">
          나이
        </FormLabel>
        <FormInput
          id="age"
          value={age}
          onChange={handleAgeChange}
          type="number"
          name="age"
          status={ageInputStatus}
          placeholder="나이를 입력해 주세요."
        />

        <FormError>
          {ageInputStatus === InputStatus.ERROR && ageError}
        </FormError>
      </FormFieldset>

      <ButtonContainer>
        <ResetButton onClick={handleReset} type="button">
          초기화
        </ResetButton>

        <SubmitButton onClick={handleSubmit} type="button">
          제출
        </SubmitButton>
      </ButtonContainer>

      <Debug>
        <code>{JSON.stringify({ name, age }, null, 2)}</code>
      </Debug>
    </FormContainer>
  );
}

export default RegisterForm;

// styled-components를 이용해 스타일을 적용하는 코드를 작성하세요.
const TextError = css`
  color: #ff6b6b;
`;

const InputInvalid = css`
  border: 2px solid #ff6b6b;
`;

const InputValid = css`
  border: 2px solid #51cf66;
`;

const FormError = styled.div`
  font-size: 0.8rem;
  min-height: 20px;
  margin-top: 4px;
  color: #ff6b6b;
`;

const FormContainer = styled.form`
  min-width: 300px;
`;

const FormFieldset = styled.fieldset`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  border: none;
  padding: 12px 0;
  &:not(:first-of-type) {
    border-bottom: none;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }
`;

const FormLabel = styled.label`
  display: block;
  padding-bottom: 8px;

  font-size: 0.8rem;
  color: gray;

  ${(props) => props.error && TextError}
`;

const FormInput = styled.input`
  display: block;
  padding: 4px;
  border: 2px solid #dee2e6;
  border-radius: 3px;

  ${({ status }) => status === InputStatus.ERROR && InputInvalid}
  ${({ status }) => status === InputStatus.SUCCESS && InputValid}
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const FormButton = styled.button`
  flex: 1;
  border: none;
  padding: 4px;
  color: white;
  font-weight: 700;

  border-radius: 3px;
  cursor: pointer;

  &:not(:first-of-type) {
    margin-left: 8px;
  }
`;

const ResetButton = styled(FormButton)`
  background: #adb5bd;
`;
const SubmitButton = styled(FormButton)`
  background: #37b24d;
`;

const Debug = styled.pre`
  font-size: 0.75rem;
`;
