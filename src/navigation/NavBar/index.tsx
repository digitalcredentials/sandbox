import React, { useState, useCallback } from "react";
import styled from "styled-components";
import TopNavPanel from "./TopNavPanel";
import NavTabs from "./NavTabs";

type PropsType = {
  setDocument: (document: any) => void;
};

const Container = styled.div`
  font-family: Segoe UI;
`;

export const NavBar = ({ setDocument }: PropsType) => {
  return (

    <Container>
      <TopNavPanel />
      <NavTabs />
    </Container>

  );
};
