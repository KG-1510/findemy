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
  } catch (err: any) {
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
  } catch (err: any) {
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
  } catch (err: any) {
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
  courseSlug: string,
  isGiftedCourse?: boolean,
  recipientEmail?: string
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
          isGiftedCourse,
          recipientEmail,
        },
      });
      return _res.data;
    }
  } catch (err: any) {
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

export const postGiftedCourseEnroll = async (
  authToken: string,
  userId: string,
  coursesPurchased: any,
  recipientEmail: string
) => {
  try {
    const _res = await axios({
      method: "POST",
      url: `${baseUrl}/user/giftedcourseenroll`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        userId,
        coursesPurchased,
        recipientEmail,
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

export const postPurchaseSuccessMail = async (
  authToken: string,
  fullName: string,
  email: string,
  coursesEnrolled: any
) => {
  try {
    const _res = await axios({
      method: "POST",
      url: `${baseUrl}/courses/sendmail/purchasesuccess`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        fullName,
        email,
        coursesEnrolled,
      },
    });
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const postGiftSuccessMail = async (
  authToken: string,
  senderName: string,
  senderEmail: string,
  recipientFullName: string,
  recipientEmail: string,
  coursesEnrolled: any,
  message?: string
) => {
  try {
    const _res = await axios({
      method: "POST",
      url: `${baseUrl}/courses/sendmail/giftingsuccess`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        senderName,
        senderEmail,
        recipientFullName,
        recipientEmail,
        coursesEnrolled,
        message,
      },
    });
    return _res.data;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const postCourseUpload = async (authToken: string, data: any) => {
  try {
    if (authToken) {
      const _res = await axios({
        method: "POST",
        url: `${baseUrl}/courses/upload`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: data,
      });
      return _res.data;
    }
  } catch (err: any) {
    console.log(err);
    if (err.response.status === 401) {
      return err;
    }
    errorHandler(err);
    return false;
  }
};

export const errorHandler = (error?: AxiosError | any) => {
  console.log(error);
  let errMessage: string = "😐 Oops! Something went wrong!";

  if (error.status !== 500) {
    errMessage = error.response.data.message;
  }

  toast.error(errMessage, {
    toastId: errMessage,
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
