import connection from "../../database/connection";
import MoviesSchema from "../../database/moviesSchema";

export default async function movies(req, res) {
  try {
    connection();
    const docs = await MoviesSchema.find({});
    res.status(200).json({
      status: "SUCCESS",
      movies_data: docs,
    });
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({
      status: "FAILED",
      message: "An error occurred while fetching movies",
    });
  }
}
