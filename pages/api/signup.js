import { tokenKey } from "@/app/utils/constants";
import { v4 as uuidv4 } from "uuid";
import connection from "../../database/connection";
import UsersSchema from "../../database/usersSchema";

// need to edit it

export default function signup(req, res) {
  var jwt = require("jsonwebtoken");
  if (req.body) {
    const body = req.body && JSON.parse(req.body);
    const { email, loginSource, password } = body;
    const token = jwt.sign(body, tokenKey);
    connection();

    const response = {
      emailOrMobile: email,
      password: password,
      loginSource: loginSource,
      token: token,
      userId: uuidv4(),
    };
    async function fetchUsers() {
      UsersSchema.findOne({ emailOrMobile: email })
        .then((docs) => {
          const createDB = new UsersSchema(response);
          createDB
            .save()
            .then(() => {
              res.status(200).json({
                status: "SUCCESS",
                userObject: { ...response },
                isUserAlreadyExist: docs ? true : false,
              });
            })
            .catch((error) => {
              res.status(400).json({
                status: "FAILED",
                ...error,
                error_message: docs ? "This user is already existed" : "",
                isUserAlreadyExist: docs ? true : false,
                alreadyExistedUser: docs,
              });
            });
        })
        .catch((err) => {});
    }
    fetchUsers();
  } else {
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
}
