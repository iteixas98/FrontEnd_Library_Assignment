import { styled, Typography } from "@mui/material";
import { HTMLAttributes, memo } from "react";
import { Option } from "./types";

const HighlightedSubstring = styled("strong")(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

interface HighlightedOptionProps {
  propsLayout: HTMLAttributes<HTMLLIElement>;
  option: Option;
  debouncedSearchValue: string;
}

const HighlightedOption = ({
  propsLayout,
  option,
  debouncedSearchValue,
}: HighlightedOptionProps) => {
  const text = option.code ? `${option.label} (${option.code})` : option.label;

  if (!debouncedSearchValue.trim()) {
    return (
      <li {...propsLayout} key={option.value}>
        <Typography variant="body2" color="text.primary">
          {text}
        </Typography>
      </li>
    );
  }

  const regex = new RegExp(
    `(${debouncedSearchValue.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return (
    <li {...propsLayout} key={option.value}>
      <Typography variant="body2" color="text.primary">
        {parts.map((part, i) =>
          regex.test(part) ? (
            <HighlightedSubstring key={i}>{part}</HighlightedSubstring>
          ) : (
            part
          ),
        )}
      </Typography>
    </li>
  );
};

export default memo(HighlightedOption);
