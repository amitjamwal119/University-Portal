
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk to Fetch Students from Backend (MongoDB)
export const fetchStudents = createAsyncThunk("student/fetchStudents", async () => {
  const response = await fetch("http://localhost:9004/api/students");
  const data = await response.json();
  return data; // Returns student data to Redux store
});

// Async Thunk to Add a Student (POST request)
export const addStudentToDB = createAsyncThunk("student/addStudent", async (newStudent) => {
  const response = await fetch("http://localhost:9004/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStudent),
  });
  const data = await response.json();
  return data; // Returns newly added student to Redux store
});

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    isLoading: false,
    isError: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch Students Cases
      // case1 : if data is not fetched and is in pending state  
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        console.log("Fetching Students...");
      })
      // case2 : if data is fetched and fetched
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
        console.log("Students Fetched Successfully!");
      })
      //in case of data fetching error
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error Fetching Students:", action.error.message);
      })

      // Add Student Cases
      .addCase(addStudentToDB.fulfilled, (state, action) => {
        state.students.push(action.payload);
        console.log("Student Added Successfully!");
      })
      .addCase(addStudentToDB.rejected, (state, action) => {
        state.isError = true;
        console.error("Error Adding Student:", action.error.message);
      });
  },
});

export default studentSlice.reducer;
