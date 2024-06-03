import { EuiComboBox, EuiFormRow } from "@elastic/eui";
import React, { useState } from "react";

function MeetingUserField({
  label,
  isInvalid,
  error,
  options,
  onChange,
  selectedOptions,
  singleSelection = false,
  isClearable,
  placeholder,
}: {
  label: string;
  isInvalid: boolean;
  error: Array<string>;
  options: any;
  onChange: any;
  selectedOptions: any;
  singleSelection?: { asPlainText: boolean } | boolean;
  isClearable: boolean;
  placeholder: string;
}) {
  // State to hold the input value
  const [searchValue, setSearchValue] = useState("");

  // Function to handle input change
  const onInputChange = (value: string) => {
    setSearchValue(value);
  };

  // Function to handle option selection
  const onSelectOption = (selectedOptions: any) => {
    setSearchValue(""); // Clear search value when an option is selected
    onChange(selectedOptions); // Propagate selected option(s) to parent component
  };

  return (
    <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
      <EuiComboBox
        options={options}
        onChange={onSelectOption}
        selectedOptions={selectedOptions}
        singleSelection={singleSelection}
        isClearable={isClearable}
        placeholder={placeholder}
        isInvalid={isInvalid}
        onSearchChange={onInputChange} // Handle input change
        noSuggestions={!searchValue} // Show 'No matching users' message only when there are no suggestions
        isLoading={false} // You can set this to true if you want to show a loading spinner while fetching results
      />
    </EuiFormRow>
  );
}

export default MeetingUserField;
