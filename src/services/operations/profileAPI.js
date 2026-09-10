import { setLoading, setUser } from "../../slices/profileSlice"

import { apiConnector } from "../apiConnector"
import { logout } from "./authAPI"
import { profileEndpoints } from "../apis"
import { toast } from "react-hot-toast"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }}



export async function getUserEnrolledCourses(token, navigate) {
  const toastId = toast.loading("Loading...");
  let result = [];

  // Check if token exists
  if (!token) {
    toast.dismiss(toastId);
    toast.error("No token found. Please login.");
    if (navigate) navigate("/login");
    return result;
  }

  try {
    console.log("Token being sent to getUserEnrolledCourses:", token);
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");

    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............", response);

    // Check success flag
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to fetch enrolled courses");
    }

    result = response.data.data;

  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API ERROR............", error.response?.data || error.message);

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      if (navigate) navigate("/login");
    } else {
      toast.error("Could not get enrolled courses.");
    }

  } finally {
    toast.dismiss(toastId);
  }

  return result;
}




export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  // console.log("Prinfvudfnvdf df",token);
  try{
    const response = await apiConnector("GET", profileEndpoints.GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}



