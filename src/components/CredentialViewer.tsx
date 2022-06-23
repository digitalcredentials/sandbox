import React from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { JSONEditor } from "@material-did/common";

type PropsType = {
  subTitle: string;
  value: string;
};

const SubTitle = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContainerEditor = styled.div`
  overflow: hidden;
  border: 3px solid ${COLORS.DAISY_BUSH};
  border-radius: 10px;
  height: 500px;
`;

export const CredentialViewer = ({ subTitle, value }: PropsType) => {
  return (
    <>
      <SubTitle>{subTitle}</SubTitle>
      <ContainerEditor>
        <JSONEditor value={value} />
      </ContainerEditor>
    </>
  );
};
