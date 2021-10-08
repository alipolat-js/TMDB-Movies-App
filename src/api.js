import axios from "axios"

export const searchMovie = async (query) => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&page-1&include_adult=false&query=${query}`)
  return data 
}

export const findMovie = async (id) => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&external_source=imdb_id`)
  return data 
}

export const fetchTopRated  = async () => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  return data
}

export const fetchPopularMovies  = async () => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  return data
}