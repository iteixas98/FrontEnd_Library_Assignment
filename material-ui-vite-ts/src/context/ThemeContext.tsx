import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  PaletteOptions,
} from "@mui/material";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

declare module "@mui/material/styles" {
  interface Theme {
    space: {
      xxs: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }
  interface ThemeOptions {
    space?: {
      xxs: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }
}

interface CustomPalette extends PaletteOptions {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
}

type ThemeMode = "light" | "dark";

export const PALETTES: Record<ThemeMode, CustomPalette> = {
  light: {
    primary: {
      main: "#049999",
      light: "#42caca",
      dark: "#006a6a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5fafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#0b1b1b",
      secondary: "#495959",
    },
  },
  dark: {
    primary: {
      main: "#42caca",
      light: "#6effff",
      dark: "#049999",
      contrastText: "#001f1f",
    },
    background: {
      default: "#071212",
      paper: "#0f2020",
    },
    text: {
      primary: "#f0fdfd",
      secondary: "#809999",
    },
  },
};

interface ThemeModeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined,
);

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...PALETTES[mode],
      },
      space: {
        xxs: 2,
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
    });
  }, [mode]);

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a CustomThemeProvider");
  }
  return context;
};
