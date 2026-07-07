import type { AutocompleteRenderInputParams } from "@mui/material";
import {
  CircularProgress,
  TextField as MuiTextfield,
  styled,
} from "@mui/material";
import { memo } from "react";

const EndAddornmentContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const TextField = styled(MuiTextfield)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.main,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },

  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },

  "& ~ .MuiAutocomplete-popupIndicator": {
    color: theme.palette.primary.main,
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: theme.palette.primary.main,
  },
}));

interface InputProps {
  params: AutocompleteRenderInputParams;
  label: string;
  placeholder?: string;
  loading?: boolean;
}

const Input = ({ params, label, placeholder, loading }: InputProps) => {
  const { slotProps } = params;

  return (
    <TextField
      {...params}
      variant="outlined"
      label={label}
      placeholder={placeholder}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <EndAddornmentContainer>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {slotProps?.input?.endAdornment}
            </EndAddornmentContainer>
          ),
        },
      }}
    />
  );
};

export default memo(Input);
