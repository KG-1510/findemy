import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCourseDetails, postAddCart, successHandler } from "../../utils/api";
import {
  NavbarComponent,
  FooterComponent,
  SpinnerloaderComponent,
} from "../shared";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import { CoursedetailsProps, UserDataProps } from "../../utils/interface";

type GiftCourseInputs = {
  recipientName: string;
  recipientEmail: string;
  message?: string;
};

const GiftcourseComponent = (): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);
  const params = useParams();
  const navigate = useNavigate();

  const [courseDetailsData, setCourseDetailsData] =
    useState<CoursedetailsProps>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  //   TODO: To replace this api call with Redux store, remove query param dependency
  const fetchCourseDetails = async () => {
    const _res = await getCourseDetails(params.courseSlug!);
    if (_res) {
      setCourseDetailsData(_res.data);
    }
  };

  const addCourseToCart = async (data: any) => {
    if (cookie?.authToken) {
      const _data: UserDataProps | null = JSON.parse(localStorage.getItem("userData")!);
      localStorage.setItem("giftCourseData", JSON.stringify(data));
      const _res = await postAddCart(
        cookie?.authToken,
        _data?._id!,
        params?.courseSlug!,
        true,
        data.recipientEmail
      );
      if (_res) {
        setIsSubmitting(false);
        successHandler(
          "Added to cart successfully! 🎉 Proceed to pay to gift the course!"
        );
        navigate("/checkout");
      } else {
        setIsSubmitting(false);
      }
    } else {
      successHandler("Hold on, login to continue!");
      navigate("/login");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GiftCourseInputs>();
  const onSubmit: SubmitHandler<GiftCourseInputs> = (data) => {
    setIsSubmitting(true);
    addCourseToCart(data);
  };

  return (
    <>
      <NavbarComponent />
      <div className="w-full p-4 py-8 lg:p-20">
        <h1 className="font-bold text-4xl mb-4 text-center">Gift a Course</h1>
        <p className="text-center mt-2 font-light text-primaryblack text-sm">
          🎁 Experience the joy of sharing by gifting someone a course
        </p>
        <p className="text-center italic mb-4 font-light text-gray-500 text-sm">
          NOTE: The recipient Email ID should be a registered Findemy account
        </p>
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="flex flex-col w-full lg:w-/12">
            <form
              className="w-full flex flex-col space-y-5 items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full lg:w-9/12 relative">
                <label
                  htmlFor="recipientName"
                  className="flex flex-row justify-between text-sm font-semibold text-primaryblack"
                >
                  <span>Recipient Name</span>
                  <span className="text-gray-500 font-light text-xs">
                    Required
                  </span>
                </label>
                <input
                  aria-label="Recipient Name"
                  className="bg-white focus:outline-none border-black border border-1 p-3 text-base font-normal w-full mt-1"
                  type="text"
                  placeholder="John Doe"
                  {...register("recipientName", {
                    required: true,
                  })}
                />
                {errors.recipientName && (
                  <span className="text-red-500 font-light text-sm mb-4">
                    This field is required!
                  </span>
                )}
              </div>

              <div className="w-full lg:w-9/12 relative">
                <label
                  htmlFor="recipientEmail"
                  className="flex flex-row justify-between text-sm font-semibold text-primaryblack"
                >
                  <span>Recipient's Email</span>
                  <span className="text-gray-500 font-light text-xs">
                    Required
                  </span>
                </label>
                <input
                  aria-label="Recipient Email"
                  className="bg-white focus:outline-none border-black border border-1 p-3 text-base font-normal w-full mt-1"
                  type="email"
                  placeholder="johndoe@mail.com"
                  {...register("recipientEmail", {
                    required: true,
                  })}
                />
                {errors.recipientEmail && (
                  <span className="text-red-500 font-light text-sm mb-4">
                    This field is required!
                  </span>
                )}
              </div>

              <div className="w-full lg:w-9/12 relative">
                <label
                  htmlFor="message"
                  className="flex flex-row justify-between text-sm font-semibold text-primaryblack"
                >
                  <span>Your Message</span>
                </label>
                <textarea
                  aria-label="message"
                  className="bg-white focus:outline-none border-black border border-1 p-3 text-base font-normal w-full mt-1"
                  placeholder="Hey there! I am gifting you this course..."
                  {...register("message")}
                />
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className={`${
                  isSubmitting ? "opacity-25 cursor-wait" : "hover:opacity-90"
                } bg-findemypurple text-white border border-1 py-3 w-10/12 lg:w-5/12 my-1`}
              >
                {isSubmitting ? (
                  <SpinnerloaderComponent />
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </form>
          </div>
          <div className="flex flex-col w-full lg:w-/12">
            <img
              className="w-2/3 mx-auto border-2 shadow-md"
              src={courseDetailsData?.imageurl}
              alt={courseDetailsData?.title}
            />
            <Link to={`/coursedetails/${courseDetailsData?.courseSlug}`}>
              <h2 className="text-center mt-4 hover:text-findemypurple">
                {courseDetailsData?.title}
              </h2>
            </Link>
            <p className="text-center mt-2 font-light mb-5 lg:mb-0">
              by {courseDetailsData?.instructorName}
            </p>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default GiftcourseComponent;
