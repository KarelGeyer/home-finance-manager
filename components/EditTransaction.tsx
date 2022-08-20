import { useState } from "react";
import { NextRouter, useRouter } from "next/router";
import axios from "axios";
import { TRANSACTIONS_URL } from "../assets/global";
import {
  Form,
  FormInput,
  FormProgressIndicator,
  FormButton,
} from "../styles/global";

interface IProps {
  closeModal: () => void;
}

export interface Transaction {
  name: string;
  person: string;
  category: string;
  sum: number;
  currency: string;
  date: string;
  month?: string;
  isLoand?: boolean;
  tags?: string | string[];
}

const EditTransaction: React.FC<IProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  const [formData, setFormData] = useState<Transaction>({
    name: "",
    person: "Karel Geyer",
    date: "",
    category: "",
    sum: 0,
    currency: "",
    month: "February",
    isLoand: false,
    tags: "",
  });

  const submitForm = (e: any): void => {
    setLoading(true);

    axios
      .post(TRANSACTIONS_URL, formData)
      .then((res): any => {
        const { status } = res;
        if (status == 201) {
          const location: string = window.location.pathname;

          setLoading(false);
          setSuccess(!success);
          router.reload(location);
        }
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <Form component="form">
      <FormInput
        id="outlined-Name-input"
        label="Name"
        type="text"
        onChange={(e: any) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />
      <FormInput
        id="outlined-category-input"
        label="category"
        type="text"
        onChange={(e: any) =>
          setFormData({ ...formData, category: e.target.value })
        }
      />
      <FormInput
        id="outlined-tags-input"
        label="tags"
        type="text"
        onChange={(e: any) =>
          setFormData({ ...formData, tags: e.target.value })
        }
      />
      <FormInput
        id="outlined-sum-input"
        label="sum"
        type="number"
        onChange={(e: any) => setFormData({ ...formData, sum: e.target.value })}
      />
      <FormInput
        id="date"
        type="date"
        onChange={(e: any) =>
          setFormData({ ...formData, date: e.target.value })
        }
      />
      <FormInput
        id="currency"
        label="currency"
        type="text"
        onChange={(e: any) =>
          setFormData({ ...formData, currency: e.target.value })
        }
      />
      <FormButton variant="contained" onClick={submitForm}>
        {!loading && "Submit"}
      </FormButton>
      {loading && <FormProgressIndicator size={40} />}
    </Form>
  );
};

export default EditTransaction;
