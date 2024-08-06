import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  status: 'idle',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, setNotes } = notesSlice.actions;

export default notesSlice.reducer;