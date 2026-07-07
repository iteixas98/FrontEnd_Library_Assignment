import type { AutocompleteRenderGroupParams } from "@mui/material";
import { styled, Typography } from "@mui/material";
import { memo } from "react";

const Container = styled("div")(({ theme }) => ({
  padding: "6px 16px",
  backgroundColor: theme.palette.background.default,
  fontWeight: 700,
}));

const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  letterSpacing: 1,
  textTransform: "uppercase",
}));

interface GroupHeaderProps {
  params: AutocompleteRenderGroupParams;
}

const GroupHeader = ({ params }: GroupHeaderProps) => (
  <div key={params.key}>
    <Container>
      <Label variant="caption">{params.group}</Label>
    </Container>
    {params.children}
  </div>
);

export default memo(GroupHeader);
