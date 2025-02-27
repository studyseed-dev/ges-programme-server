import { Router, Request, Response } from "express";
import { User, IUser, Courses, ModuleTopic, SubjectScores, initializeProgress } from "../models";
export const router = Router();

// update user progress, for all attempts
router.put("/progress", async (req: Request, res: Response) => {
  const { userid, course, score, topic, module } = req.body;
  try {
    const user = (await User.findOne({ userid })) as IUser;
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    // user.progress[GES2][LIT] gives {...}
    // might be empty
    // or { L1_1 : [], L2_1: []}
    const currentTopic = user.progress?.[course as Courses]?.[
      topic as keyof ModuleTopic
    ] as SubjectScores;
    const currentModule = currentTopic?.[module];

    const formattedDate = new Date().toLocaleDateString("en-GB");
    const modulePayload: [number, string] = [score, formattedDate]; // tuple
    let update;

    if (currentModule) {
      // initialise current module as if first attempt
      currentModule.push(modulePayload);
      update = {
        $set: {
          [`progress.${course}.${topic}.${module}`]: currentModule,
        },
      };
    } else {
      update = {
        $set: {
          [`progress.${course}.${topic}`]: { ...currentTopic, [module]: [modulePayload] },
        },
      };
    }

    const updatedUser = await User.findOneAndUpdate({ userid }, update, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error });
  }
});

// Route to update a single user by ID
router.put("/userup/:id", async (req: Request<any>, res: Response) => {
  try {
    const { id } = req.params; // Extract user ID from URL params.
    const updates = req.body; // Extract updates from the request body.
    // Update the user document with the provided ID
    const result = await User.updateOne({ userid: id }, { $set: updates });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      modifiedCount: result,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user", error });
  }
});

router.put("/init-progress/:id", async (req: Request<any>, res: Response) => {
  try {
    const { id } = req.params;
    const existingUser = await User.findOne({ userid: id });

    const enrolledCourses = existingUser?.enrolled_courses;

    const progressPayload = initializeProgress(enrolledCourses as Courses[]);
    // Update the user document with the provided ID
    const result = await User.updateOne({ userid: id }, { $set: { progress: progressPayload } });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      modifiedCount: result,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user", error });
  }
});

router.put("/init-progress-all", async (req: Request, res: Response) => {
  try {
    // Get all users
    const allUsers = await User.find({});

    allUsers.forEach(async (user) => {
      const enrolledCourses = user.enrolled_courses;
      const progressPayload = initializeProgress(enrolledCourses as Courses[]);

      const result = await User.updateOne(
        { userid: user.userid },
        { $set: { progress: progressPayload } }
      );

      if (result.matchedCount === 0) {
        res.status(404).json({ message: "User not found" });
      }
    });
  } catch (error) {
    console.error("Error updating users:", error);
    res.status(500).json({ message: "Failed to update users", error });
  }
});

export default router;
