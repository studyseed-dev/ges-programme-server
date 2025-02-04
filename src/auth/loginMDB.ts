import { Request, Response, Router } from "express";
import User from "../models/User";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    // check if user exists using email
    const userLogin = await User.findOne({ userid: req.body.userid });
    if (!userLogin) {
      res.status(401).send({ message: "User does not exist!", operation: false });
      return;
    }
    res.status(200).send({ message: "Login successful", operation: true });
  } catch (error) {
    res.status(500).send({ error, operation: false });
  }
});

export default router;
