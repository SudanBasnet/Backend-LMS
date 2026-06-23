import express from "express";
import { responseClient } from "../middleware/responseClient.js";
import { verifyAccessJWT } from "../utils/jwt.js";
import { getSession } from "../models/Session/SessionModel.js";
import { getUserByEmail } from "../models/User/UserModel.js";

const router = express.Router();

router.get("/profile", async (req, res) => {
  const { authorization } = req.headers;
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
          return responseClient({
            req,
            res,
            message: "user profile fetched",
            payload: user,
          });
        }
      }
    }
  }
  responseClient({
    req,
    res,
    message: "unauthorized",
    statusCode: 401,
  });
});

export default router;
