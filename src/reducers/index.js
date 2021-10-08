import { ADD_MOVIE_TO_WATCHED_LIST } from "../actions";
import { ADD_MOVIE_TO_WATCH_LATER } from "../actions";
import { REMOVE_MOVIE_FROM_WATCHED_LIST } from "../actions";
import { REMOVE_MOVIE_FROM_WATCH_LATER } from "../actions";

const localWatchLaterList = JSON.parse(localStorage.getItem("watchLaterList"))
const localWatchedList = JSON.parse(localStorage.getItem("watchedList"))

const INITIAL_STATE = {
  watchLaterList: localWatchLaterList ? localWatchLaterList : [],
  watchedList: localWatchedList ? localWatchedList : [],
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MOVIE_TO_WATCH_LATER:
      return {
        ...state,
        watchLaterList: [action.payload, ...state.watchLaterList]
      }
    case ADD_MOVIE_TO_WATCHED_LIST:
      return {
        ...state,
        watchedList: [action.payload, ...state.watchedList]
      }
    case REMOVE_MOVIE_FROM_WATCH_LATER:
     return {
        ...state,
        watchLaterList: state.watchLaterList.filter(item => item.id !== action.payload.id)
      }
    case REMOVE_MOVIE_FROM_WATCHED_LIST:
      return {
        ...state,
        watchedList: state.watchedList.filter(item => item.id !== action.payload.id)
      }
  }

  return state;
}