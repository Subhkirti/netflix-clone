import connection from "../../database/connection";
import UsersSchema from "../../database/usersSchema";

export default async function add_movie_to_watch_list(req, res) {
  if (req.body) {
    const body = req.body && JSON.parse(req.body);
    await connection();

    try {
      await UsersSchema.findOneAndUpdate(
        { userId: body.userId },
        { $push: { watchList: body?.watchList } },
     
      );
      res.status(200).json({
        status: "SUCCESS",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "SUCCESS",
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
