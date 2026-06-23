import { verifyAccessJWT } from "../utils/jwt.js";
import { getSession } from "../models/Session/SessionModel.js";
import { getUserByEmail } from "../models/User/UserModel.js";
import { responseClient } from "./responseClient.js";

export const userAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  let message = "Unauthorized";
  if (authorization) {
    const token = authorization.split(" ")[1];

    console.log(token);
    //check if  valid
    const decoded = verifyAccessJWT(token);
    console.log(decoded);

    //check if exist in session table
    if (decoded.email) {
      const tokenSession = await getSession({ token });
      console.log(tokenSession);

      //get user by email
      if (tokenSession?._id) {
        const user = await getUserByEmail(decoded.email);
        console.log(user);
        if (user?._id && user.status === "active") {
          //return the user
          req.userInfo = user;
          return next();
        }
      }
    }
    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }
  responseClient({
    req,
    res,
    message,
    statusCode: 401,
  });
};
