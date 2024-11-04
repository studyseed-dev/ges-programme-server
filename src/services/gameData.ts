import { time } from "node:console";
import { on } from "node:events";
import { only } from "node:test";

interface BaseQuestion {
  question_number: string;
  question_text: string;
  question_style: "multiple_choice_question" | "drag_and_drop" | "matching" | "fill_in_the_blank";
  image?: string;
  hint: string;
}

// MCQ-specific interface
export interface MCQtype extends BaseQuestion {
  question_style: "multiple_choice_question";
  possible_answers: string[]; // Array of possible options for MCQ
  correct_answer: string; // Correct answer should be a string
}

// Drag-and-Drop-specific interface
export interface DndType extends BaseQuestion {
  question_style: "drag_and_drop";
  possible_answers: string[];
  correct_answer: string[]; // Correct answers for drag-and-drop can be an array of strings
  no_of_ans_box?: number;
}

// Matching-specific interface
export interface MatchType extends BaseQuestion {
  question_style: "matching";
  correct_answer: { [key: string]: string }; // Array of option-answer pairs
  options: string[];
  answers: string[];
}

// Fill-in-the-Blanks-specific interface
export interface FillBlankType extends BaseQuestion {
  question_style: "fill_in_the_blank";
  correct_answer: string[];
  display_info: string;
  num_of_text_box: number;
  placeholders?: string[];
  capitalisation: boolean /** does capitalisation matter for this question? */;
}

// Union type for all question styles
export type Question = MCQtype | DndType | MatchType | FillBlankType;

export interface WeeklyQuestions {
  activeDate: string;
  allQuestions: { [key: string]: Question[] };
}

export interface QuizQuestions {
  [key: string]: WeeklyQuestions;
}

