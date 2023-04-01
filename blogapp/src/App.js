import "./App.css";
import Navbar from "./Components/BaseComponents/NavbarComponent/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginSignUpPage from "./pages/LoginPages/LoginSignUpPage";
import BottomNavbarComponent from "./Components/BaseComponents/BottomNavbar/BottomNavbarComponent";
import CreateBlog from "./pages/BlogOption/WriteBlog";
import MyBlogs from "./pages/MyBlogs/MyBlogs";

function App() {
  return (
    <>
      {/* <Router> */}

      <BrowserRouter>
        <div className="widget-vw">
          <Routes>
            <Route
              path="/"
              element={
                <>
                <Navbar title="BlogDekho" />
                <div className="main-view">
                  <Dashboard isFromMyBlogs = {false}/>
                </div>
                </>
              }
            />
            <Route
              exact
              path="/signin"
              element={<LoginSignUpPage isForSignIn={true} />}
            />
            <Route
              exact
              path="/signup"
              element={<LoginSignUpPage isForSignIn={false} />}
            />
            <Route
              path="/write"
              element={
                <>
                  <Navbar title="BlogDekho" />

                  <div className="main-view">
                    <CreateBlog isFromCreate= {true}/>
                  </div>
                </>
              }
            />
            <Route
              path="/read"
              element={
                <>
                  <Navbar title="BlogDekho" />
                  <div className="main-view">
                    <Dashboard />
                  </div>
                </>
              }
            />
            <Route
              path="/home"
              element={
                <>
                  <Navbar title="BlogDekho" />

                  <div className="main-view">
                    <Dashboard />
                  </div>
                </>
              }
            />
            <Route
              path="/myBlogs"
              element={
                <>
                  <Navbar title="BlogDekho" />

                  <div className="main-view">
                    <MyBlogs isFromMyBlogs = {true}/>
                  </div>
                </>
              }
            />
          </Routes>
          <BottomNavbarComponent title="BlogDekho" />
        </div>
      </BrowserRouter>
      {/* </Router> */}
    </>
  );
}

export default App;
