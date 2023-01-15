import axios, { AxiosError } from "axios";
import { baseUrl } from "./constants";
import { toast } from "react-toastify";

export const getCourses = async () => {
  try {
    const _res = await axios.get(`${baseUrl}/courses`);
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const getCourseDetails = async (reqCourseSlug: string) => {
  try {
    const _res = await axios.get(`${baseUrl}/courses/${reqCourseSlug}`);
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const getSearchedCourses = async (queryString: string) => {
  try {
    const _res = await axios.get(`${baseUrl}/courses/search?query=${queryString}`);
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const errorHandler = (error?: AxiosError | any) => {
  console.log(error)
  let errMessage: string = "😐 Oops! Something went wrong!";

  if (error.status !== 500) {
    console.log(error.response.status)
    // errMessage = error.response.message;

    // INFO: Only in protected routes, if authToken/JWT is malformed or cookie deleted, then destroyCookie and send user to /login
    // if (
    //   error.response.status === 401 &&
    //   authRoutes.includes(window.location.pathname)
    // ) {
    //   destroyCookie(null, "authToken");
    //   window.location.replace("/login");
    // }
  }

  toast.error(errMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const successHandler = (successMessage: string) => {
  toast.success(successMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};
