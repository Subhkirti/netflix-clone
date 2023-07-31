import connection from "../../database/connection";
import UsersSchema from "../../database/usersSchema";

export default async function fetch_watchlist(req, res) {
  const body = req.body && JSON.parse(req.body);
  try {
    connection();
    const docs = await UsersSchema.findOne({ emailOrMobile: body.emailOrMobile });
    res.status(200).json({
      status: "SUCCESS",
      data: docs,
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      message: "An error occurred while fetching movies",
    });
  }
}
