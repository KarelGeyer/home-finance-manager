import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";

import {
  Form,
  FormInput,
  FormSelect,
  FormProgressIndicator,
  FormButton,
} from "../styles/global";

interface IProps {
  closeModal: () => void;
}

const EditAccount: React.FC<IProps> = ({ closeModal }) => {
  const [currency, setCurrency] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const selectCurency = (e: any): void => {
    setCurrency(e.target.value);
  };

  const submitForm = (e: any): void => {
    setLoading(true);

    setTimeout((): void => {
      setLoading(false);
      setSuccess(!success);
    }, 3000);

    setTimeout((): void => {
      closeModal();
    }, 4000);
  };

  return (
    <Form component="form">
      <FormInput id="outlined-name-input" label="Name" type="text" />
      <FormInput id="outlined-surname-input" label="Surname" type="text" />
      <FormInput id="outlined-email-input" label="Email" type="email" />
      <FormInput
        id="outlined-phoneNumber-input"
        label="Phone number"
        type="tel"
      />
      <FormInput
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <FormInput
        id="outlined-newPassword-input"
        label="New Password"
        type="password"
      />

      <FormSelect
        labelId="simple-select-label"
        id="simple-select"
        value={currency}
        defaultValue="Select Currency"
        onChange={selectCurency}
      >
        <MenuItem value={1}>Select Currency</MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </FormSelect>

      <FormInput id="outlined-teamId-input" label="Team ID" type="text" />

      <FormButton variant="contained" onClick={submitForm}>
        {!loading && "Submit"}
      </FormButton>
      {loading && <FormProgressIndicator size={40} />}
    </Form>
  );
};

export default EditAccount;
