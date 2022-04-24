import React from "react";
import styled from "styled-components";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Admin
import AdminHome from "./pages/Home/AdminHome";
import AdminRegistration from "./pages/Registration/AdminRegistration";
import AdminModal from "./pages/ModalCreate";
import AdminImages from "./pages/GalleryCreate";
import AdminTopNav from "./layouts/AdminTopNav";
import AdminNav from "./layouts/AdminNav";
import AdminCarousel from "./pages/CarouselCreate";
import AdminEvents from "./pages/EventsAdd";
import AdminNotices from "./pages/NoticeCreate";
import AdminNews from "./pages/NewsAdd";
import AdminStaffs from "./pages/StaffsCreate";
import AdminVideos from "./pages/VideosCreate";
import AdminDownloads from "./pages/DownloadsCreate";
import AdminAllNews from "./pages/News/AdminAllNews";
import AdminAllDownloads from "./pages/Downloads/AdminAllDownloads";
import AdminAllNotices from "./pages/Notice/AdminAllNotices";
import AdminEditNews from "./pages/NewsEdit";
import AdminAllEvents from "./pages/Events/AdminAllEvents";
import AdminAllCarousel from "./pages/Carousel";
import AdminAllAlbums from "./pages/Gallery/AdminAllAlbums";
import AdminSingleAlbum from "./pages/Gallery/AdminSingleAlbum";
import AdminAllCareers from "./pages/CareersAdd/AdminAllCareers";
import AdminCareers from "./pages/CareersInfo/AdminCareers";
import CareersAdd from "./pages/CareersAdd";
import Admin404 from "./contents/Admin404";

import Header from "./layouts/Header";
import Home from "./pages/Home";
import School from "./pages/School";
import Contact from "./pages/Contact";
import Footer from "./layouts/Footer";
import BOD from "./pages/HAFamily/BOD";
import Honorary from "./pages/HAFamily/Honorary";
import Staffs from "./pages/HAFamily/Staffs";
import News from "./pages/News";
import DetailedNews from "./pages/News/DetailedNews";
import Login from "./pages/Login";
import HeartlandGallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import TestimonailCreate from "./pages/TestimonialCreate";
import SingleGallery from "./pages/Gallery/SingleGallery";
import Notice from "./pages/Notice";
import Downloads from "./pages/Downloads";
import AboutUs from "./pages/AboutUs";
import Registration from "./pages/Registration";
import Alumni from "./pages/Alumni";
import Scholarship from "./pages/Scholarship";
import Events from "./pages/Events";
import College from "./pages/College";
import NotFoundPage from "./contents/404";
import Careers from "./pages/Careers";
import CareersInfo from "./pages/CareersInfo";

const Menu = styled.div`
  display: flex;
`;

const Whole = styled.div`
  background: ${(props) => (props.darkmode ? "#303134" : "#fff")};
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  width: 100%;
  margin-left: ${(props) => (props.sidebar ? "280px" : "80px")};
  transition: 0.3s;
  margin-top: 60px;
  overflow: hidden;
`;

const App = () => {
  const settings = useSelector((state) => state.settings);
  const { adminMode, darkMode, sidebarToggle } = settings;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    // <PDFReader />
    <>
      <Router>
        {adminMode && adminMode && userInfo && userInfo ? (
          <>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              theme={darkMode ? "dark" : "light"}
              limit={3}
            />
            <AdminTopNav />
            <Menu style={{ background: darkMode ? "#303134" : "#fff" }}>
              <AdminNav />
              <Whole darkmode={darkMode} sidebar={sidebarToggle}>
                <Switch>
                  <Route path="/" exact>
                    <Redirect to="/admin/home" />
                  </Route>
                  <Route path="/admin/home" component={AdminHome} exact />
                  <Route
                    path="/admin/home/registration/:id"
                    component={AdminRegistration}
                    exact
                  />
                  <Route path="/admin/modal" component={AdminModal} exact />
                  <Route
                    path="/admin/carousel"
                    component={AdminCarousel}
                    exact
                  />
                  <Route
                    path="/admin/carousel/all"
                    component={AdminAllCarousel}
                    exact
                  />
                  <Route path="/admin/events" component={AdminEvents} exact />
                  <Route
                    path="/admin/events/all"
                    component={AdminAllEvents}
                    exact
                  />
                  <Route path="/admin/albums" component={AdminImages} exact />
                  <Route
                    path="/admin/albums/all"
                    component={AdminAllAlbums}
                    exact
                  />
                  <Route
                    path="/admin/albums/all/:id"
                    component={AdminSingleAlbum}
                    exact
                  />
                  <Route path="/admin/news" component={AdminNews} exact />
                  <Route
                    path="/admin/news/:id/edit"
                    component={AdminEditNews}
                    exact
                  />
                  <Route
                    path="/admin/news/all"
                    component={AdminAllNews}
                    exact
                  />
                  <Route path="/admin/staffs" component={AdminStaffs} exact />
                  <Route path="/admin/videos" component={AdminVideos} exact />
                  <Route
                    path="/admin/testimonials"
                    component={TestimonailCreate}
                    exact
                  />
                  <Route path="/admin/notices" component={AdminNotices} exact />
                  <Route
                    path="/admin/notices/all"
                    component={AdminAllNotices}
                    exact
                  />
                  <Route
                    path="/admin/downloads"
                    component={AdminDownloads}
                    exact
                  />
                  <Route
                    path="/admin/downloads/all"
                    component={AdminAllDownloads}
                    exact
                  />
                  <Route
                    path="/admin/careers"
                    component={AdminAllCareers}
                    exact
                  />
                  <Route
                    path="/admin/careers/:id"
                    component={AdminCareers}
                    exact
                  />
                  <Route
                    path="/admin/careers/add/new"
                    component={CareersAdd}
                    exact
                  />
                  <Route exact component={Admin404} />
                </Switch>
              </Whole>
            </Menu>
          </>
        ) : (
          <>
            <Header />
            <>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={AboutUs} exact />
                <Route path="/registration" component={Registration} exact />
                <Route path="/school" component={School} exact />
                <Route path="/college" component={College} exact />
                <Route
                  path="/gallery/albums"
                  component={HeartlandGallery}
                  exact
                />
                <Route
                  path="/gallery/albums/:id"
                  component={SingleGallery}
                  exact
                />
                <Route path="/gallery/videos" component={Videos} exact />
                <Route path="/contact" component={Contact} exact />
                <Route path="/hafamily/bod" component={BOD} exact />
                <Route path="/hafamily/honorary" component={Honorary} exact />

                <Route path="/hafamily/staffs" component={Staffs} exact />
                <Route path="/alumni" component={Alumni} exact />
                <Route path="/scholarship" component={Scholarship} exact />
                <Route path="/news" component={News} exact />
                <Route path="/events" component={Events} exact />
                <Route path="/news/:id" component={DetailedNews} exact />
                <Route path="/notice" component={Notice} exact />
                <Route path="/downloads" component={Downloads} exact />
                <Route path="/careers" component={Careers} exact />
                <Route path="/careers/:id" component={CareersInfo} exact />

                {/* Admin */}
                <Route path="/admin/login" component={Login} exact />

                <Route path="/" component={NotFoundPage} />
              </Switch>
            </>
            <Footer />
          </>
        )}
      </Router>
    </>
  );
};

export default App;
