// src/services/apiConnector.jsx
import axios from "axios";

const rawBase = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";
console.log("API BASE URL:", rawBase);
// normalize base URL (remove trailing slash) to avoid URL mismatches
const BASE_URL = rawBase.replace(/\/+$/, "");
console.log("Normalized API BASE URL: ",BASE_URL);

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Universal API Connector
export const apiConnector = async (method, url, bodyData = {}, headers = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
      params,
    });
    // return full axios response so callers can access response.data.*
    return response;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
};
