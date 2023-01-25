import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownView from "react-showdown";
import { getCourseDetails } from "../../utils/api";
import { streamable_courses } from "../../utils/constants";
import { sanitizedHtmlText } from "../../utils/functions";
import { CoursedetailsProps } from "../../utils/interface";
import { FooterComponent, NavbarComponent } from "../shared";

const StreamcourseComponent = (): JSX.Element => {
  const [courseDetailsData, setCourseDetailsData] =
    useState<CoursedetailsProps>();
  const backendBaseUrl: string | undefined =
    process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    const _res = await getCourseDetails(params.courseSlug!);
    if (_res) {
      setCourseDetailsData(_res.data);
    }
  };

  const params = useParams();

  let sanitizedCourseDescription: string | undefined = "";

  if (courseDetailsData) {
    sanitizedCourseDescription = sanitizedHtmlText(
      courseDetailsData?.description
    );
  }

  return (
    <>
      <NavbarComponent />
      <div className="bg-primaryblack sticky h-14 z-40 w-full top-16 py-4 px-10 animate-fadeIn">
        <h1 className="text-white text-sm lg:text-base font-light">
          {courseDetailsData?.title}
        </h1>
      </div>

      <div className="w-full flex flex-col lg:flex-col">
        <div className="w-full lg:w-9/12">
          <div className="video-responsive">
            {streamable_courses.includes(courseDetailsData?.courseSlug!) ? (
              <video id="videoPlayer" controls={true}>
                <source
                  src={`${backendBaseUrl}/courses/stream/coursevideo/${params?.courseSlug}`}
                  type="video/mp4"
                />
              </video>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/HGgyd1bYWsE`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded YouTube iFrame for sample video"
              />
            )}
          </div>
        </div>
        <div className="block lg:fixed right-0 top-28 w-full lg:w-3/12 h-auto lg:h-screen bg-gray-50">
          <h1 className="bg-gray-200 px-4 py-6 border-b text-primaryblack">
            Course sections
          </h1>
          <p className="bg-white p-4 border-b text-primaryblack">
            Section 1: Introduction to the course
          </p>
          <p className="bg-white p-4 border-b text-primaryblack">
            Section 2: Learning the basics
          </p>
          <p className="bg-white p-4 border-b text-primaryblack">
            Section 3: Practice and perfection
          </p>
          <p className="bg-white p-4 border-b text-primaryblack">
            Section 4: Course doubts
          </p>
          <p className="bg-white p-4 border-b text-primaryblack">
            Section 5: Observations from the course
          </p>
          <p className="bg-white p-4 border-b text-primaryblack">
            Section 6: Learning outcomes
          </p>
          <p className="bg-white p-4 border-b text-primaryblack">
            Section 7: Wrapping up
          </p>
        </div>
      </div>

      <div className="w-full lg:w-9/12 py-5 px-4 lg:px-20">
        <div className="mt-4">
          <div>
            <h1 className="font-bold text-2xl mb-4">About this course</h1>
          </div>
          <p className="text-sm font-light">
            <MarkdownView
              className="text-sm font-normal"
              style={{ whiteSpace: "pre-line" }}
              markdown={sanitizedCourseDescription}
            />
          </p>
        </div>

        <div className="mt-8">
          <div>
            <h1 className="font-bold text-2xl mb-4">Instructor</h1>
          </div>
          <div className="flex flex-row my-3">
            <img
              className="w-32 h-32 rounded-full"
              src={courseDetailsData?.instructorImg}
              alt={courseDetailsData?.instructorName}
            />
            <div className="flex flex-col items-center justify-center mx-3">
              <p className="text-lg font-bold text-findemypurple underline text-left w-full">
                {courseDetailsData?.instructorName}
              </p>
              <p className="text-base font-light text-gray-500 w-full">
                {courseDetailsData?.instructorProfession}
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default StreamcourseComponent;
