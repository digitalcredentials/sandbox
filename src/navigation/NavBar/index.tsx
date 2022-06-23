import React, { useState, useCallback } from "react";
import styled from "styled-components";
import TopNavPanel from "./TopNavPanel";
import NavTabs from "./NavTabs";
import Drawer from "./Drawer";

type PropsType = {
  setDocument: (document: any) => void;
};

const Container = styled.div`
  font-family: Segoe UI;
`;

export const NavBar = ({ setDocument }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleDrawerOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (

    <Container>
      <TopNavPanel />
      <NavTabs />
      <Drawer
        setDocument={setDocument}
        isOpen={isOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </Container>

  );
};
