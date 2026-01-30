import { Router, Request, Response } from "express";
import { User, IUser, SubjectScores, initializeProgress } from "../models";
import { Course } from "../types/course";
import { Topic } from "../types/topic";

export const router = Router();

// update user progress per module
router.put("/progress", async (req: Request, res: Response) => {
  const { userid, score, topic, moduleId, course } = req.body;
  try {
    const user = (await User.findOne({ userid })) as IUser;
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    // user.progress[course][topic] gives {...}
    // might be empty
    // or { L1_1 : [], L2_1: []}
    const currentTopic = user.progress?.[course as Course]?.[topic as Topic] as SubjectScores;

    // check if currentModule and its score records already exists
    const currentModule = currentTopic[moduleId];

    const formattedDate = new Date().toLocaleDateString("en-GB");
    const currentScore: [number, string] = [score, formattedDate];

    let update;

    if (currentModule) {
      update = {
        $set: {
          [`progress.${course}.${topic}.${moduleId}`]: [...currentModule, currentScore],
        },
      };
    } else {
      update = {
        $set: {
          [`progress.${course}.${topic}`]: { ...currentTopic, [moduleId]: [currentScore] },
        },
      };
    }

    const updatedUser = await User.findOneAndUpdate({ userid }, update, { new: true });

    res
      .status(200)
      .json({ message: `User progress updated successfully for ${userid}`, updatedUser });
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

    const progressPayload = initializeProgress(enrolledCourses as Course[]);
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

// DO NOT USE THIS!!
router.put("/init-progress-all", async (req: Request, res: Response) => {
  try {
    // Get all users
    const allUsers = await User.find({});

    allUsers.forEach(async (user) => {
      const enrolledCourses = user.enrolled_courses;
      const progressPayload = initializeProgress(enrolledCourses as Course[]);

      const result = await User.updateOne(
        { userid: user.userid },
        { $set: { progress: progressPayload } },
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

router.put("/init-progress-by-course", async (req: Request, res: Response) => {
  try {
    const { userid, courses: requestedCourses } = req.body;

    const user: IUser | null = await User.findOne(
      {
        userid,
      },
      { _id: 0 },
    );

    if (user) {
      let coursesToInclude = [] as Course[];

      for (const course of requestedCourses) {
        const hasEnrolledCurrentCourse = user.enrolled_courses.includes(course);
        const hasCurrentProgress = user.progress[course as Course];

        if (hasEnrolledCurrentCourse && !hasCurrentProgress) {
          coursesToInclude.push(course);
        } else if (!hasEnrolledCurrentCourse) {
          res.status(404).json({
            message: `${course} This course is not enrolled!`,
          });
          return;
        }
      }

      const progressToUpdate = initializeProgress(coursesToInclude);

      const result = await User.updateOne(
        { userid },
        {
          $set: {
            progress: {
              ...user.progress,
              ...progressToUpdate,
            },
          },
        },
      );

      res.status(200).send({
        message: `Successfully updated progress for ${userid} for ${JSON.stringify(
          coursesToInclude,
        )}`,
        result,
      });
    } else {
      res.status(404).json({
        message: "This user cannot be found!",
      });
      return;
    }
  } catch (error) {
    console.error("Error updating users:", error);
    res.status(500).json({ message: "Failed to update users", error });
  }
});

export default router;
