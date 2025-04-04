import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
//  Async Thunk to Fetch Students from Backend (MongoDB)
export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",                                                            //Action name in Redux
  async (_, { getState, rejectWithValue }) => {                                         //Gets the authentication token from Redux state or localStorage.
    const token = getState().student.token || localStorage.getItem("token");            //Returns rejectWithValue("No authentication token found.") if there's no token.



    if (!token) {
      return rejectWithValue("No authentication token found.");                       //Returns rejectWithValue("No authentication token found.") if there's no token.
    }

    try {
      const response = await fetch("http://localhost:9004/api/midd", {   //axios
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,                                           //Sends Authorization header (Bearer <token>) for authentication.
          "Content-Type": "application/json",
        },
      });

      // console.log("Response:", response);

      if (!response.ok) {
        const errorMessage = await response.text();                                       //If the API request fails (!response.ok), it extracts the error message and rejects the request.
        
        return rejectWithValue(`Failed to fetch user: ${response.status} - ${errorMessage}`);
      }

      const data = await response.json();                                 //If successful, the response JSON is returned.
      return data;

    } catch (error) {
      console.error("API Error:", error.message);
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {                                 
    loginSuccess: (state, action) => {        //Updates user, token, and isAuthenticated when login is successful.          
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);      //Saves the token in localStorage.
    },
  },

  extraReducers: (builder) => {
    builder
      //  Case 1: Fetch Students Pending
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      //  Case 2: Fetch Students Fulfilled
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      //  Case 3: Fetch Students Rejected
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        console.error("Error Fetching Students:", state.error);
      });
  },
});

export default studentSlice.reducer;
