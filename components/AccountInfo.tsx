import { Paragraph } from ".";
import { Container } from "../styles/components/accountInfo";
export interface IProps {
  label: string;
  information: string;
}

export const AccountInfo: React.FC<IProps> = ({ label, information }) => {
  if (
    label != "__typename" &&
    label != "id" &&
    label != "refreshToken" &&
    label != "password"
  ) {
    return (
      <Container>
        <Paragraph variant="subtitle1">{label}:</Paragraph>
        <Paragraph variant="subtitle1">{information}</Paragraph>
      </Container>
    );
  } else {
    return <></>;
  }
};
