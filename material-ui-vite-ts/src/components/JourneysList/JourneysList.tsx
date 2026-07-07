import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { memo, useCallback } from "react";
import { useJourneys } from "../../hooks/useJourneys";
import { useStations } from "../../hooks/useStations";
import { Option } from "../Autocomplete";

const Container = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const ListPaper = styled(Paper)({
  borderRadius: 2,
  overflow: "hidden",
  width: "100%",
});

const PlaceholderMessage = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ListContainer = styled("div")({
  flex: 1,
  display: "flex",
  alignItems: "stretch",
});

const ListItemSecondaryTextContainer = styled(Typography)(({ theme }) => ({
  display: "flex",
  gap: theme.space.xxs,
  color: theme.palette.text.secondary,
}));

const ListItemPrimaryTextContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const BoldText = styled(Typography)({
  fontWeight: 700,
});

interface JourneysListProps {
  origins: Option[];
  destinations: Option[];
  label: string;
}

const JourneysList = ({ label, origins, destinations }: JourneysListProps) => {
  const journeys = useJourneys();
  const stations = useStations();

  const originCodes = origins.map((o) => o.code);
  const destinationCodes = destinations.map((d) => d.code);

  const filteredJourneys = journeys.filter((journey) => {
    if (origins.length === 0 && destinations.length === 0) {
      return journeys;
    }
    const matchesOrigin =
      originCodes.length === 0 || originCodes.includes(journey.originCode);
    const matchesDestination =
      destinationCodes.length === 0 ||
      destinationCodes.includes(journey.destinationCode);

    return matchesOrigin && matchesDestination;
  });

  const getStationName = useCallback((code: string) => {
    return stations.find((station) => station.code === code)?.name || code;
  }, []);

  return (
    <Container>
      <Title variant="h6">
        {label} ({filteredJourneys.length})
      </Title>

      <ListPaper variant="outlined">
        {filteredJourneys.length === 0 ? (
          <div>
            <PlaceholderMessage variant="body2">
              No journeys found matching the selected routes.
            </PlaceholderMessage>
          </div>
        ) : (
          <List disablePadding>
            {filteredJourneys.map((journey, index) => (
              <ListContainer key={journey.id}>
                <ListItem sx={{ py: 2, px: 3 }}>
                  <ListItemText
                    primary={
                      <ListItemPrimaryTextContainer>
                        <BoldText variant="body1">
                          {`${getStationName(journey.originCode)} → ${getStationName(journey.destinationCode)}`}
                        </BoldText>
                        <BoldText variant="subtitle1" color="primary.main">
                          {journey.price ? `${journey.price}` : "—"}
                        </BoldText>
                      </ListItemPrimaryTextContainer>
                    }
                    secondary={
                      <ListItemSecondaryTextContainer>
                        <Typography variant="caption">
                          Departs: {journey.departureTime || "N/A"}
                        </Typography>
                        <Typography variant="caption">
                          Duration: {journey.duration || "N/A"}
                        </Typography>
                      </ListItemSecondaryTextContainer>
                    }
                  />
                </ListItem>
                {index < filteredJourneys.length - 1 && <Divider />}
              </ListContainer>
            ))}
          </List>
        )}
      </ListPaper>
    </Container>
  );
};

export default memo(JourneysList);
