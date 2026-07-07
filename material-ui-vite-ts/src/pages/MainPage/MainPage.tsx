import { styled, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Autocomplete, { Option } from "../../components/Autocomplete";
import Header from "../../components/Header/Header";
import JourneysList from "../../components/JourneysList/JourneysList";
import MultiOriginDestinationFilter from "../../components/MultiOriginDestinationFilter";
import { Filters } from "../../components/MultiOriginDestinationFilter/MultiOriginDestinationFilterPresentation";
import { useStations } from "../../hooks/useStations";

const ContentContainer = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.space.xl,
  gap: theme.space.xl,
}));

const SectionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  textTransform: "capitalize",
}));

const EMPTY_FILTERS: Filters = {
  chosenOutboundOrigins: [],
  chosenOutboundDestinations: [],
  chosenReturnOrigins: [],
  chosenReturnDestinations: [],
};

const ViewJourneys = () => {
  const stations = useStations();

  const [chosenStation, setChosenStation] = useState<Option | null>(null);

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const stationsForAutocomplete: Option[] = useMemo(
    () =>
      stations.map((station) => ({
        value: station.id,
        label: station.name,
        code: station.code,
        group: station.country,
      })),
    [stations],
  );

  const handleFilter = useCallback((filters: Filters) => {
    setFilters(filters);
  }, []);

  return (
    <>
      <Header />
      <ContentContainer>
        <MultiOriginDestinationFilter onChangeFilters={handleFilter} />
        <JourneysList
          label="Outbound Journeys"
          origins={filters.chosenOutboundOrigins}
          destinations={filters.chosenOutboundDestinations}
        />
        <JourneysList
          label="Return Journeys"
          origins={filters.chosenReturnOrigins}
          destinations={filters.chosenReturnDestinations}
        />
        <SectionText>Give us your opinion</SectionText>
        <Autocomplete
          multiple={false}
          label="Favourite Train Station"
          placeholder="Select a station..."
          options={stationsForAutocomplete}
          value={chosenStation}
          onChange={setChosenStation}
          loading={false}
          debounceMs={250}
        />
      </ContentContainer>
    </>
  );
};

export default ViewJourneys;
