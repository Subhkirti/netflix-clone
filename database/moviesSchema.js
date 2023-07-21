import mongoose from "mongoose";
//TMDB-apikey: 4f5ca790025ea4baf6f9d72988810577

const schema = new mongoose.Schema({
  categoryId: Number,
  category: String,
  categoryTitle: String,
  movies: Array,
});

const MoviesSchema =
  mongoose?.models?.movies || mongoose.model("movies", schema);

export default MoviesSchema;
