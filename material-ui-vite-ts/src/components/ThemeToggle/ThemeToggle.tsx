import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { styled, Switch, Typography } from "@mui/material";
import { useThemeMode } from "../../context/ThemeContext";

const ThemeModeSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    "& + .MuiSwitch-track": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const Container = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const IconContainer = styled("div")(({ theme }) => ({
  width: 20,
  height: 20,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledLightModeIcon = styled(LightModeIcon)(({ theme }) => ({
  width: "16px",
  color: theme.palette.primary.contrastText,
}));

const StyledDarkModeIcon = styled(DarkModeIcon)(({ theme }) => ({
  width: "16px",
  color: theme.palette.text.primary,
}));

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Container>
      <Typography>Light Mode</Typography>
      <ThemeModeSwitch
        checked={mode === "dark"}
        onChange={toggleTheme}
        color="secondary"
        icon={
          <IconContainer>
            <StyledLightModeIcon />
          </IconContainer>
        }
        checkedIcon={
          <IconContainer>
            <StyledDarkModeIcon />
          </IconContainer>
        }
      />
      <Typography>Dark Mode</Typography>
    </Container>
  );
};

export default ThemeToggle;
