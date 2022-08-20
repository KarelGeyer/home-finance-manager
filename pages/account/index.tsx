import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Image from "next/image";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  GridContainer,
  ImageBox,
  ButtonWithIcon,
} from "../../styles/pages/account";
import { Section, MainHeading, Paragraph, FormBox } from "../../styles/global";

import AccountInfo, {
  IProps as AccountInfoProps,
} from "../../components/AccountInfo";
import AppBarMenu from "../../components/AppBar";
import EditAccount from "../../components/EditAccount";

import img from "../../public/witcher.jpg";

const Account: React.FC = () => {
  const links: string[] = ["overview", "transactions", "calculator"];
  const user: { information: string; label: string }[] = [
    {
      information: "Karel",
      label: "Name",
    },
    {
      information: "Geyer",
      label: "Surname",
    },
    {
      information: "karelgeyer@gmail.com",
      label: "Email",
    },
    {
      information: "603 429 067",
      label: "Phone Number",
    },
    {
      information: "EUR",
      label: "Default Currency",
    },
    {
      information: "HjsR158Sdd6",
      label: "Account ID",
    },
    {
      information: "kgln603781",
      label: "Team ID",
    },
  ];

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const openModal = (): void => setModalOpened(true);
  const closeModal = (): void => setModalOpened(false);

  return (
    <Section sx={{ fontFamily: "Montserrat" }}>
      <AppBarMenu heading="Account" links={links}>
        <IconButton
          onClick={openModal}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <DeleteIcon />
        </IconButton>
      </AppBarMenu>

      <GridContainer container xs={12} md={12} sx={{ padding: "20px" }}>
        <Grid item xs={12} md={6}>
          <ImageBox>
            <Image src={img} alt="image" layout="fill" objectFit="cover" />
          </ImageBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box component="div">
            <MainHeading variant="h5">My Account</MainHeading>

            {user.map((information: AccountInfoProps, index: number) => (
              <AccountInfo
                label={information.label}
                information={information.information}
                key={index}
              />
            ))}

            <Modal
              open={modalOpened}
              onClose={closeModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <FormBox component="form">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Paragraph variant="h5">Edit Account</Paragraph>
                  <ButtonWithIcon
                    onClick={closeModal}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                  >
                    <CancelIcon />
                  </ButtonWithIcon>
                </Box>

                <EditAccount closeModal={closeModal} />
              </FormBox>
            </Modal>
          </Box>
        </Grid>
      </GridContainer>
    </Section>
  );
};

export default Account;
