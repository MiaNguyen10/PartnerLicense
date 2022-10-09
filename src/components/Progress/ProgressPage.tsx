import React, { ReactChild, ReactFragment, ReactPortal } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { ThemeProps } from "../../global/Interface.d";
import progressState from "./progressState";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 2500;
  right: 0;
  top: 0;
  background-color: rgba(146, 150, 155, 0.3);
  text-align: center;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProgressStyle = styled(({ isDrawerOpen, MenuDrawerWidth, ...props }) => (
  <CircularProgress {...props} />
))`
  margin-left: ${({ isDrawerOpen, MenuDrawerWidth }) =>
    isDrawerOpen ? `${MenuDrawerWidth}px` : "0px"};
  margin-top: 40%;
`;

const ProgressPage: React.FC<ProgressPageProps> = ({
  children,
  isDrawerOpen,
  MenuDrawerWidth
}) => {
  const [progressPage] = useRecoilState(progressState);

  if (!progressPage?.open) return <></>;
  return (
    <Container>
      <ProgressStyle
        isDrawerOpen={isDrawerOpen}
        MenuDrawerWidth={MenuDrawerWidth}
        id="progress"
      />
      {children}
    </Container>
  );
};

export interface ProgressPageProps extends ThemeProps {
  children?: ReactChild | ReactFragment | ReactPortal | null | undefined;
  isDrawerOpen?: boolean;
  MenuDrawerWidth?: number;
}

export default ProgressPage;
