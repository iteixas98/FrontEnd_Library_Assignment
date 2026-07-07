import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useStations } from "../../hooks/useStations";
import { Option } from "../Autocomplete";
import MultiOriginDestinationFilterPresentation, {
  Filters,
} from "./MultiOriginDestinationFilterPresentation";

interface MultiOriginDestinationFilterProps {
  onChangeFilters: (filters: Filters) => void;
}

const MultiOriginDestinationFilterContainer = ({
  onChangeFilters,
}: MultiOriginDestinationFilterProps) => {
  const stations = useStations();
  const [chosenOutboundOrigins, setChosenOutboundOrigins] = useState<Option[]>(
    [],
  );
  const [chosenOutboundDestinations, setChosenOutboundDestinations] = useState<
    Option[]
  >([]);
  const [chosenReturnOrigins, setChosenReturnOrigins] = useState<Option[]>([]);
  const [chosenReturnDestinations, setChosenReturnDestinations] = useState<
    Option[]
  >([]);
  const [hasReturn, setHasReturn] = useState(false);
  const [mirrorOutboundJourney, setMirrorOutboundJourney] = useState(false);

  const options: Option[] = useMemo(
    () =>
      stations.map((station) => ({
        value: station.id,
        label: station.name,
        code: station.code,
        group: station.country,
      })),
    [stations],
  );

  useEffect(() => {
    if (mirrorOutboundJourney) {
      setChosenReturnOrigins(chosenOutboundDestinations);
      setChosenReturnDestinations(chosenOutboundOrigins);
    } else {
      setChosenReturnOrigins([]);
      setChosenReturnDestinations([]);
    }
  }, [mirrorOutboundJourney]);

  const handleAddReturn = useCallback(() => {
    setHasReturn(true);
  }, []);

  const handleRemoveReturn = useCallback(() => {
    setHasReturn(false);
    setMirrorOutboundJourney(false);
  }, []);

  const handleToggleMirror = useCallback(() => {
    setMirrorOutboundJourney((prev) => !prev);
  }, []);

  const handleChangeOutboundOrigins = useCallback((options: Option[]) => {
    setChosenOutboundOrigins(options);
  }, []);

  const handleChangeOutboundDestinations = useCallback((options: Option[]) => {
    setChosenOutboundDestinations(options);
  }, []);

  const handleChangeReturnOrigins = useCallback((options: Option[]) => {
    setChosenReturnOrigins(options);
  }, []);

  const handleChangeReturnDestinations = useCallback((options: Option[]) => {
    setChosenReturnDestinations(options);
  }, []);

  const handleFilter = useCallback(() => {
    onChangeFilters({
      chosenOutboundOrigins: chosenOutboundOrigins,
      chosenOutboundDestinations: chosenOutboundDestinations,
      chosenReturnOrigins: chosenReturnOrigins,
      chosenReturnDestinations: chosenReturnDestinations,
    });
  }, [
    chosenOutboundOrigins,
    chosenOutboundDestinations,
    chosenReturnOrigins,
    chosenReturnDestinations,
  ]);
  return (
    <MultiOriginDestinationFilterPresentation
      options={options}
      chosenOutboundOrigins={chosenOutboundOrigins}
      chosenOutboundDestinations={chosenOutboundDestinations}
      chosenReturnOrigins={chosenReturnOrigins}
      chosenReturnDestinations={chosenReturnDestinations}
      hasReturn={hasReturn}
      isMirrored={mirrorOutboundJourney}
      onChangeChosenOutboundOrigins={handleChangeOutboundOrigins}
      onChangeChosenOutboundDestinations={handleChangeOutboundDestinations}
      onChangeChosenReturnOrigins={handleChangeReturnOrigins}
      onChangeChosenReturnDestinations={handleChangeReturnDestinations}
      onAddReturn={handleAddReturn}
      onRemoveReturn={handleRemoveReturn}
      onToggleMirror={handleToggleMirror}
      onApplyFilters={handleFilter}
    />
  );
};

export default memo(MultiOriginDestinationFilterContainer);
