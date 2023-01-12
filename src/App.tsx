import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartpageComponent } from "./components/cart";
import { HomepageComponent } from "./components/homepage";
import { LoginpageComponent } from "./components/login";
import { SearchpageComponent } from "./components/search";
import { SignuppageComponent } from "./components/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageComponent />}></Route>
        <Route path="/login" element={<LoginpageComponent />}></Route>
        <Route path="/signup" element={<SignuppageComponent />}></Route>
        <Route path="/search" element={<SearchpageComponent />}></Route>
        <Route path="/cart" element={<CartpageComponent />}></Route>
        {/* <Route path="/register" element={<RegisterComponent />}></Route> */}
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardComponent />}></Route>
          <Route path="/profile" element={<ProfileComponent />}></Route>
          <Route path="/ledger" element={<LedgerComponent />}></Route>
        </Route> */}
      </Routes>
      {/* <ProtectedRoute
          exact
          path="/dashboard"
          component={<DashboardComponent />}
          auth={true}
        /> */}
    </Router>
  );
}

export default App;
