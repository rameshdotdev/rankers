import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { TabType } from "@/types";

export interface TabState {
  activeTab: TabType;
}

const initialState: TabState = {
  activeTab: "OVERVIEW",
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabType>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;

// optional selector
export const selectActiveTab = (state: RootState) => state.tabs.activeTab;
