import React, { FC } from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";

const QRCode = require("qrcode.react");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font: 50px Segoe UI;
  color: ${COLORS.METEORITE};
  text-align: center;
  margin: 1em;
`;

const ContainerQRCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 434px;
  height: 434px;
  left: 693px;
  top: 332px;
  text-align: center;
  background: ${COLORS.WILD_SAND};
  box-shadow: -20px 20px 40px rgba(196, 196, 196, 0.2),
    20px -20px 40px rgba(196, 196, 196, 0.2),
    -20px -20px 40px rgba(255, 255, 255, 0.9),
    20px 20px 50px rgba(196, 196, 196, 0.9);
  border-radius: 30px;
`;

export const Request: FC = () => {
  return (
    <Container>
      <Title>Request Credential</Title>
      <ContainerQRCode>
        <QRCode value="http://127.0.0.1:5000/request/credentials" size={300} />
      </ContainerQRCode>
    </Container>
  );
};
