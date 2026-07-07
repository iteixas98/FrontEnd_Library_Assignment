import { KeyboardEvent, memo, useEffect, useState } from "react";
import AutocompletePresentation from "./AutocompletePresentation";
import { BaseAutocompleteProps, Option, SelectionProps } from "./types";

export type AutocompleteContainerProps = BaseAutocompleteProps &
  SelectionProps & {
    debounceMs?: number;
    onSearch?: (query: string) => Promise<Option[]>;
  };

const AutocompleteContainer = ({
  options,
  onSearch,
  loading,
  debounceMs = 250,
  ...props
}: AutocompleteContainerProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [computedOptions, setComputedOptions] = useState<Option[]>(options);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (!onSearch) {
      setComputedOptions(options);
    }
  }, [options, onSearch]);

  useEffect(() => {
    let active = true;

    if (searchValue.trim() && onSearch) {
      setLocalLoading(true);
    }

    const handler = setTimeout(async () => {
      const query = searchValue.toLowerCase().trim();

      if (active) {
        setDebouncedSearchValue(searchValue);
      }

      if (onSearch) {
        try {
          const results = await onSearch(searchValue);
          if (active) setComputedOptions(results);
        } catch (error) {
          console.error("Autocomplete fetch failed:", error);
        } finally {
          if (active) setLocalLoading(false);
        }
      } else {
        if (!query) {
          if (active) setComputedOptions(options);
        } else {
          if (active) {
            setComputedOptions(
              options.filter(
                (opt) =>
                  opt.label.toLowerCase().includes(query) ||
                  opt.code?.toLowerCase().includes(query),
              ),
            );
          }
        }
      }
    }, debounceMs);

    return () => {
      active = false;
      clearTimeout(handler);
    };
  }, [searchValue, onSearch, debounceMs, options]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setSearchValue("");

      if (props.multiple) {
        props.onChange([]);
      } else {
        props.onChange(null);
      }
    }
  };

  return (
    <AutocompletePresentation
      {...props}
      options={computedOptions}
      loading={loading || localLoading}
      searchValue={searchValue}
      handleKeyDown={handleKeyDown}
      debouncedSearchValue={debouncedSearchValue}
      onSearchValueChange={setSearchValue}
    />
  );
};

export default memo(AutocompleteContainer);
