import React from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { JSONEditor } from "@material-did/common";

type PropsType = {
  subTitle: string;
  value: string;
};

const Container = styled.div`
  flex-grow: 1 2 auto;
  flex-basis: 50%;
  padding: 10px;
`;

const SubTitle = styled.div`
  font-size: 1.6em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContainerEditor = styled.div`
  overflow: hidden;
  border: 10px solid ${COLORS.DAISY_BUSH};
  border-radius: 20px;
  height: 500px;
`;

export const Credential = ({ subTitle, value }: PropsType) => {
  return (
    <Container>
      <SubTitle>{subTitle}</SubTitle>
      <ContainerEditor>
        <JSONEditor value={value} />
      </ContainerEditor>
    </Container>
  );
};
