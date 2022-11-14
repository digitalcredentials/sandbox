import styled from "styled-components";
import COLORS from "./colors";


export const Title = styled.div`
font-size: 1.3em;
`;

export const SubTitle = styled.div`
font-size: 0.9em;
margin-bottom: 20px;
color: grey;
`;

export const Content = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Segoe UI;
  font-size: 25px;
  color: ${COLORS.METEORITE};
  margin-top: 20px;
`;

export const Button = styled.button`
  font-size: 0.8em;
  height: 2em;
  border: none;
  border-radius: 10px;
  color: ${COLORS.METEORITE};
  margin-top: 2em;
  background: ${COLORS.ALABASTER};
  box-shadow: -10px 10px 20px rgba(211, 211, 211, 0.2),
    10px -10px 20px rgba(211, 211, 211, 0.2),
    -10px -10px 20px rgba(255, 255, 255, 0.9),
    10px 10px 25px rgba(211, 211, 211, 0.9);
`;

export const ContainerQRCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 260px;
  left: 693px;
  top: 332px;
  text-align: center;
  background: ${COLORS.WILD_SAND};
  box-shadow: -20px 20px 40px rgba(196, 196, 196, 0.2),
    20px -20px 40px rgba(196, 196, 196, 0.2),
    -20px -20px 40px rgba(255, 255, 255, 0.9),
    20px 20px 50px rgba(196, 196, 196, 0.9);
  border-radius: 30px;
  margin-top: 30px;
`;
