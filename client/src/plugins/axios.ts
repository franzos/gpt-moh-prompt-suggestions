import { Plugin } from "vue";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const axiosPlugin: Plugin = {
  install(app, options: CreateAxiosDefaults) {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: options.baseURL,
    });

    axiosInstance.interceptors.request.use((config) => {
      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    app.config.globalProperties.$axios = axiosInstance;
  },
};

export default axiosPlugin;
