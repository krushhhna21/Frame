/**
 * favouritesReducer.js
 *
 * Manages the set of favourited photo IDs using useReducer.
 * State shape: an array of photo ID strings, e.g. ["0", "10", "25"].
 *
 * Actions:
 *   TOGGLE_FAVOURITE  — adds or removes a photo ID from the set.
 *   INITIALIZE_FAVOURITES — replaces state with data loaded from localStorage.
 */

export const ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
  INITIALIZE_FAVOURITES: 'INITIALIZE_FAVOURITES',
};

export function favouritesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_FAVOURITE: {
      const id = action.payload;
      if (state.includes(id)) {
        return state.filter((favId) => favId !== id);
      }
      return [...state, id];
    }

    case ACTIONS.INITIALIZE_FAVOURITES: {
      return Array.isArray(action.payload) ? action.payload : [];
    }

    default:
      return state;
  }
}
