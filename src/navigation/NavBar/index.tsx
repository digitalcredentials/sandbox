import React, { useState, useCallback } from "react";
import styled from "styled-components";
import TopNavPanel from "./TopNavPanel";
import NavSidebar from "./NavSidebar";
import Drawer from "./Drawer";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

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
      {/* <Tabs variant="fullWidth" value="1" centered>
        <Tab label="Issue" value="1" />
        <Tab label="Verify" value="2" />
      </Tabs> */}
      {/* <NavSidebar
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isOpen={isOpen}
      />
      <Drawer
        setDocument={setDocument}
        isOpen={isOpen}
        handleDrawerClose={handleDrawerClose}
      /> */}
    </Container>

  );
};
