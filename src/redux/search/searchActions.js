
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';



export const addSearchResult = (place) => {
    const placeInfo = {
      name: place.name,
      formatted_address: place.formatted_address,
      location: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
    };
  
    return {
      type: ADD_SEARCH_RESULT,
      payload: placeInfo
    };
  };
  