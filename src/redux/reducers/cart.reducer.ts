import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoursedetailsProps, ICartInitialState } from "../../utils/interface";

const initialState: ICartInitialState = {
  cartData: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCourseToCartStore: (
      store,
      action: PayloadAction<CoursedetailsProps>
    ) => {
      store.cartData.push(action.payload);
    },
    fetchCourseToCartStore: (
      store,
      action: PayloadAction<CoursedetailsProps[]>
    ) => {
      store.cartData = action.payload;
    },
    removeCourseFromCartStore: (store, action: PayloadAction<string>) => {
      store.cartData = store.cartData.filter(
        (item) => item.courseSlug !== action.payload
      );
    },
  },
});

export const {
  addCourseToCartStore,
  fetchCourseToCartStore,
  removeCourseFromCartStore,
} = cartSlice.actions;
export default cartSlice.reducer;
