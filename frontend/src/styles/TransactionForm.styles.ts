import styled from 'styled-components';

export const FormWrapper = styled.form`
      display: flex;
flex-wrap: wrap;
    flex-direction: column;
    gap: 1rem;
      margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Input = styled.input`
    display: flex;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 10px;
`
export const Select = styled.select`
    display: flex;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 10px;
`;

export const Label = styled.label`
    display: flex;
    font-weight: bold;
    font-size: 16px;
    padding: 0.5rem;
`;

export const Error = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;
