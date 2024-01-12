const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

const initialState = {
  history: storedHistory
};

const searchHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_RESULT':
      const newHistory = [...state.history, action.payload];
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return {
        ...state,
        history: newHistory
      };
    default:
      return state;
  }
};

export default searchHistoryReducer;
