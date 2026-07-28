import { createSlice, createSelector } from "@reduxjs/toolkit";

const saved = localStorage.getItem("hireboard-applications");

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    items: saved ? JSON.parse(saved) : {},
  },
  reducers: {
    saveJob(state, action) {
      const job = action.payload;
      if (!state.items[job.id]) {
        state.items[job.id] = {
          job,
          status: "saved",
          updatedAt: new Date().toISOString(),
        };
      }
      localStorage.setItem("hireboard-applications", JSON.stringify(state.items));
    },
    unsaveJob(state, action) {
      const id = action.payload;
      delete state.items[id];
      localStorage.setItem("hireboard-applications", JSON.stringify(state.items));
    },
    setStatus(state, action) {
      const { id, status } = action.payload;
      if (state.items[id]) {
        state.items[id].status = status;
        state.items[id].updatedAt = new Date().toISOString();
        localStorage.setItem("hireboard-applications", JSON.stringify(state.items));
      }
    },
  },
});

export const { saveJob, unsaveJob, setStatus } = applicationsSlice.actions;
export default applicationsSlice.reducer;

const selectApplicationsState = (state) => state.applications.items;

export const selectSavedEntries = createSelector(
  [selectApplicationsState],
  (items) => Object.values(items)
);

export const selectStatusCounts = createSelector(
  [selectSavedEntries],
  (entries) => {
    const counts = { saved: 0, applied: 0, interviewing: 0, offer: 0, rejected: 0 };
    for (const entry of entries) {
      counts[entry.status] = (counts[entry.status] || 0) + 1;
    }
    return counts;
  }
);
