import { styled } from "@mui/material";
import { CustomThemeProvider } from "./context/ThemeContext";
import ViewJourneys from "./pages/MainPage/MainPage";

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  minHeight: "100vh",
});

const App = () => {
  return (
    <CustomThemeProvider>
      <PageContainer>
        <ViewJourneys />
      </PageContainer>
    </CustomThemeProvider>
  );
};

export default App;
