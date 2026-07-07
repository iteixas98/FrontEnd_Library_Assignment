import { Add, Remove } from "@mui/icons-material";
import { Button, styled, Switch, Typography } from "@mui/material";
import { memo } from "react";
import Autocomplete, { Option } from "../Autocomplete";

const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
}));

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.space.xl,
}));

const SectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.space.md,
}));

const Row = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: theme.space.xl,
}));

const SpacedBetweenRow = styled(Row)({
  justifyContent: "space-between",
});

const ToggleContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export interface Filters {
  chosenOutboundOrigins: Option[];
  chosenOutboundDestinations: Option[];
  chosenReturnOrigins: Option[];
  chosenReturnDestinations: Option[];
}

interface MultiOriginDestinationFilterPresentationProps {
  options: Option[];
  chosenOutboundOrigins: Option[];
  chosenOutboundDestinations: Option[];
  chosenReturnOrigins: Option[];
  chosenReturnDestinations: Option[];
  hasReturn: boolean;
  isMirrored: boolean;
  onChangeChosenOutboundOrigins: (options: Option[]) => void;
  onChangeChosenOutboundDestinations: (options: Option[]) => void;
  onChangeChosenReturnOrigins: (options: Option[]) => void;
  onChangeChosenReturnDestinations: (options: Option[]) => void;
  onAddReturn: () => void;
  onRemoveReturn: () => void;
  onToggleMirror: () => void;
  onApplyFilters: () => void;
}

const MultiOriginDestinationFilterPresentation = ({
  options,
  chosenOutboundOrigins,
  chosenOutboundDestinations,
  chosenReturnOrigins,
  chosenReturnDestinations,
  hasReturn,
  isMirrored,
  onChangeChosenOutboundOrigins,
  onChangeChosenOutboundDestinations,
  onAddReturn,
  onRemoveReturn,
  onToggleMirror,
  onChangeChosenReturnOrigins,
  onChangeChosenReturnDestinations,
  onApplyFilters,
}: MultiOriginDestinationFilterPresentationProps) => {
  return (
    <Container>
      <SectionContainer>
        <Label>Outbound</Label>
        <Row>
          <Autocomplete
            multiple={true}
            label="Origin"
            placeholder="Select one or more stations..."
            options={options}
            value={chosenOutboundOrigins}
            onChange={onChangeChosenOutboundOrigins}
            loading={false}
            debounceMs={250}
          />
          <Autocomplete
            multiple={true}
            label="Destination"
            placeholder="Select one or more stations..."
            options={options}
            value={chosenOutboundDestinations}
            onChange={onChangeChosenOutboundDestinations}
            loading={false}
            debounceMs={250}
          />
        </Row>
      </SectionContainer>
      {!hasReturn ? (
        <div>
          <Button onClick={onAddReturn} startIcon={<Add />}>
            Add return
          </Button>
        </div>
      ) : (
        <SectionContainer>
          <SpacedBetweenRow>
            <Label>Return</Label>
            <Button onClick={onRemoveReturn} startIcon={<Remove />}>
              Remove Return
            </Button>
          </SpacedBetweenRow>

          <Row>
            <Autocomplete
              multiple={true}
              label="Origin"
              placeholder="Select one or more stations..."
              options={options}
              value={chosenReturnOrigins}
              onChange={onChangeChosenReturnOrigins}
              loading={false}
              debounceMs={250}
              disabled={isMirrored}
            />
            <Autocomplete
              multiple={true}
              label="Destination"
              placeholder="Select one or more stations..."
              options={options}
              value={chosenReturnDestinations}
              onChange={onChangeChosenReturnDestinations}
              loading={false}
              debounceMs={250}
              disabled={isMirrored}
            />
          </Row>
          <ToggleContainer>
            <Switch onClick={onToggleMirror} />
            Mirror Outbound Stations
          </ToggleContainer>
        </SectionContainer>
      )}
      <div>
        <Button onClick={onApplyFilters}>Apply Filter</Button>
      </div>
    </Container>
  );
};

export default memo(MultiOriginDestinationFilterPresentation);
