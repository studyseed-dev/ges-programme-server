import { Request, Response, Router } from "express";
import { User } from "../models";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const userLogin = await User.findOne({ userid: req.body.userid });

    if (!userLogin) {
      res.status(401).json({ message: "User does not exist!", operation: false });
      return;
    }
    if (!userLogin.enrolled_courses || userLogin.enrolled_courses.length <= 0) {
      res.status(404).json({ message: "User not registered!", operation: false });
      return;
    }
    res.status(200).json({ message: "Login successful!", operation: true });
  } catch (error) {
    res.status(500).json({ error, operation: false });
  }
});

export default router;
