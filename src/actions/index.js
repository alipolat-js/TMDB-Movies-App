export const ADD_MOVIE_TO_WATCHED_LIST = "ADD_MOVIE_TO_WATCHED_LIST";
export const ADD_MOVIE_TO_WATCH_LATER = "ADD_MOVIE_TO_WATCH_LATER";
export const REMOVE_MOVIE_FROM_WATCH_LATER = "REMOVE_MOVIE_FROM_WATCH_LATER";
export const REMOVE_MOVIE_FROM_WATCHED_LIST = "REMOVE_MOVIE_FROM_WATCHED_LIST";

// ADD
export const addMovieToWatchLater = (result) => {
  return { type: ADD_MOVIE_TO_WATCH_LATER, payload: result }
}

export const addMovieToWatchedList = (result) => {
  return { type: ADD_MOVIE_TO_WATCHED_LIST, payload: result }
}

// REMOVE
export const removeMovieFromWatchLater = (result) => {
  return { type: REMOVE_MOVIE_FROM_WATCH_LATER, payload: result }
}

export const removeMovieFromWatchedList = (result) => {
  return { type: REMOVE_MOVIE_FROM_WATCHED_LIST, payload: result }
}