export const GAME_DATA_NUM: QuizQuestions = {
  week1: {
    activeDate: "2024-10-31", // First week already available
    allQuestions: {
      el1: [
        {
          question_number: "num_el1_1",
          question_text: "What is the best way to improve your maths skills?",
          question_style: "multiple_choice_question",
          correct_answer: "Practice regularly",
          possible_answers: [
            "Avoid practising",
            "Practice regularly",
            "Only study the things you already know",
            "Ignore maths problems",
          ],
          hint: "Improving any skill requires doing it regularly; what should you choose?",
        },
        {
          question_number: "num_el1_2",
          question_text: "Match the steps with their correct actions.",
          question_style: "matching",
          correct_answer: {
            "Practice regularly": "Improves over time",
            "Ask for help": "Get support when stuck",
            "Set goals": "Gives direction",
            "Review work": "Understand what you know",
          },
          options: ["Practice regularly", "Ask for help", "Set goals", "Review work"],
          answers: [
            "Improves over time",
            "Get support when stuck",
            "Gives direction",
            "Understand what you know",
          ],
          hint: "Think about what each action helps you achieve when improving your maths skills.",
        },
        {
          question_number: "num_el1_3",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["GOALS"],
          display_info:
            "To improve your maths performance, you should set clear _____ for yourself.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What do you set when you want to achieve something specific?",
        },
        {
          question_number: "num_el1_4",
          question_text: "Drag and drop the steps in the correct order for improving in maths.",
          question_style: "drag_and_drop",
          correct_answer: [
            "Set a goal",
            "Practice daily",
            "Ask for help when needed",
            "Check your progress",
          ],
          possible_answers: [
            "Set a goal",
            "Practice daily",
            "Ask for help when needed",
            "Check your progress",
          ],
          no_of_ans_box: 4,
          hint: "Consider the steps you'd take to improve maths. What's first, second, etc.?",
        },
        {
          question_number: "num_el1_5",
          question_text: "What should you do if you make a mistake in maths?",
          question_style: "multiple_choice_question",
          correct_answer: "Learn from it",
          possible_answers: ["Ignore it", "Learn from it", "Stop trying", "Erase everything"],
          hint: "Mistakes are opportunities to improve. What’s the best action?",
        },
        {
          question_number: "num_el1_6",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["HELP"],
          display_info: "A good way to stay motivated is to ask for ____ when you are stuck.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What do you need when you don’t understand something?",
        },
        {
          question_number: "num_el1_7",
          question_text: "What should you do after achieving a maths goal?",
          question_style: "multiple_choice_question",
          correct_answer: "Set a new goal",
          possible_answers: [
            "Stop practising",
            "Set a new goal",
            "Ignore future challenges",
            "Avoid hard problems",
          ],
          hint: "When you reach a goal, what should be the next step?",
        },
        {
          question_number: "num_el1_8",
          question_text:
            "Drag and drop the steps in the correct order for creating a maths study plan:",
          question_style: "drag_and_drop",
          correct_answer: [
            "Identify strengths",
            "Identify weaknesses",
            "Set specific goals",
            "Track progress",
          ],
          possible_answers: [
            "Identify strengths",
            "Identify weaknesses",
            "Set specific goals",
            "Track progress",
          ],
          no_of_ans_box: 4,
          hint: "Think about the logical order of setting up a plan for maths improvement.",
        },
        {
          question_number: "num_el1_9",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["IMPROVE"],
          display_info:
            "Practising maths for 15 minutes every day can help you _______ your skills.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What happens when you practice regularly?",
        },
        {
          question_number: "num_el1_10",
          question_text: "What is one way to track your maths progress?",
          question_style: "multiple_choice_question",
          correct_answer: "Keep a maths journal",
          possible_answers: [
            "Skip reviewing your work",
            "Keep a maths journal",
            "Avoid difficult problems",
            "Only focus on easy tasks",
          ],
          hint: "How can you keep track of what you’ve done and learned?",
        },
        {
          question_number: "num_el1_11",
          question_text: "What should you do if you don't understand a maths problem?",
          question_style: "multiple_choice_question",
          correct_answer: "Ask for help",
          possible_answers: ["Ignore it", "Ask for help", "Stop trying", "Guess the answer"],
          hint: "When you’re stuck, what’s the best way to get better?",
        },
        {
          question_number: "num_el1_12",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["RESULTS"],
          display_info:
            "To track your maths progress, write down your _______ after each practice session.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What do you check after completing a maths task?",
        },
      ],
      el2: [
        {
          question_number: "num_el2_1",
          question_text:
            "What should you do first when planning to improve your maths performance?",
          question_style: "multiple_choice_question",
          correct_answer: "Set a clear goal",
          possible_answers: [
            "Set a clear goal",
            "Ignore weaknesses",
            "Avoid practice",
            "Skip hard topics",
          ],
          hint: "You need to focus on what you want to improve before starting.",
        },
        {
          question_number: "num_el2_2",
          question_text: "Match the goals with their benefits.",
          question_style: "matching",
          correct_answer: {
            "Setting goals": "Helps focus on improvement",
            "Reviewing work": "Understand where to improve",
            "Asking for help": "Gain better understanding",
            "Practising regularly": "Builds skills",
          },
          options: ["Setting goals", "Reviewing work", "Asking for help", "Practising regularly"],
          answers: [
            "Helps focus on improvement",
            "Understand where to improve",
            "Gain better understanding",
            "Builds skills",
          ],
          hint: "Think about how each action helps you progress in maths.",
        },
        {
          question_number: "num_el2_3",
          question_text: "Drag and drop the steps for solving a maths problem.",
          question_style: "drag_and_drop",
          correct_answer: [
            "Understand the question",
            "Break the problem into parts",
            "Solve each part",
            "Check your answer",
          ],
          possible_answers: [
            "Understand the question",
            "Break the problem into parts",
            "Solve each part",
            "Check your answer",
          ],
          no_of_ans_box: 4,
          hint: "Think about the logical steps to approach any maths problem.",
        },
        {
          question_number: "num_el2_4",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["PROGRESS"],
          display_info: "Reviewing your past work helps you see your ________ in maths.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What do you call it when you improve over time?",
        },
        {
          question_number: "num_el2_5",
          question_text:
            "Which of the following is the best way to deal with a difficult maths problem?",
          question_style: "multiple_choice_question",
          correct_answer: "Break it into smaller parts",
          possible_answers: [
            "Skip it",
            "Break it into smaller parts",
            "Guess the answer",
            "Give up",
          ],
          hint: "Think about how to approach complex problems logically.",
        },
        {
          question_number: "num_el2_6",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["LEARNING"],
          display_info: "Practising regularly and ________ from mistakes can help you improve.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What should you do after making mistakes to improve?",
        },
        {
          question_number: "num_el2_7",
          question_text: "Match the strategies to the outcomes:",
          question_style: "matching",
          correct_answer: {
            "Set clear goals": "Focus on improvement",
            "Review regularly": "See progress over time",
            "Ask for help": "Understand difficult topics",
            "Track progress": "Monitor improvements",
          },
          options: ["Set clear goals", "Review regularly", "Ask for help", "Track progress"],
          answers: [
            "Focus on improvement",
            "See progress over time",
            "Understand difficult topics",
            "Monitor improvements",
          ],
          hint: "Think about how each strategy helps you stay on track.",
        },
        {
          question_number: "num_el2_8",
          question_text: "What should you do after setting a maths goal?",
          question_style: "multiple_choice_question",
          correct_answer: "Start practising",
          possible_answers: ["Avoid it", "Start practising", "Wait to practice", "Stop practising"],
          hint: "Once you have a clear goal, what’s the next step?",
        },
        {
          question_number: "num_el2_9",
          question_text: "Drag and drop the steps to improve your maths performance:",
          question_style: "drag_and_drop",
          correct_answer: [
            "Set a clear goal",
            "Identify weaknesses",
            "Practice regularly",
            "Check your progress",
          ],
          possible_answers: [
            "Set a clear goal",
            "Identify weaknesses",
            "Practice regularly",
            "Check your progress",
          ],
          no_of_ans_box: 4,
          hint: "Think about the logical order to improve your maths skills.",
        },
        {
          question_number: "num_el2_10",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["REALISTIC"],
          display_info: "To achieve your maths goals, you need to set _________ targets.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What type of goals should be achievable but challenging?",
        },
        {
          question_number: "num_el2_11",
          question_text: "What should you do when you reach your maths goal?",
          question_style: "multiple_choice_question",
          correct_answer: "Set a new goal",
          possible_answers: [
            "Set a new goal",
            "Stop practising",
            "Avoid challenges",
            "Ignore feedback",
          ],
          hint: "After reaching a goal, what should you do to continue improving?",
        },
        {
          question_number: "num_el2_12",
          question_text: "Match the following steps with their correct purposes:",
          question_style: "matching",
          correct_answer: {
            "Set goals": "Gives you direction",
            "Ask for help": "Gain better understanding",
            "Track progress": "Monitor improvements",
            "Practice regularly": "Builds your skills",
          },
          options: ["Set goals", "Ask for help", "Track progress", "Practice regularly"],
          answers: [
            "Gives you direction",
            "Gain better understanding",
            "Monitor improvements",
            "Builds your skills",
          ],
          hint: "Consider how each action helps you reach your maths targets.",
        },
      ],
      el3: [
        {
          question_number: "num_el3_1",
          question_text: "What is the first step to improving maths performance?",
          question_style: "multiple_choice_question",
          correct_answer: "Set clear goals",
          possible_answers: [
            "Set clear goals",
            "Avoid difficult problems",
            "Practice only what you know",
            "Stop when you make mistakes",
          ],
          hint: "You need to know what you want to improve before starting.",
        },
        {
          question_number: "num_el3_2",
          question_text: "Match the goals with their outcomes.",
          question_style: "matching",
          correct_answer: {
            "Setting goals": "Improves focus",
            "Reviewing mistakes": "Learn from errors",
            "Tracking progress": "Monitor improvement",
            "Asking for help": "Gain understanding",
          },
          options: ["Setting goals", "Reviewing mistakes", "Tracking progress", "Asking for help"],
          answers: [
            "Improves focus",
            "Learn from errors",
            "Monitor improvement",
            "Gain understanding",
          ],
          hint: "Consider how each action improves your maths skills.",
        },
        {
          question_number: "num_el3_3",
          question_text: "Fill in the blank",
          question_style: "fill_in_the_blank",
          correct_answer: ["CONFIDENCE"],
          display_info: "Practising maths regularly helps you build __________ over time.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What do you gain when you feel more capable of doing something?",
        },
        {
          question_number: "num_el3_4",
          question_text: "Drag and drop the steps to improve maths performance.",
          question_style: "drag_and_drop",
          correct_answer: [
            "Set a clear target",
            "Identify weaknesses",
            "Practice regularly",
            "Review and reflect",
          ],
          possible_answers: [
            "Set a clear target",
            "Identify weaknesses",
            "Practice regularly",
            "Review and reflect",
          ],
          no_of_ans_box: 4,
          hint: "Consider the process of identifying areas for improvement and how to address them.",
        },
        {
          question_number: "num_el3_5",
          question_text:
            "What should you do if you repeatedly make mistakes in a specific maths area?",
          question_style: "multiple_choice_question",
          correct_answer: "Identify the mistakes and adjust your strategy",
          possible_answers: [
            "Keep practising without changing your approach",
            "Ignore the mistakes",
            "Identify the mistakes and adjust your strategy",
            "Stop practising that area",
          ],
          hint: "Consider how you can learn from mistakes to improve your maths performance.",
        },
        {
          question_number: "num_el3_6",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["WEAKNESSES"],
          display_info: "Reviewing your work regularly helps you identify your __________.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What should you focus on improving over time?",
        },
        {
          question_number: "num_el3_7",
          question_text: "Match the actions with their outcomes:",
          question_style: "matching",
          correct_answer: {
            "Review mistakes": "Learn from them",
            "Set realistic goals": "Ensure steady progress",
            "Track performance": "Identify improvement areas",
            "Ask for feedback": "Gain outside perspective",
          },
          options: [
            "Review mistakes",
            "Set realistic goals",
            "Track performance",
            "Ask for feedback",
          ],
          answers: [
            "Learn from them",
            "Ensure steady progress",
            "Identify improvement areas",
            "Gain outside perspective",
          ],
          hint: "Consider how each action affects your learning process in maths.",
        },
        {
          question_number: "num_el3_8",
          question_text: "Drag and drop the correct steps to improve a weak area in maths:",
          question_style: "drag_and_drop",
          correct_answer: [
            "Identify the weak area",
            "Break it down into smaller tasks",
            "Practice each part individually",
            "Review your performance",
          ],
          possible_answers: [
            "Identify the weak area",
            "Break it down into smaller tasks",
            "Practice each part individually",
            "Review your performance",
          ],
          no_of_ans_box: 4,
          hint: "Think about the best approach to tackling a weak maths area.",
        },
        {
          question_number: "num_el3_9",
          question_text:
            "What is the best way to evaluate your maths performance after completing a series of practice exercises?",
          question_style: "multiple_choice_question",
          correct_answer: "Reflect on which exercises were easy and which were difficult",
          possible_answers: [
            "Ignore the results",
            "Reflect on which exercises were easy and which were difficult",
            "Only look at the exercises you did well on",
            "Forget about your mistakes",
          ],
          hint: "Think about how to assess your progress and areas for improvement.",
        },
        {
          question_number: "num_el3_10",
          question_text: "Fill in the blank:.",
          question_style: "fill_in_the_blank",
          correct_answer: ["MEASURABLE"],
          display_info:
            "Setting __________ goals helps you stay on track and measure success in mathematics.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What kind of goals allow you to see clear progress?",
        },
        {
          question_number: "num_el3_11",
          question_text: "Match the following actions with their purposes:",
          question_style: "matching",
          correct_answer: {
            "Set goals": "Provides direction for improvement",
            "Reflect on mistakes": "Helps you learn from errors",
            "Ask for feedback": "Provides external perspective",
            "Track progress": "Allows you to see improvement over time",
          },
          options: ["Set goals", "Reflect on mistakes", "Ask for feedback", "Track progress"],
          answers: [
            "Provides direction for improvement",
            "Helps you learn from errors",
            "Provides external perspective",
            "Allows you to see improvement over time",
          ],
          hint: "Think about how each action helps you improve your maths skills.",
        },
        {
          question_number: "num_el3_12",
          question_text: "What should you do when you reach your maths goal?",
          question_style: "multiple_choice_question",
          correct_answer: "Set a new goal",
          possible_answers: [
            "Set a new goal",
            "Stop practising",
            "Avoid difficult problems",
            "Ignore further challenges",
          ],
          hint: "To continue improving, what is the next logical step after achieving a goal?",
        },
        {
          question_number: "num_el3_13",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["PERFORMANCE"],
          display_info:
            "Reviewing your ___________ regularly helps you identify areas for improvement and plan your next steps.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What do you evaluate after each practice session?",
        },
        {
          question_number: "num_el3_14",
          question_text:
            "Which of the following strategies will help you continue improving in maths?",
          question_style: "multiple_choice_question",
          correct_answer: "Setting specific and achievable goals",
          possible_answers: [
            "Skipping difficult problems",
            "Setting specific and achievable goals",
            "Avoiding feedback",
            "Practising the same problems repeatedly",
          ],
          hint: "What kind of goals help you make continuous progress?",
        },
        {
          question_number: "num_el3_15",
          question_text: "Drag and drop the correct steps for evaluating your progress in maths:",
          question_style: "drag_and_drop",
          correct_answer: [
            "Review your recent work",
            "Identify areas where you struggled",
            "Adjust your study plan",
            "Set new goals based on your performance",
          ],
          possible_answers: [
            "Review your recent work",
            "Identify areas where you struggled",
            "Adjust your study plan",
            "Set new goals based on your performance",
          ],
          no_of_ans_box: 4,
          hint: "Think about how you can evaluate your work and plan for future improvement.",
        },
      ],
    },
  },
  week2: {
    activeDate: "2024-11-07",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week3: {
    activeDate: "2024-11-18",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week4: {
    activeDate: "2024-11-25",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week5: {
    activeDate: "2024-12-02",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week6: {
    activeDate: "2024-12-09",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week7: {
    activeDate: "2024-12-16",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week8: {
    activeDate: "2025-01-06",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week9: {
    activeDate: "2025-01-13",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week10: {
    activeDate: "2025-01-20",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week11: {
    activeDate: "2025-01-27",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
  week12: {
    activeDate: "2025-02-03",
    allQuestions: {
      el1: [],
      el2: [],
      el3: [],
      l1: [],
      l2: [],
    },
  },
};

export const GAME_DATA_LIT: QuizQuestions = {
  week1: {
    activeDate: "2024-10-31", // First week already available
    allQuestions: {
      el1: [
        {
          question_number: "lit_el3_4",
          question_text: "Match each action with its purpose.",
          question_style: "matching",
          correct_answer: {
            "Setting measurable goals": "Keep progress clear",
            "Reviewing feedback": "Identify areas for growth",
            "Practicing regularly": "Build confidence",
            "Celebrating successes": "Stay motivated",
          },
          options: [
            "Setting measurable goals",
            "Reviewing feedback",
            "Practicing regularly",
            "Celebrating successes",
          ],
          answers: [
            "Keep progress clear",
            "Identify areas for growth",
            "Build confidence",
            "Stay motivated",
          ],
          hint: "Think about how each action contributes to your growth.",
        },
        {
          question_number: "lit_el1_1",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["GOAL"],
          display_info: "Setting a ____ helps you focus on what you want to achieve in English.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What do you set when you have something you want to accomplish?",
        },
        {
          question_number: "lit_el1_2",
          question_text: "Which of the following is an example of a specific English goal?",
          question_style: "multiple_choice_question",
          correct_answer: "Learn five new words this week",
          possible_answers: [
            "Get better at everything",
            "Learn five new words this week",
            "Avoid reading difficult texts",
            "Ignore feedback",
          ],
          hint: "A good goal is clear and measurable.",
        },
        {
          question_number: "lit_el1_3",
          question_text: "Match each action with its purpose.",
          question_style: "matching",
          correct_answer: {
            "Setting goals": "Focus your learning",
            "Practicing regularly": "Improve over time",
            "Tracking progress": "See how much you’ve learned",
            "Asking for feedback": "Gain helpful advice",
          },
          options: [
            "Setting goals",
            "Practicing regularly",
            "Tracking progress",
            "Asking for feedback",
          ],
          answers: [
            "Focus your learning",
            "Improve over time",
            "See how much you’ve learned",
            "Gain helpful advice",
          ],
          hint: "Think about what each action helps you achieve.",
        },
        {
          question_number: "lit_el1_4",
          question_text: "How often should you practice your English to see improvement?",
          question_style: "multiple_choice_question",
          correct_answer: "A few times a week",
          possible_answers: [
            "Once a month",
            "Only when you feel like it",
            "A few times a week",
            "Never",
          ],
          hint: "Regular practice builds skills over time.",
        },
        {
          question_number: "lit_el1_5",
          question_text:
            "Drag and drop the steps in the correct order for creating an English study plan.",
          question_style: "drag_and_drop",
          correct_answer: [
            "Set a goal",
            "Make a practice schedule",
            "Track your progress",
            "Reflect on what you've learned",
          ],
          possible_answers: [
            "Set a goal",
            "Make a practice schedule",
            "Track your progress",
            "Reflect on what you've learned",
          ],
          no_of_ans_box: 4,
          hint: "Start with your goal, then plan how to reach it.",
        },
        {
          question_number: "lit_el1_6",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["HELP"],
          display_info:
            "Asking for ____ when you don’t understand something can help you improve faster.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What do you need when you’re not sure about something?",
        },
        {
          question_number: "lit_el1_7",
          question_text: "Match each benefit with the related action.",
          question_style: "matching",
          correct_answer: {
            "Practice regularly": "Improves skills",
            "Ask for feedback": "Learn what to improve",
            "Set clear goals": "Focus your learning",
            "Review progress": "See how far you've come",
          },
          options: ["Practice regularly", "Ask for feedback", "Set clear goals", "Review progress"],
          answers: [
            "Improves skills",
            "Learn what to improve",
            "Focus your learning",
            "See how far you've come",
          ],
          hint: "Each action helps you grow in English differently.",
        },
        {
          question_number: "lit_el1_8",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["IMPROVEMENT"],
          display_info: "Tracking your progress helps you see your ___________ over time.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What happens when you get better at something?",
        },
        {
          question_number: "lit_el1_9",
          question_text: "Drag and drop to complete your progress review.",
          question_style: "drag_and_drop",
          correct_answer: [
            "Look at your old work",
            "Identify what you’ve learned",
            "Decide on new areas to improve",
          ],
          possible_answers: [
            "Look at your old work",
            "Identify what you’ve learned",
            "Decide on new areas to improve",
          ],
          no_of_ans_box: 3,
          hint: "Review, assess, and plan.",
        },
        {
          question_number: "lit_el1_10",
          question_text: "Which of the following is a way to stay motivated in learning English?",
          question_style: "multiple_choice_question",
          correct_answer: "Celebrate small successes",
          possible_answers: [
            "Celebrate small successes",
            "Ignore feedback",
            "Avoid challenging tasks",
            "Only focus on what you already know",
          ],
          hint: "Acknowledge progress to stay encouraged.",
        },
        {
          question_number: "lit_el1_11",
          question_text: "Match each type of feedback with its purpose.",
          question_style: "matching",
          correct_answer: {
            "Positive feedback": "Reinforces good habits",
            "Constructive feedback": "Helps improve weak areas",
            "Goal setting": "Gives direction",
            "Reviewing progress": "Tracks improvement",
          },
          options: [
            "Positive feedback",
            "Constructive feedback",
            "Goal setting",
            "Reviewing progress",
          ],
          answers: [
            "Reinforces good habits",
            "Helps improve weak areas",
            "Gives direction",
            "Tracks improvement",
          ],
          hint: "Think about how each type helps you grow.",
        },
        {
          question_number: "lit_el1_12",
          question_text: "When should you set a new English goal?",
          question_style: "multiple_choice_question",
          correct_answer: "Once you've achieved your current goal",
          possible_answers: [
            "Once you've achieved your current goal",
            "When you feel discouraged",
            "Everyday",
            "When you’re out of practice ideas",
          ],
          hint: "Achieving one goal can lead to setting the next.",
        },
      ],
      el2: [
        {
          question_number: "lit_el2_1",
          question_text: "What’s the first step to improving English skills?",
          question_style: "multiple_choice_question",
          correct_answer: "Set a clear goal",
          possible_answers: [
            "Set a clear goal",
            "Avoid practice",
            "Skip challenging tasks",
            "Pick a difficult book and start attempting to read it",
          ],
          hint: "Think about what guides your learning.",
        },
        {
          question_number: "lit_el2_2",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["PROGRESS"],
          display_info: "Reviewing your past work helps you see your ________ in English.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What is another word for improvement over time?",
        },
        {
          question_number: "lit_el2_3",
          question_text: "How do you measure progress in English?",
          question_style: "multiple_choice_question",
          correct_answer: "Check what you have improved on",
          possible_answers: [
            "Skip reviewing your work",
            "Check what you have improved on",
            "Don’t ask for feedback",
            "Guess on your progress",
          ],
          hint: "Assessing your learning helps you see growth.",
        },
        {
          question_number: "lit_el2_4",
          question_text: "Match each action with its purpose.",
          question_style: "matching",
          correct_answer: {
            "Setting goals": "Focus on improvement",
            "Reviewing work": "See where you need help",
            "Asking for feedback": "Get suggestions",
            "Practicing regularly": "Build skills over time",
          },
          options: [
            "Setting goals",
            "Reviewing work",
            "Asking for feedback",
            "Practicing regularly",
          ],
          answers: [
            "Focus on improvement",
            "See where you need help",
            "Get suggestions",
            "Build skills over time",
          ],
          hint: "Each action serves a different purpose.",
        },
        {
          question_number: "lit_el2_5",
          question_text: "Drag and drop the steps for improving a weak area in English.",
          question_style: "drag_and_drop",
          correct_answer: [
            "Identify the weak area",
            "Make a plan",
            "Practice that skill",
            "Review your progress",
          ],
          possible_answers: [
            "Identify the weak area",
            "Make a plan",
            "Practice that skill",
            "Review your progress",
          ],
          no_of_ans_box: 4,
          hint: "Work step-by-step to focus on improvement.",
        },
        {
          question_number: "lit_el2_6",
          question_text: "Which of these helps you stay on track with English goals?",
          question_style: "multiple_choice_question",
          correct_answer: "Keep a journal",
          possible_answers: [
            "Keep a journal",
            "Skip practice",
            "Only look at the topics you are struggling with",
            "Focus only on strengths",
          ],
          hint: "Writing down thoughts helps track progress.",
        },
        {
          question_number: "lit_el2_7",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["REGULARLY"],
          display_info: "One way to improve is to practice English _________.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "Consistency is key.",
        },
        {
          question_number: "lit_el2_8",
          question_text: "How do you identify an achievable goal?",
          question_style: "multiple_choice_question",
          correct_answer: "Make a list of the topics you find challenging",
          possible_answers: [
            "Focus on a topic you find difficult",
            "Practise a topic you feel confident about",
            "Make a list of the topics you find challenging",
            "Avoid challenges",
          ],
          hint: "You need to make a clear path to reach your goal.",
        },
        {
          question_number: "lit_el2_9",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["FOCUS"],
          display_info: "Reviewing feedback helps you _____ on what to improve.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What helps guide your attention?",
        },
        {
          question_number: "lit_el2_10",
          question_text: "Order the steps for reviewing progress.",
          question_style: "drag_and_drop",
          correct_answer: ["Review past work", "Note improvements", "Set a new goal"],

          possible_answers: ["Review past work", "Note improvements", "Set a new goal"],
          no_of_ans_box: 3,
          hint: "Reflect, then plan.",
        },
        {
          question_number: "lit_el2_11",
          question_text: "Which of these is a benefit of setting clear goals?",
          question_style: "multiple_choice_question",
          correct_answer: "Gives focus",
          possible_answers: [
            "Gives focus",
            "Causes stress",
            "Makes things harder",
            "Avoids challenges",
          ],
          hint: "Goals clarify your purpose.",
        },
        {
          question_number: "lit_el2_12",
          question_text: "Match each goal type with its focus.",
          question_style: "matching",
          correct_answer: {
            "Skill-based": "Improve vocabulary",
            "Knowledge-based": "Learn grammar rules",
            Fluency: "Practice speaking",
            Comprehension: "Understand complex texts",
          },
          options: ["Skill-based", "Knowledge-based", "Fluency", "Comprehension"],
          answers: [
            "Improve vocabulary",
            "Learn grammar rules",
            "Practice speaking",
            "Understand complex texts",
          ],
          hint: "Think about what each goal helps you improve.",
        },
        {
          question_number: "lit_el2_13",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["IMPROVEMENT"],
          display_info:
            "Practicing English for 15 minutes each day can help you see ___________ over time.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "Regular practice leads to gradual progress.",
        },
        {
          question_number: "lit_el2_14",
          question_text: "When should you review your English goals?",
          question_style: "multiple_choice_question",
          correct_answer: "Every time you finish a major task",
          possible_answers: [
            "Every time you finish a major task",
            "Only when you struggle",
            "Once a year",
            "Whenever you feel like it",
          ],
          hint: "Regularly checking goals helps keep you on track.",
        },
      ],
      el3: [
        {
          question_number: "lit_el3_1",
          question_text: "What is the first step to planning your progress in English?",
          question_style: "multiple_choice_question",
          correct_answer: "Identify strengths and weaknesses",
          possible_answers: [
            "Identify strengths and weaknesses",
            "Avoid challenging areas",
            "Wait until you’re fluent",
            "Only focus on grammar",
          ],
          hint: "Knowing where you’re strong and where you can improve is essential.",
        },
        {
          question_number: "lit_el3_2",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["MEASURABLE"],
          display_info:
            "Setting __________ goals in English can help you focus on specific areas to improve.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "Goals that can be tracked are often clearer.",
        },
        {
          question_number: "lit_el3_3",
          question_text: "Which of these is an effective way to track your English progress?",
          question_style: "multiple_choice_question",
          correct_answer: "Reviewing work weekly",
          possible_answers: [
            "Reviewing work weekly",
            "Avoiding feedback",
            "Only looking at finished assignments",
            "Ignoring past mistakes",
          ],
          hint: "Consistent review helps you identify improvement.",
        },
        {
          question_number: "lit_el3_4",
          question_text: "Match each action with its purpose.",
          question_style: "matching",
          correct_answer: {
            "Setting measurable goals": "Keep progress clear",
            "Reviewing feedback": "Identify areas for growth",
            "Practicing regularly": "Build confidence",
            "Celebrating successes": "Stay motivated",
          },
          options: [
            "Setting measurable goals",
            "Reviewing feedback",
            "Practicing regularly",
            "Celebrating successes",
          ],
          answers: [
            "Keep progress clear",
            "Identify areas for growth",
            "Build confidence",
            "Stay motivated",
          ],
          hint: "Think about how each action contributes to your growth.",
        },
        {
          question_number: "lit_el3_5",
          question_text: "Arrange the steps for improving a specific area in English.",
          question_style: "drag_and_drop",
          correct_answer: [
            "Identify the area for improvement",
            "Set a clear goal",
            "Create a practice plan",
            "Review progress after a month",
          ],
          possible_answers: [
            "Identify the area for improvement",
            "Set a clear goal",
            "Create a practice plan",
            "Review progress after a month",
          ],
          no_of_ans_box: 4,
          hint: "Start with identifying needs, then set a goal.",
        },
        {
          question_number: "lit_el3_6",
          question_text: "Which of these activities can help with setting future English goals?",
          question_style: "multiple_choice_question",
          correct_answer: "Reflecting on past challenges",
          possible_answers: [
            "Reflecting on past challenges",
            "Ignoring past mistakes",
            "Only focusing on successes",
            "Avoiding difficult topics",
          ],
          hint: "Understanding past experiences can shape new goals.",
        },
        {
          question_number: "lit_el3_7",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["CONSTRUCTIVE"],
          display_info:
            "One way to improve in English is to seek ____________ feedback from others.",

          num_of_text_box: 1,
          capitalisation: false,
          hint: "What type of feedback helps you improve by offering helpful advice?",
        },
        {
          question_number: "lit_el3_8",
          question_text: "What should you do if you achieve an English goal ahead of time?",
          question_style: "multiple_choice_question",
          correct_answer: "Set a new goal",
          possible_answers: [
            "Set a new goal",
            "Stop practising",
            "Ignore further progress",
            "Only practice what’s easy",
          ],
          hint: "Continuing with new goals leads to more improvement.",
        },
        {
          question_number: "lit_el3_9",
          question_text: "Match the benefit with the related action.",
          question_style: "matching",
          correct_answer: {
            "Setting goals": "Keeps you focused",
            "Asking for feedback": "Gives you helpful insights",
            "Tracking progress": "Shows improvement over time",
            "Celebrating successes": "Maintains motivation",
          },
          options: [
            "Setting goals",
            "Asking for feedback",
            "Tracking progress",
            "Celebrating successes",
          ],
          answers: [
            "Keeps you focused",
            "Gives you helpful insights",
            "Shows improvement over time",
            "Maintains motivation",
          ],
          hint: "Each action supports growth differently.",
        },
        {
          question_number: "lit_el3_10",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["IMPROVE"],
          display_info: "Reviewing your progress helps you see where you need to _______.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "Think about what helps you identify areas for growth.",
        },
        {
          question_number: "lit_el3_11",
          question_text: "Arrange the steps for reviewing and adjusting your English goals.",
          question_style: "drag_and_drop",
          correct_answer: [
            "Reflect on your progress",
            "Identify areas to work on",
            "Set new goals",
            "Track results over time",
          ],
          possible_answers: [
            "Reflect on your progress",
            "Identify areas to work on",
            "Set new goals",
            "Track results over time",
          ],
          no_of_ans_box: 4,
          hint: "Reflecting helps guide new goals.",
        },
        {
          question_number: "lit_el3_12",
          question_text:
            "Which of the following is a positive outcome of reviewing your English progress?",
          question_style: "multiple_choice_question",
          correct_answer: "Identifying strengths and areas for improvement",
          possible_answers: [
            "Identifying strengths and areas for improvement",
            "Ignoring past accomplishments",
            "Focusing only on mistakes",
            "Avoiding new goals",
          ],
          hint: "Reflection provides insights on what you’ve achieved and what to work on.",
        },

        {
          question_number: "lit_el3_13",
          question_text: "Match the following types of goals with their benefits.",
          question_style: "matching",
          correct_answer: {
            "Vocabulary goals": "Broaden your language use",
            "Reading comprehension": "Understand complex texts",
            "Writing skills": "Communicate ideas clearly",
            "Listening goals": "Improve understanding in conversations",
          },
          options: [
            "Vocabulary goals",
            "Reading comprehension",
            "Writing skills",
            "Listening goals",
          ],
          answers: [
            "Broaden your language use",
            "Understand complex texts",
            "Communicate ideas clearly",
            "Improve understanding in conversations",
          ],
          hint: "Each goal type develops a different skill.",
        },
        {
          question_number: "lit_el3_14",
          question_text: "Fill in the blank:",
          question_style: "fill_in_the_blank",
          correct_answer: ["CONFIDENCE"],
          display_info:
            "Practicing English consistently will help you gain more __________ in using the language.",
          num_of_text_box: 1,
          capitalisation: false,
          hint: "What grows as you feel more comfortable with English?",
        },
        {
          question_number: "lit_el3_15",
          question_text: "How can celebrating small successes help you with your English learning?",
          question_style: "multiple_choice_question",
          correct_answer: "It keeps you motivated",
          possible_answers: [
            "It keeps you motivated",
            "It makes you ignore mistakes",
            "It prevents future practice",
            "It causes you to focus only on easy tasks",
          ],
          hint: "Acknowledging progress keeps you moving forward.",
        },
      ],
    },
  },
};
