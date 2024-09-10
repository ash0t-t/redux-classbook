import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IState, IRating } from "./types";
import axios from "axios";
import { InputLesson } from "../students/types";

const initialState: IState = {
    lessons: [],
};

export const getLessons = createAsyncThunk("lessons/get", async () => {
    const response = await axios.get("http://localhost:3004/lessons");
    return response.data;
});

export const addLessons = createAsyncThunk("lessons/add", async (param: InputLesson) => {
    const response = await axios.post("http://localhost:3004/lessons", param);
    return response.data;
});

const ClassBookSlice = createSlice({
    name: 'classbook',
    initialState,
    reducers: {
        updateRating: (state, action: PayloadAction<{ lessonId: string; rating: IRating }>) => {
            const { lessonId, rating } = action.payload;
            const lesson = state.lessons.find((l) => l.id === lessonId);
            if (lesson) {
                const existingRating = lesson.ratings.find((r) => r.student === rating.student);
                if (existingRating) {
                    existingRating.rate = rating.rate;
                } else {
                    lesson.ratings.push(rating);
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLessons.fulfilled, (state, action) => {
                state.lessons = action.payload;
            })
            .addCase(addLessons.fulfilled, (state, action) => {
                state.lessons.push(action.payload);
            });
    },
});

export const { updateRating } = ClassBookSlice.actions;
export const classReducer = ClassBookSlice.reducer;