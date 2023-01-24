export const baseUrl: string | undefined = process.env.REACT_APP_BACKEND_BASE_URL;
export const clientBaseUrl: string | undefined = process.env.REACT_APP_FRONTEND_BASE_URL;
export const password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
export const expiration_date_regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
export const streamable_courses: string[] = [
  "the-complete-web-development-bootcamp",
  "the-complete-python-bootcamp-from-zero-to-hero",
];
export const upi_vpa_regex =
  /[a-zA-Z0-9\\.\\-]{2,256}\\@[a-zA-Z][a-zA-Z]{2,64}/;
export const indian_states_ut: string[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];
