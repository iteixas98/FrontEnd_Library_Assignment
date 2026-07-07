import {
  Autocomplete,
  AutocompleteRenderGroupParams,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { HTMLAttributes, KeyboardEvent, memo } from "react";
import GroupHeader from "./GroupHeader";
import HighlightedOption from "./HighlightedOption";
import Input from "./Input";
import { BaseAutocompleteProps, Option, SelectionProps } from "./types";

export type AutocompletePresentationProps = BaseAutocompleteProps &
  SelectionProps & {
    searchValue: string;
    debouncedSearchValue: string;
    handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    onSearchValueChange: (query: string) => void;
  };

const AutocompletePresentation = ({
  multiple,
  options,
  value,
  searchValue,
  debouncedSearchValue,
  onSearchValueChange,
  loading,
  label,
  placeholder,
  handleKeyDown,
  disabled,
  onChange,
}: AutocompletePresentationProps) => {
  if (multiple) {
    return (
      <Autocomplete
        multiple
        options={options}
        value={value}
        onChange={(_, next) => onChange(next)}
        inputValue={searchValue}
        onInputChange={(_, next) => onSearchValueChange(next)}
        getOptionLabel={(opt: Option) => opt.label}
        groupBy={(opt: Option) => opt.group || "Other"}
        filterOptions={(x: Option[]) => x}
        fullWidth
        disabled={disabled}
        onKeyDown={handleKeyDown}
        renderGroup={(params: AutocompleteRenderGroupParams) => (
          <GroupHeader params={params} />
        )}
        renderOption={(
          layoutProps: HTMLAttributes<HTMLLIElement>,
          opt: Option,
        ) => (
          <HighlightedOption
            key={opt.value}
            propsLayout={layoutProps}
            option={opt}
            debouncedSearchValue={debouncedSearchValue}
          />
        )}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <Input
            params={params}
            label={label}
            placeholder={placeholder}
            loading={loading}
          />
        )}
      />
    );
  }

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(_, next) => onChange(next)}
      inputValue={searchValue}
      onInputChange={(_, next) => onSearchValueChange(next)}
      getOptionLabel={(opt: Option) => opt.label}
      groupBy={(opt: Option) => opt.group || "Other"}
      filterOptions={(x: Option[]) => x}
      fullWidth
      disabled={disabled}
      onKeyDown={handleKeyDown}
      renderGroup={(params: AutocompleteRenderGroupParams) => (
        <GroupHeader params={params} />
      )}
      renderOption={(
        layoutProps: HTMLAttributes<HTMLLIElement>,
        opt: Option,
      ) => (
        <HighlightedOption
          propsLayout={layoutProps}
          option={opt}
          debouncedSearchValue={debouncedSearchValue}
        />
      )}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <Input
          params={params}
          label={label}
          placeholder={placeholder}
          loading={loading}
        />
      )}
    />
  );
};

export default memo(AutocompletePresentation);
