import React, { FC, useCallback, useEffect, useState } from "react";
import { JSONEditor, LinkedDataPropertyTable, CredentialCard } from "@material-did/common";
import { ContainerQRCode } from "../utils/styles";
import { DocProps } from "../components/Props";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { encodeToQrCodeUrl } from "../utils/codecs";
import { Tabs } from "../components";

const Container = styled.div`
  font-family: Source Code Pro;
`;

const ContentContainer = styled.div`
  border-radius: 20px;
  background-color: ${COLORS.DAISY_BUSH};
  padding: 40px 60px;
`;

const MainContent = styled.div`
  overflow: hidden;
  border-radius: 20px;
`;

export const VerifiableCredentialEdit: FC<DocProps> = ({
  document,
  setDocument,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    updateQrCodeUrl(document);
  }, [document]);

  const handleTabSelect = useCallback(
    (newValue: number) => {
      setTabIndex(newValue);
    },
    [setTabIndex]
  );

  const updateQrCodeUrl = async (document: any) => {
    const qrCodeUrl = await encodeToQrCodeUrl(document);
    setQrCodeUrl(qrCodeUrl);
  };

  const editorOnChange = async (data: string) => {
    try {
      const dataJson = JSON.parse(data);
      setDocument(dataJson);
      await updateQrCodeUrl(dataJson);
    } catch (error) {}
  };

  const contentComponentsArr = [
    <JSONEditor
      value={JSON.stringify(document, null, 2)}
      onChange={editorOnChange}
    />,
    <LinkedDataPropertyTable document={document} />,
    <CredentialCard verifiableCredential={document} />,
    <ContainerQRCode>
      {/* TODO: Using img element instead of QRCode
      from qrcode.react due to code overflow */}
      <img src={qrCodeUrl} alt="QR Code" width="200" />
    </ContainerQRCode>,
  ];

  return (
    <Container>
      <ContentContainer>
        <Tabs handleTabSelect={handleTabSelect} tabIndex={tabIndex} />
        <MainContent>{contentComponentsArr[tabIndex]}</MainContent>
      </ContentContainer>
    </Container>
  );
};
