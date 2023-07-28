import connection from "../../database/connection";
import UsersSchema from "../../database/usersSchema";

export default function fetch_user(req, res) {
  // For already existed user
  if (req.body) {
    const body = req.body && JSON.parse(req.body);
    const { email } = body;
    async function fetchUsers() {
      connection();
      UsersSchema.findOne({ emailOrMobile: email })
        .then((docs) => {
          res.status(200).json({
            status: "SUCCESS",
            user_data: docs,
          });
        })
        .catch(() => {
          res.status(400).json({
            status: "FAILED",
            error_message: `Failed to fetch this user ${email}!`,
          });
        });
    }
    fetchUsers();
  } else {
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
}
