import { styled } from "@mui/material";
import { memo } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "end",
  padding: theme.space.md,
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    "0 4px 12px 0 rgba(90, 0, 101, 0.06), 0 1px 4px 0 rgba(0, 0, 0, 0.04)",
}));

const Header = () => {
  return (
    <Container>
      <ThemeToggle />
    </Container>
  );
};

export default memo(Header);
