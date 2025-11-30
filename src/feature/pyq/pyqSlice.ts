import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PyqSection {
  name: string;
  icon: "LANG" | "GS" | "SUB";
}

export interface PyqPaper {
  id: string;
  title: string;
  examCategory: string;
  classLevel: string;
  date: string;
  shift?: string;
  setNumber: string;
  sections: PyqSection[];
  status: "AVAILABLE" | "LOCKED";
}

const PYQ_DATA: PyqPaper[] = [
  {
    id: "pyq-20",
    title: "Computer Science (Paper-III) Solved Paper",
    examCategory: "BPSC TRE 3.0",
    classLevel: "Class 09-10",
    date: "22.07.2024",
    shift: "Shift-II",
    setNumber: "SET-20",
    sections: [
      { name: "Part-I: Language", icon: "LANG" },
      { name: "Part-II: General Studies", icon: "GS" },
      { name: "Part-III: Computer Science", icon: "SUB" },
    ],
    status: "AVAILABLE",
  },
  {
    id: "pyq-19",
    title: "Computer Science (Paper-III) Solved Paper",
    examCategory: "BPSC TRE 3.0",
    classLevel: "Class 11-12",
    date: "22.07.2024",
    setNumber: "SET-19",
    sections: [
      { name: "Part-I: Language", icon: "LANG" },
      { name: "Part-II: General Studies", icon: "GS" },
      { name: "Part-III: Computer Science", icon: "SUB" },
    ],
    status: "AVAILABLE",
  },
  {
    id: "pyq-18",
    title: "Computer Science Solved Paper",
    examCategory: "BPSC TRE 2.0",
    classLevel: "Class 11-12",
    date: "15.12.2023",
    setNumber: "SET-18",
    sections: [
      { name: "Part-I: Language", icon: "LANG" },
      { name: "Part-II: General Studies", icon: "GS" },
      { name: "Part-III: Computer Science", icon: "SUB" },
    ],
    status: "AVAILABLE",
  },
  {
    id: "pyq-17",
    title: "Computer Science Solved Paper",
    examCategory: "BPSC TRE 2.0",
    classLevel: "Class 09-10",
    date: "08.12.2023",
    setNumber: "SET-17",
    sections: [
      { name: "Part-I: Language", icon: "LANG" },
      { name: "Part-II: General Studies", icon: "GS" },
      { name: "Part-III: Computer Science", icon: "SUB" },
    ],
    status: "AVAILABLE",
  },
  {
    id: "pyq-16",
    title: "Computer Science (Paper-III) Solved Paper",
    examCategory: "BPSC TRE 1.0",
    classLevel: "Class 11-12",
    date: "26.08.2023",
    setNumber: "SET-16",
    sections: [
      { name: "Part-I: Language", icon: "LANG" },
      { name: "Part-II: General Studies", icon: "GS" },
      { name: "Part-III: Computer Science", icon: "SUB" },
    ],
    status: "AVAILABLE",
  },
];

export interface PyqState {
  papers: PyqPaper[];
}

const initialState: PyqState = {
  papers: PYQ_DATA, // ⭐ initial data available
};

export const pyqSlice = createSlice({
  name: "pyq",
  initialState,
  reducers: {
    setPyqs(state, action: PayloadAction<PyqPaper[]>) {
      state.papers = action.payload;
    },
    addPyq(state, action: PayloadAction<PyqPaper>) {
      state.papers.push(action.payload);
    },
    updateStatus(
      state,
      action: PayloadAction<{ id: string; status: "AVAILABLE" | "LOCKED" }>
    ) {
      const item = state.papers.find((p) => p.id === action.payload.id);
      if (item) item.status = action.payload.status;
    },
  },
});

export const { setPyqs, addPyq, updateStatus } = pyqSlice.actions;

export default pyqSlice.reducer;
