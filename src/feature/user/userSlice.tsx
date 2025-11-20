import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Replace or partially update the currentUser.
    // Pass `null` to clear (logout) the user.
    setUser: (state, action: PayloadAction<User | Partial<User> | null>) => {
      const payload = action.payload;
      if (payload === null) {
        state.currentUser = null;
        return;
      }
      // If there is no existing user, treat payload as the full user (or partial -> fill missing)
      if (!state.currentUser) {
        // If payload is partial and missing fields you expect, consider validating here.
        state.currentUser = payload as User;
        return;
      }

      // Merge partial update into existing user
      state.currentUser = {
        ...state.currentUser,
        ...(payload as Partial<User>),
      };
    },

    // Simple reset to initial state
    logoutUser: (state) => {
      state.currentUser = null;
    },

    // Add exam to current user's selectedExams (initialize array if missing)
    addSelectedExam: (state, action: PayloadAction<string>) => {
      if (!state.currentUser) return; // nothing to update
      if (!state.currentUser.selectedExams) {
        state.currentUser.selectedExams = [];
      }
      if (!state.currentUser.selectedExams.includes(action.payload)) {
        state.currentUser.selectedExams.push(action.payload);
      }
    },

    // Remove exam from current user's selectedExams
    removeSelectedExam: (state, action: PayloadAction<string>) => {
      if (!state.currentUser || !state.currentUser.selectedExams) return;
      state.currentUser.selectedExams = state.currentUser.selectedExams.filter(
        (exam) => exam !== action.payload
      );
    },
  },
});

// Export actions
export const { setUser, logoutUser, addSelectedExam, removeSelectedExam } =
  userSlice.actions;

// Export reducer
export default userSlice.reducer;
