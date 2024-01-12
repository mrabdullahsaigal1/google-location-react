import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";

const PlacesAutocomplete = ({ onPlaceSelected }) => {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!autocompleteRef.current && window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["(cities)"] }
      );
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
          onPlaceSelected(place);
        }
      });
    }
  }, [onPlaceSelected]);

  return (
    <div>
      <h3>Search For Places</h3>
      <TextField
        id="autocomplete"
        label="Search for a place"
        variant="outlined"
        fullWidth
        inputRef={inputRef}
      />
    </div>
  );
};

export default PlacesAutocomplete;
