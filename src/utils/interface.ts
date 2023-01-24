export interface CoursedetailsProps {
  id: number;
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
  id: number;
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
  price: number;
  imageurl: string;
  courseSlug: string;
  isGiftedCourse?: string;
}

export interface SearchcardProps {
  id: string;
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
  id: string;
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
