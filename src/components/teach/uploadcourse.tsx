import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postCourseUpload, successHandler } from "../../utils/api";
import { category_list, level_list, tag_list } from "../../utils/constants";
import { slugify } from "../../utils/functions";
import { UserDataProps } from "../../utils/interface";
import {
  FooterComponent,
  NavbarComponent,
  SpinnerloaderComponent,
} from "../shared";

type CourseUploadInputs = {
  title: string;
  courseSlug: string;
  imageurl: string;
  oldPrice: any;
  price: any;
  rating: string;
  votes: string;
  category: string;
  tag: string;
  level: string;
  learningOutcomes: any;
  requirements: any;
  description: string;
  instructorName: string;
  instructorProfession: string;
  instructorDescription: string;
  instructorImg: string;
};

const Uploadcoursepage = (): JSX.Element => {
  const navigate = useNavigate();

  const [cookie, _] = useCookies(["authToken"]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const _data: UserDataProps | null = JSON.parse(
      localStorage.getItem("userData")!
    );
    setUserData(_data);
  }, []);

  const handleCourseUpload = async (data: CourseUploadInputs) => {
    const _res = await postCourseUpload(cookie?.authToken, data);
    if (_res) {
      successHandler("Your course is uploaded successfully!");
      setIsSubmitting(false);
      navigate(`/coursedetails/${data.courseSlug}`);
    }
    setIsSubmitting(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseUploadInputs>();

  const onSubmit: SubmitHandler<CourseUploadInputs> = (data) => {
    data.oldPrice = parseInt(data.oldPrice);
    data.price = parseInt(data.price);
    data["courseSlug"] = slugify(data.title);
    data["rating"] = "4.0";
    data["votes"] = "12,000";
    data["instructorImg"] = userData?.imageurl
      ? userData?.imageurl
      : "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
    data["instructorName"] = userData?.fullName;
      const sanitizedOutcomes = data.learningOutcomes.split("; ");
    data.learningOutcomes = sanitizedOutcomes;
    const sanitizedRequirements = data.requirements.split("; ");
    data.requirements = sanitizedRequirements;
    setIsSubmitting(true);
    handleCourseUpload(data);
  };
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center bg-gray-100 w-full p-8 lg:p-20 text-center">
        <h1 className="text-3xl lg:text-5xl ">Upload a Course</h1>
        <p className="text-base lg:text-lg my-3 font-light">
          Fill up the details of your course and become an instructor and share
          your knowledge to the world!
        </p>
      </div>
      <form
        className="flex flex-col w-full items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full lg:w-7/12 flex-col items-center justify-center my-10 space-y-3">
          <div className="w-10/12 relative">
            <label
              htmlFor="title"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>Title of the course</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <input
              aria-label="Title"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-4 text-base font-normal w-full my-1"
              type="text"
              placeholder="Title of the course"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="imageurl"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>Course Image URL</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <input
              aria-label="Course Image URL"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-4 text-base font-normal w-full my-1"
              type="text"
              placeholder="https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg"
              {...register("imageurl", { required: true })}
            />
            {errors.imageurl && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="oldPrice"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>Old Price in ₹</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <input
              aria-label="Old Price"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-4 text-base font-normal w-full my-1"
              type="number"
              placeholder="3499"
              {...register("oldPrice", { required: true })}
            />
            {errors.oldPrice && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="price"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>New Price in ₹</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <input
              aria-label="Price"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-4 text-base font-normal w-full my-1"
              type="number"
              placeholder="499"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="category"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>Category</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <select
              className="w-full px-4 py-2 border border-black focus:outline-none"
              {...register("category", { required: true })}
            >
              <option selected={true}>Please select...</option>
              {category_list.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            {errors.category && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="tag"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>Tag</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <select
              className="w-full px-4 py-2 border border-black focus:outline-none"
              {...register("tag", { required: true })}
            >
              <option selected={true}>Please select...</option>
              {tag_list.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            {errors.tag && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="level"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>Level</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <select
              className="w-full px-4 py-2 border border-black focus:outline-none"
              {...register("level", { required: true })}
            >
              <option selected={true}>Please select...</option>
              {level_list.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            {errors.level && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="learningOutcomes"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>
                Learning Outcomes {"("} ; separated {")"}
              </span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <textarea
              aria-label="Learning Outcomes"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-4 text-base font-normal w-full my-1"
              placeholder="Frontend; Backend; DevOps; Full stack dev"
              {...register("learningOutcomes", { required: true })}
            />
            {errors.learningOutcomes && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="requirements"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>
                Requirements {"("} ; separated {")"}
              </span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <textarea
              aria-label="Requirements"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-4 text-base font-normal w-full my-1"
              placeholder="Laptop; Mobile; Working internet connection"
              {...register("requirements", { required: true })}
            />
            {errors.requirements && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="description"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>Course Description</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <textarea
              aria-label="Course Description"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-4 text-base font-normal w-full my-1"
              placeholder="Welcome to the best course on..."
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="instructorProfession"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>Instructor Profession</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <input
              aria-label="Instructor Profession"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-4 text-base font-normal w-full my-1"
              type="text"
              placeholder="Lead Software Instructor"
              {...register("instructorProfession", { required: true })}
            />
            {errors.instructorProfession && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <div className="w-10/12 relative">
            <label
              htmlFor="instructorDescription"
              className="flex flex-row justify-between mb-1 text-sm font-semibold text-primaryblack"
            >
              <span>Instructor Description</span>
              <span className="text-gray-500 font-light text-xs">Required</span>
            </label>
            <textarea
              aria-label="Instructor Description"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-4 text-base font-normal w-full my-1"
              placeholder="Hello, and my name is..."
              {...register("instructorDescription", { required: true })}
            />
            {errors.instructorDescription && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`${
            isSubmitting ? "opacity-25 cursor-wait" : "hover:opacity-90"
          } bg-findemypurple text-white border border-1 py-3 w-10/12 lg:w-3/12 my-5`}
        >
          {isSubmitting ? <SpinnerloaderComponent /> : "Upload Course"}
        </button>
      </form>
      <FooterComponent />
    </>
  );
};

export default Uploadcoursepage;
