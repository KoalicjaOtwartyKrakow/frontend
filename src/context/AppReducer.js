export default function appReducer(state, action) {
    switch (action.type) {
        case "EDIT_APARTMENT":
        const updateApartment = action.payload;
  
        const updatedApartment = state.apartments.map((apartment) => {
          if (apartment.id === updateApartment.id) {
            return updateApartment;
          }
          return apartment;
        });
  
        return {
          ...state,
          apartments: updatedApartment,
        };
  
      default:
        return state;
    }
  };