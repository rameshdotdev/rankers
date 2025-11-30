import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ExamCard {
  id: string;
  title: string;
  code: string;
  difficulty: "LOW" | "MED" | "HIGH" | "CRITICAL";
  participants: number;
  status: "ACTIVE" | "LOCKED" | "MAINTENANCE";
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export enum ViewState {
  LANDING = "LANDING",
  DASHBOARD = "DASHBOARD",
  RUNNER = "RUNNER",
  RESULT = "RESULT",
}

export interface TerminalLog {
  type: "input" | "output" | "system";
  content: string;
  timestamp: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  selectedExams?: string[]; // Array of Exam IDs
}

export interface RecommendedItem {
  id: string;
  title: string;
  type: "PYQ" | "MOCK" | "DRILL";
  examId: string;
  difficulty: string;
  time: string;
}

export interface TestResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unattempted: number;
  score: number; // Percentage
  accuracy: number; // Percentage
  timeTaken: number; // Seconds
}

export enum QuestionStatus {
  NOT_VISITED = "NOT_VISITED",
  NOT_ANSWERED = "NOT_ANSWERED",
  ANSWERED = "ANSWERED",
  MARKED_FOR_REVIEW = "MARKED_FOR_REVIEW",
  ANSWERED_AND_MARKED = "ANSWERED_AND_MARKED",
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  section: string;
  type?: "MCQ" | "COMPREHENSION";
  passage?: string;
  positiveMarks: number;
  negativeMarks: number;
}

export type TabType =
  | "OVERVIEW"
  | "TARGETS"
  | "TEST_SERIES"
  | "PYQ"
  | "PRACTICE"
  | "ANALYTICS"
  | "SETTINGS";
