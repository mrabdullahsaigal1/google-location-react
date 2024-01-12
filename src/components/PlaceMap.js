import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { addSearchResult } from "../redux/search/searchActions";
import PlacesAutocomplete from "./PlacesAutoComplete"; 
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";


const INITIAL_DISPLAY_COUNT = 10;

const PlaceMap = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const searchHistory = useSelector((state) => state.searchHistory.history);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

  // Load search history from local storage
  const reversedHistory = [...searchHistory].reverse();
  const displayedHistory = reversedHistory.slice(0, displayCount);

  // Handle place selection
  const handlePlaceChange = (place) => {
    setSelectedPlace(place);
    dispatch(addSearchResult(place));
  };

  // Pan to the selected place when it changes
  useEffect(() => {
    if (mapRef.current && selectedPlace && selectedPlace.geometry) {
      const { lat, lng } = selectedPlace.geometry.location;
      mapRef.current.panTo({ lat: lat(), lng: lng() });
    }
  }, [selectedPlace]);

  // Persist search history in local storage
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Load more history items when the user clicks the button
  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };
  //Show less history items when the user clicks the button
  const showLess = () => {
    setDisplayCount(INITIAL_DISPLAY_COUNT);
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ height: "90vh", position: "relative" }}>
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              center={{ lat: -3.745, lng: -38.523 }}
              zoom={10}
              onLoad={(map) => (mapRef.current = map)}
            >
              {selectedPlace && (
                <Marker
                  position={{
                    lat: selectedPlace.geometry.location.lat(),
                    lng: selectedPlace.geometry.location.lng(),
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2, height: "96%", position: "relative" }}>
          <PlacesAutocomplete onPlaceSelected={handlePlaceChange} />
          <Box>
            <Typography variant="h6" gutterBottom>
              Recent Searches
            </Typography>
            <List>
              {displayedHistory.map((place, index) => (
                <ListItem key={index} sx={{ cursor: "pointer" }}>
                  {place.formatted_address}
                </ListItem>
              ))}
            </List>
            {displayCount < searchHistory.length && (
              <Button variant="contained" color="primary" onClick={loadMore}>
                Load More
              </Button>
            )}
            {displayCount > INITIAL_DISPLAY_COUNT && (
              <Button
                variant="contained"
                color="secondary"
                onClick={showLess}
                sx={{ ml: 2 }}
              >
                Show Less
              </Button>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PlaceMap;
