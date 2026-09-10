import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null, // store form data temporarily until OTP verification
  user: null,       // store user profile after login/signup
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  loading: false,   // to track async operations
  error: null,      // to handle errors
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Token management
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },

    // Signup data for OTP verification
    setSignupData(state, action) {
      state.signupData = action.payload;
    },

    // Store logged-in user info
    setUser(state, action) {
      state.user = action.payload;
    },

    // Loading state handler
    setLoading(state, action) {
      state.loading = action.payload;
    },
    //For handelling Erros
    // Error handler
    setError(state, action) {
      state.error = action.payload;
    },

    // Reset everything on logout
    logout(state) {
      state.signupData = null;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  setToken,
  setSignupData,
  setUser,
  setLoading,
  setError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;