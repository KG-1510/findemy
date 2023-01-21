import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartpageComponent } from "./components/cart";
import {
  Checkoutgiftingsuccesspage,
  CheckoutpageComponent,
  Checkoutsuccesspage,
} from "./components/checkout";
import { CoursedetailsComponent } from "./components/coursedetails";
import { HomepageComponent } from "./components/homepage";
import { LoginpageComponent } from "./components/login";
import { SearchpageComponent } from "./components/search";
import { SignuppageComponent } from "./components/signup";
import { MylearningsComponent } from "./components/mylearnings";
import { NotfoundComponent } from "./components/shared";
import { StreamcourseComponent } from "./components/streamcourse";
import ProtectedRoute from "./protectedroutes";
import "react-toastify/dist/ReactToastify.css";
import { GiftcourseComponent } from "./components/giftcourse";

export const AuthContext = createContext<any>(null);

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  return (
    <>
      <ToastContainer />
      <AuthContext.Provider
        value={{
          isUserLoggedIn,
          setIsUserLoggedIn,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<HomepageComponent />}></Route>
            <Route path="/login" element={<LoginpageComponent />}></Route>
            <Route path="/signup" element={<SignuppageComponent />}></Route>
            <Route path="/search" element={<SearchpageComponent />}></Route>
            <Route
              path="/coursedetails/:courseSlug"
              element={<CoursedetailsComponent />}
            ></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartpageComponent />}></Route>
              <Route
                path="/checkout"
                element={<CheckoutpageComponent />}
              ></Route>
              <Route
                path="/checkoutsuccess"
                element={<Checkoutsuccesspage />}
              ></Route>
              <Route
                path="/giftingcheckoutsuccess"
                element={<Checkoutgiftingsuccesspage />}
              ></Route>
              <Route
                path="/mylearnings"
                element={<MylearningsComponent />}
              ></Route>
              <Route
                path="/streamcourse/:courseSlug"
                element={<StreamcourseComponent />}
              ></Route>
              <Route
                path="/giftcourse/:courseSlug"
                element={<GiftcourseComponent />}
              ></Route>
            </Route>
            <Route path="*" element={<NotfoundComponent />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
