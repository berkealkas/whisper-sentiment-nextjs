import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TranscriptState {
  transcriptOutput: any;
}

const initialState: TranscriptState = {
  transcriptOutput: null,
};

const transcriptSlice = createSlice({
  name: "transcript",
  initialState,
  reducers: {
    setTranscript: (state, action: PayloadAction<any>) => {
      state.transcriptOutput = action.payload;
    }
  },
});

export const { setTranscript } = transcriptSlice.actions;

export const selectTranscriptOutput = (state: { transcript: TranscriptState }) => state?.transcript?.transcriptOutput;

export default transcriptSlice.reducer;