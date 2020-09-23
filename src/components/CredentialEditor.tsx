import React from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { JSONEditor } from "@material-did/common";

type PropsType = {
  subTitle: string;
  value: string;
};

const SubTitle = styled.div`
  font-style: italic;
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

export const CredentialEditor = ({ subTitle, value }: PropsType) => {
  return (
    <>
      <SubTitle>{subTitle}</SubTitle>
      <ContainerEditor>
        <JSONEditor value={value} />
      </ContainerEditor>
    </>
  );
};
