export interface Option {
  value: string;
  label: string;
  code?: string;
  group?: string;
}

export interface BaseAutocompleteProps {
  options: Option[];
  loading?: boolean;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export type SelectionProps =
  | {
      multiple: true;
      value: Option[];
      onChange: (value: Option[]) => void;
    }
  | {
      multiple: false;
      value: Option | null;
      onChange: (value: Option | null) => void;
    };
