import { Paragraph } from "../styles/global";
import { Container } from "../styles/components/accountInfo";
export interface IProps {
  label: string;
  information: string;
}

const AccountInfo: React.FC<IProps> = ({ label, information }) => {
  return (
    <Container>
      <Paragraph
        variant="subtitle1"
        sx={{
          fontWeight: "600",
        }}
      >
        {label}:
      </Paragraph>
      <Paragraph variant="subtitle1">{information}</Paragraph>
    </Container>
  );
};

export default AccountInfo;
