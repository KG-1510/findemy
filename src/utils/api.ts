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
    const _res = await axios.get(
      `${baseUrl}/courses/search?query=${queryString}`
    );
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const postSignupUser = async (formdata: any) => {
  try {
    const _res = await axios({
      method: "POST",
      url: `${baseUrl}/user/signup`,
      data: formdata,
    });
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const postLoginUser = async (formdata: any) => {
  try {
    const _res = await axios({
      method: "POST",
      url: `${baseUrl}/user/login`,
      data: formdata,
    });
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const getUserProfile = async (authToken: string, userId: string) => {
  try {
    if (authToken) {
      const _res = await axios.get(`${baseUrl}/user/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return _res.data;
    }
  } catch (err) {
    if (err.response.status === 401) {
      return err;
    }
    errorHandler(err);
    return false;
  }
};

export const getUserCart = async (authToken: string, userId: string) => {
  try {
    if (authToken) {
      const _res = await axios.get(`${baseUrl}/user/getcart/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return _res.data;
    }
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      return err;
    }
    errorHandler(err);
    return false;
  }
};

export const patchUserCart = async (
  authToken: string,
  userId: string,
  courseSlug: string
) => {
  try {
    if (authToken) {
      const _res = await axios({
        method: "PATCH",
        url: `${baseUrl}/user/patchcart`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          userId,
          courseSlug,
        },
      });
      return _res.data;
    }
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      return err;
    }
    errorHandler(err);
    return false;
  }
};

export const postAddCart = async (
  authToken: string,
  userId: string,
  courseSlug: string
) => {
  try {
    if (authToken) {
      const _res = await axios({
        method: "POST",
        url: `${baseUrl}/user/addcart`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          userId,
          courseSlug,
        },
      });
      return _res.data;
    }
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      return err;
    }
    errorHandler(err);
    return false;
  }
};

export const postCourseEnroll = async (
  authToken: string,
  userId: string,
  coursesPurchased: any
) => {
  try {
    const _res = await axios({
      method: "POST",
      url: `${baseUrl}/user/courseenroll`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        userId,
        coursesPurchased,
      },
    });
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const postRazorpayOrderId = async (
  authToken: string,
  amount: number,
  paymentMethod: string
) => {
  try {
    const _res = await axios({
      method: "POST",
      url: `${baseUrl}/payment/order`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        amount,
        paymentMethod,
      },
    });
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const errorHandler = (error?: AxiosError | any) => {
  console.log(error);
  let errMessage: string = "😐 Oops! Something went wrong!";

  if (error.status !== 500) {
    errMessage = error.response.data.message;

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
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    className: "font-DMSans",
  });
};

export const successHandler = (successMessage: string) => {
  toast.success(successMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    className: "font-DMSans",
  });
};
