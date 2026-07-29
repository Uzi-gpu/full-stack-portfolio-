import { createSlice, createSelector } from "@reduxjs/toolkit";

const saved = localStorage.getItem("taskly-pins");

const pinsSlice = createSlice({
  name: "pins",
  initialState: {
    items: saved ? JSON.parse(saved) : {},
  },
  reducers: {
    pinTask(state, action) {
      const { task, priority } = action.payload;
      if (!state.items[task.id]) {
        state.items[task.id] = {
          task,
          priority,
          pinnedAt: new Date().toISOString(),
        };
      } else {
        state.items[task.id].priority = priority;
      }
      localStorage.setItem("taskly-pins", JSON.stringify(state.items));
    },
    unpinTask(state, action) {
      const id = action.payload;
      delete state.items[id];
      localStorage.setItem("taskly-pins", JSON.stringify(state.items));
    },
  },
});

export const { pinTask, unpinTask } = pinsSlice.actions;
export default pinsSlice.reducer;

const selectPinsState = (state) => state.pins.items;

export const selectPinnedEntries = createSelector(
  [selectPinsState],
  (items) =>
    Object.values(items).sort(
      (a, b) => new Date(b.pinnedAt) - new Date(a.pinnedAt)
    )
);

export const selectPriorityCounts = createSelector(
  [selectPinnedEntries],
  (entries) => {
    const counts = { high: 0, medium: 0, low: 0 };
    for (const entry of entries) {
      if (counts[entry.priority] !== undefined) {
        counts[entry.priority] += 1;
      }
    }
    return counts;
  }
);
