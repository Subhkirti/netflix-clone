import connection from "../../database/connection";
import UsersSchema from "../../database/usersSchema";

export default async function add_movie_to_watch_list(req, res) {
  if (req.body) {
    const body = req.body && JSON.parse(req.body);
    await connection();

    try {
      const userData = await UsersSchema.findOne({ userId: body.userId });
      if (userData) {
        const updatedMovie = [];
        for (var movieCategory of userData?.movies) {
          if (movieCategory?.movies?.length > 0) {
            const movies = [];
            for (var movie of movieCategory.movies) {
              if (movie.id === body.watchList.id) {
                movie["addedToWatchList"] = true;
                movies.push(movie);
              } else {
                movies.push(movie);
              }
            }
            updatedMovie.push({ ...movieCategory, movies });
          } else {
            updatedMovie.push({ ...movieCategory });
          }
        }
        const doc = await UsersSchema.findOneAndUpdate(
          { userId: body.userId },
          {
            $push: { watchList: body?.watchList },
            $set: { movies: updatedMovie },
          }
        );

        res.status(200).json({
          status: "SUCCESS",
          updatedUser: doc,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "FAILED",
        error_message: "Failed to add movie in your Watch List.",
      });
    }
  } else {
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
}
