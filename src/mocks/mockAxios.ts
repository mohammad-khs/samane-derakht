import axios from "axios";
import { getMockResponse } from "./mockSetup";

const mockAxios = axios.create();

mockAxios.interceptors.request.use((config) => {
  const mockData = getMockResponse(config.url || "", config.method?.toUpperCase());
  if (mockData !== null) {
    return Promise.reject({
      config,
      response: { data: mockData, status: 200, statusText: "OK", headers: {} },
      isMock: true,
    });
  }
  return config;
});

mockAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isMock) {
      return Promise.resolve({
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        config: error.config,
      });
    }
    return Promise.reject(error);
  }
);

export default mockAxios;