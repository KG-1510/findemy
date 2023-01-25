export interface CoursedetailsProps {
  _id: string;
  imageurl: string;
  title: string;
  courseSlug: string;
  instructorName: string;
  rating: string;
  votes: string;
  price: number;
  oldPrice: number;
  category: string;
  tag?: string;
  level?: string;
  learningOutcomes: String[];
  requirements: String[];
  description: string;
  instructorProfession: string;
  instructorImg: string;
  instructorDescription: string;
  isGiftedCourse?: string;
}

export interface CartcardProps {
  _id: string;
  imageurl: string;
  title: string;
  courseSlug: string;
  instructorName: string;
  description: string;
  rating: string;
  votes: string;
  price: number;
  oldPrice: number;
  category: string;
  tag?: string;
  level?: string;
}

export interface CoursepreviewProps {
  oldPrice: number;
  price: number;
  imageurl: string;
  courseSlug: string;
  isGiftedCourse?: string;
}

export interface SearchcardProps {
  _id: string;
  imageurl: string;
  title: string;
  courseSlug: string;
  instructorName: string;
  description: string;
  rating: string;
  votes: string;
  price: number;
  oldPrice: number;
  category: string;
  tag?: string;
  level?: string;
}

export interface CoursecardProps {
  _id: string;
  courseSlug: string;
  imageurl: string;
  title: string;
  instructorName: string;
  rating: string;
  votes: string;
  price?: number;
  oldPrice?: number;
  category: string;
  tag?: string;
  level?: string;
}

export interface UserDataProps {
  email: string;
  fullName: string;
  imageurl?: string;
  _id: string;
}

export interface CarouselArrowProps {
  onClick?: () => void;
}

export interface GiftCourseProps {
  recipientName: string;
  recipientEmail: string;
  message?: string;
}
