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
    activeDate: "2024-09-01", // First week already available
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
        // {
        //   question_number: "num_el1_2",
        //   question_text: "Match the steps with their correct actions.",
        //   question_style: "matching",
        //   correct_answer: {
        //     "Practice regularly": "Improves over time",
        //     "Ask for help": "Get support when stuck",
        //     "Set goals": "Gives direction",
        //     "Review work": "Understand what you know",
        //   },
        //   options: ["Practice regularly", "Ask for help", "Set goals", "Review work"],
        //   answers: [
        //     "Improves over time",
        //     "Get support when stuck",
        //     "Gives direction",
        //     "Understand what you know",
        //   ],
        //   hint: "Think about what each action helps you achieve when improving your maths skills.",
        // },
        // {
        //   question_number: "num_el1_3",
        //   question_text: "Fill in the blank:",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["GOALS"],
        //   display_info:
        //     "To improve your maths performance, you should set clear _____ for yourself.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What do you set when you want to achieve something specific?",
        // },
        // {
        //   question_number: "num_el1_4",
        //   question_text: "Drag and drop the steps in the correct order for improving in maths.",
        //   question_style: "drag_and_drop",
        //   correct_answer: [
        //     "Set a goal",
        //     "Practice daily",
        //     "Ask for help when needed",
        //     "Check your progress",
        //   ],
        //   possible_answers: [
        //     "Set a goal",
        //     "Practice daily",
        //     "Ask for help when needed",
        //     "Check your progress",
        //   ],
        //   no_of_ans_box: 4,
        //   hint: "Consider the steps you'd take to improve maths. What's first, second, etc.?",
        // },
        {
          question_number: "num_el1_5",
          question_text: "What should you do if you make a mistake in maths?",
          question_style: "multiple_choice_question",
          correct_answer: "Learn from it",
          possible_answers: ["Ignore it", "Learn from it", "Stop trying", "Erase everything"],
          hint: "Mistakes are opportunities to improve. What’s the best action?",
        },
        // {
        //   question_number: "num_el1_6",
        //   question_text: "Fill in the blank:",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["HELP"],
        //   display_info: "A good way to stay motivated is to ask for ____ when you are stuck.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What do you need when you don’t understand something?",
        // },
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
        // {
        //   question_number: "num_el1_8",
        //   question_text:
        //     "Drag and drop the steps in the correct order for creating a maths study plan:",
        //   question_style: "drag_and_drop",
        //   correct_answer: [
        //     "Identify strengths",
        //     "Identify weaknesses",
        //     "Set specific goals",
        //     "Track progress",
        //   ],
        //   possible_answers: [
        //     "Identify strengths",
        //     "Identify weaknesses",
        //     "Set specific goals",
        //     "Track progress",
        //   ],
        //   no_of_ans_box: 4,
        //   hint: "Think about the logical order of setting up a plan for maths improvement.",
        // },
        // {
        //   question_number: "num_el1_9",
        //   question_text: "Fill in the blank:",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["IMPROVE"],
        //   display_info:
        //     "Practising maths for 15 minutes every day can help you _______ your skills.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What happens when you practice regularly?",
        // },
        // {
        //   question_number: "num_el1_10",
        //   question_text: "What is one way to track your maths progress?",
        //   question_style: "multiple_choice_question",
        //   correct_answer: "Keep a maths journal",
        //   possible_answers: [
        //     "Skip reviewing your work",
        //     "Keep a maths journal",
        //     "Avoid difficult problems",
        //     "Only focus on easy tasks",
        //   ],
        //   hint: "How can you keep track of what you’ve done and learned?",
        // },
        // {
        //   question_number: "num_el1_11",
        //   question_text: "What should you do if you don't understand a maths problem?",
        //   question_style: "multiple_choice_question",
        //   correct_answer: "Ask for help",
        //   possible_answers: ["Ignore it", "Ask for help", "Stop trying", "Guess the answer"],
        //   hint: "When you’re stuck, what’s the best way to get better?",
        // },
        // {
        //   question_number: "num_el1_12",
        //   question_text: "Fill in the blank:",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["RESULTS"],
        //   display_info:
        //     "To track your maths progress, write down your _______ after each practice session.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What do you check after completing a maths task?",
        // },
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
        // {
        //   question_number: "num_el2_2",
        //   question_text: "Match the goals with their benefits.",
        //   question_style: "matching",
        //   correct_answer: {
        //     "Setting goals": "Helps focus on improvement",
        //     "Reviewing work": "Understand where to improve",
        //     "Asking for help": "Gain better understanding",
        //     "Practising regularly": "Builds skills",
        //   },
        //   options: ["Setting goals", "Reviewing work", "Asking for help", "Practising regularly"],
        //   answers: [
        //     "Helps focus on improvement",
        //     "Understand where to improve",
        //     "Gain better understanding",
        //     "Builds skills",
        //   ],
        //   hint: "Think about how each action helps you progress in maths.",
        // },
        // {
        //   question_number: "num_el2_3",
        //   question_text: "Drag and drop the steps for solving a maths problem.",
        //   question_style: "drag_and_drop",
        //   correct_answer: [
        //     "Understand the question",
        //     "Break the problem into parts",
        //     "Solve each part",
        //     "Check your answer",
        //   ],
        //   possible_answers: [
        //     "Understand the question",
        //     "Break the problem into parts",
        //     "Solve each part",
        //     "Check your answer",
        //   ],
        //   no_of_ans_box: 4,
        //   hint: "Think about the logical steps to approach any maths problem.",
        // },
        // {
        //   question_number: "num_el2_4",
        //   question_text: "Fill in the blank:",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["PROGRESS"],
        //   display_info: "Reviewing your past work helps you see your ________ in maths.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What do you call it when you improve over time?",
        // },
        // {
        //   question_number: "num_el2_5",
        //   question_text:
        //     "Which of the following is the best way to deal with a difficult maths problem?",
        //   question_style: "multiple_choice_question",
        //   correct_answer: "Break it into smaller parts",
        //   possible_answers: [
        //     "Skip it",
        //     "Break it into smaller parts",
        //     "Guess the answer",
        //     "Give up",
        //   ],
        //   hint: "Think about how to approach complex problems logically.",
        // },
        // {
        //   question_number: "num_el2_6",
        //   question_text: "Fill in the blank:",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["LEARNING"],
        //   display_info: "Practising regularly and ________ from mistakes can help you improve.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What should you do after making mistakes to improve?",
        // },
        // {
        //   question_number: "num_el2_7",
        //   question_text: "Match the strategies to the outcomes:",
        //   question_style: "matching",
        //   correct_answer: {
        //     "Set clear goals": "Focus on improvement",
        //     "Review regularly": "See progress over time",
        //     "Ask for help": "Understand difficult topics",
        //     "Track progress": "Monitor improvements",
        //   },
        //   options: ["Set clear goals", "Review regularly", "Ask for help", "Track progress"],
        //   answers: [
        //     "Focus on improvement",
        //     "See progress over time",
        //     "Understand difficult topics",
        //     "Monitor improvements",
        //   ],
        //   hint: "Think about how each strategy helps you stay on track.",
        // },
        {
          question_number: "num_el2_8",
          question_text: "What should you do after setting a maths goal?",
          question_style: "multiple_choice_question",
          correct_answer: "Start practising",
          possible_answers: ["Avoid it", "Start practising", "Wait to practice", "Stop practising"],
          hint: "Once you have a clear goal, what’s the next step?",
        },
        // {
        //   question_number: "num_el2_9",
        //   question_text: "Drag and drop the steps to improve your maths performance:",
        //   question_style: "drag_and_drop",
        //   correct_answer: [
        //     "Set a clear goal",
        //     "Identify weaknesses",
        //     "Practice regularly",
        //     "Check your progress",
        //   ],
        //   possible_answers: [
        //     "Set a clear goal",
        //     "Identify weaknesses",
        //     "Practice regularly",
        //     "Check your progress",
        //   ],
        //   no_of_ans_box: 4,
        //   hint: "Think about the logical order to improve your maths skills.",
        // },
        // {
        //   question_number: "num_el2_10",
        //   question_text: "Fill in the blank:",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["REALISTIC"],
        //   display_info: "To achieve your maths goals, you need to set _________ targets.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What type of goals should be achievable but challenging?",
        // },
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
        // {
        //   question_number: "num_el2_12",
        //   question_text: "Match the following steps with their correct purposes:",
        //   question_style: "matching",
        //   correct_answer: {
        //     "Set goals": "Gives you direction",
        //     "Ask for help": "Gain better understanding",
        //     "Track progress": "Monitor improvements",
        //     "Practice regularly": "Builds your skills",
        //   },
        //   options: ["Set goals", "Ask for help", "Track progress", "Practice regularly"],
        //   answers: [
        //     "Gives you direction",
        //     "Gain better understanding",
        //     "Monitor improvements",
        //     "Builds your skills",
        //   ],
        //   hint: "Consider how each action helps you reach your maths targets.",
        // },
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
        // {
        //   question_number: "num_el3_2",
        //   question_text: "Match the goals with their outcomes.",
        //   question_style: "matching",
        //   correct_answer: {
        //     "Setting goals": "Improves focus",
        //     "Reviewing mistakes": "Learn from errors",
        //     "Tracking progress": "Monitor improvement",
        //     "Asking for help": "Gain understanding",
        //   },
        //   options: ["Setting goals", "Reviewing mistakes", "Tracking progress", "Asking for help"],
        //   answers: [
        //     "Improves focus",
        //     "Learn from errors",
        //     "Monitor improvement",
        //     "Gain understanding",
        //   ],
        //   hint: "Consider how each action improves your maths skills.",
        // },
        // {
        //   question_number: "num_el3_3",
        //   question_text: "Fill in the blank",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["CONFIDENCE"],
        //   display_info: "Practising maths regularly helps you build __________ over time.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What do you gain when you feel more capable of doing something?",
        // },
        // {
        //   question_number: "num_el3_4",
        //   question_text: "Drag and drop the steps to improve maths performance.",
        //   question_style: "drag_and_drop",
        //   correct_answer: [
        //     "Set a clear target",
        //     "Identify weaknesses",
        //     "Practice regularly",
        //     "Review and reflect",
        //   ],
        //   possible_answers: [
        //     "Set a clear target",
        //     "Identify weaknesses",
        //     "Practice regularly",
        //     "Review and reflect",
        //   ],
        //   no_of_ans_box: 4,
        //   hint: "Consider the process of identifying areas for improvement and how to address them.",
        // },
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
        // {
        //   question_number: "num_el3_6",
        //   question_text: "Fill in the blank:",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["WEAKNESSES"],
        //   display_info: "Reviewing your work regularly helps you identify your __________.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What should you focus on improving over time?",
        // },
        // {
        //   question_number: "num_el3_7",
        //   question_text: "Match the actions with their outcomes:",
        //   question_style: "matching",
        //   correct_answer: {
        //     "Review mistakes": "Learn from them",
        //     "Set realistic goals": "Ensure steady progress",
        //     "Track performance": "Identify improvement areas",
        //     "Ask for feedback": "Gain outside perspective",
        //   },
        //   options: [
        //     "Review mistakes",
        //     "Set realistic goals",
        //     "Track performance",
        //     "Ask for feedback",
        //   ],
        //   answers: [
        //     "Learn from them",
        //     "Ensure steady progress",
        //     "Identify improvement areas",
        //     "Gain outside perspective",
        //   ],
        //   hint: "Consider how each action affects your learning process in maths.",
        // },
        // {
        //   question_number: "num_el3_8",
        //   question_text: "Drag and drop the correct steps to improve a weak area in maths:",
        //   question_style: "drag_and_drop",
        //   correct_answer: [
        //     "Identify the weak area",
        //     "Break it down into smaller tasks",
        //     "Practice each part individually",
        //     "Review your performance",
        //   ],
        //   possible_answers: [
        //     "Identify the weak area",
        //     "Break it down into smaller tasks",
        //     "Practice each part individually",
        //     "Review your performance",
        //   ],
        //   no_of_ans_box: 4,
        //   hint: "Think about the best approach to tackling a weak maths area.",
        // },
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
        // {
        //   question_number: "num_el3_10",
        //   question_text: "Fill in the blank:.",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["MEASURABLE"],
        //   display_info:
        //     "Setting __________ goals helps you stay on track and measure success in mathematics.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What kind of goals allow you to see clear progress?",
        // },
        // {
        //   question_number: "num_el3_11",
        //   question_text: "Match the following actions with their purposes:",
        //   question_style: "matching",
        //   correct_answer: {
        //     "Set goals": "Provides direction for improvement",
        //     "Reflect on mistakes": "Helps you learn from errors",
        //     "Ask for feedback": "Provides external perspective",
        //     "Track progress": "Allows you to see improvement over time",
        //   },
        //   options: ["Set goals", "Reflect on mistakes", "Ask for feedback", "Track progress"],
        //   answers: [
        //     "Provides direction for improvement",
        //     "Helps you learn from errors",
        //     "Provides external perspective",
        //     "Allows you to see improvement over time",
        //   ],
        //   hint: "Think about how each action helps you improve your maths skills.",
        // },
        // {
        //   question_number: "num_el3_12",
        //   question_text: "What should you do when you reach your maths goal?",
        //   question_style: "multiple_choice_question",
        //   correct_answer: "Set a new goal",
        //   possible_answers: [
        //     "Set a new goal",
        //     "Stop practising",
        //     "Avoid difficult problems",
        //     "Ignore further challenges",
        //   ],
        //   hint: "To continue improving, what is the next logical step after achieving a goal?",
        // },
        // {
        //   question_number: "num_el3_13",
        //   question_text: "Fill in the blank:",
        //   question_style: "fill_in_the_blank",
        //   correct_answer: ["PERFORMANCE"],
        //   display_info:
        //     "Reviewing your ___________ regularly helps you identify areas for improvement and plan your next steps.",
        //   num_of_text_box: 1,
        //   capitalisation: false,
        //   hint: "What do you evaluate after each practice session?",
        // },
        // {
        //   question_number: "num_el3_14",
        //   question_text:
        //     "Which of the following strategies will help you continue improving in maths?",
        //   question_style: "multiple_choice_question",
        //   correct_answer: "Setting specific and achievable goals",
        //   possible_answers: [
        //     "Skipping difficult problems",
        //     "Setting specific and achievable goals",
        //     "Avoiding feedback",
        //     "Practising the same problems repeatedly",
        //   ],
        //   hint: "What kind of goals help you make continuous progress?",
        // },
        // {
        //   question_number: "num_el3_15",
        //   question_text: "Drag and drop the correct steps for evaluating your progress in maths:",
        //   question_style: "drag_and_drop",
        //   correct_answer: [
        //     "Review your recent work",
        //     "Identify areas where you struggled",
        //     "Adjust your study plan",
        //     "Set new goals based on your performance",
        //   ],
        //   possible_answers: [
        //     "Review your recent work",
        //     "Identify areas where you struggled",
        //     "Adjust your study plan",
        //     "Set new goals based on your performance",
        //   ],
        //   no_of_ans_box: 4,
        //   hint: "Think about how you can evaluate your work and plan for future improvement.",
        // },
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

export const GAME_DATA_LIT: QuizQuestions = {};
