import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accesToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log("error" ,error);
    const originalRequest = error.config;

    // Token expired (use your actual backend status)
    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        if (response.status === 200) {
          const newToken = response.data.data.accessToken;
          console.log("newToken", newToken);
          // Store in localStorage
          localStorage.setItem("accesToken", newToken);

          // Update header for future requests
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

          // Update header for this retry request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("axiox interceptor eeror ", refreshError);
        localStorage.removeItem("accesToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };

