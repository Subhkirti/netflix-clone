import { tokenKey } from "@/app/utils/constants";
import { v4 as uuidv4 } from "uuid";
import connection from "../../database/connection";
import UsersSchema from "../../database/usersSchema";

export default function login(req, res) {
   // For already existed user
  var jwt = require("jsonwebtoken");
  if (req.body) {
    const body = req.body && JSON.parse(req.body);
    const { email, loginSource, password } = body;
    const token = jwt.sign(body, tokenKey);

    const response = {
      emailOrMobile: email,
      password: password,
      loginSource: loginSource,
      token: token,
      userId: uuidv4(),
    };
    
    async function fetchUsers() {
      connection();
      UsersSchema.findOne({ emailOrMobile: email })
        .then((docs) => {
          res.status(200).json({
            status: "SUCCESS",
            userObject: { ...response },
            isUserAlreadyExist: docs ? true : false,
            alreadyExistedUser: docs,
          });
        })
        .catch(() => {
          res.status(500).json({
            status: "FAILED",
            error_message: "Internal Server Error!",
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
