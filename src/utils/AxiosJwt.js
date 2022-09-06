import axios from "axios";

const AxiosJwt = () => {
  const defaultOptions = {
    baseURL: `${process.env.REACT_APP_BASE_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config) => {
      if (localStorage.getItem("access_token") != null) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "access_token"
        )}`;
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // =========================================================
  // We need this to implement auto refresh token if necessary
  // =========================================================
  //
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        originalRequest.url ===
          `${process.env.REACT_APP_BASE_API_URL}/auth/refresh-token`
      ) {
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        return axios
          .get(`${process.env.REACT_APP_BASE_API_URL}/auth/refresh-token`)
          .then((response) => {
            if (response.status === 201) {
              localStorage.setItem(
                "access_token",
                response.data.token.access_token
              );

              axios.defaults.headers.common["Authorization"] =
                "Bearer " + response.data.token.access_token;

              return axios(originalRequest);
            }
          });
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default AxiosJwt();
