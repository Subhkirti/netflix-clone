import connection from "../../database/connection";
import MoviesSchema from "../../database/moviesSchema";

export default function add_movies(req, res) {
  if (req.body) {
    const body = req.body && JSON.parse(req.body);
    connection()
    const createDB = new MoviesSchema(body);
    createDB
      .save()
      .then(() => res.status(200).json({ status: "SUCCESS" }))
      .catch(() =>
        res
          .status(400)
          .json({ status: "FAILED", error_message: "failed to add Movie" })
      );
  } else {
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
}
