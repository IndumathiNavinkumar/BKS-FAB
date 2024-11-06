import React, { useEffect, useState } from "react";
import Navbar from "../components/_App/Navbar";
import Banner from "../components/home/Banner";
import AboutContent from "../components/home/AboutContent";
import Footer from "../components/_App/Footer";
import { singleSlugData } from "../utils/function";
import Loader from "../components/Loader";

const IndexPage = () => {
  const [post, setPost] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    slugData();
    slugData2();
  }, []);

  const slugData = async () => {
    try {
      setLoading(true);
      const res = await singleSlugData("home-new");
      if (res && res.length > 0) {
        setPost(res[0]);
      } else {
        // Handle the case where the page with the given slug is not found
        console.error("Page not found");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  };

  console.log("banner", banner);

  const slugData2 = async () => {
    try {
      setLoading(true);

      const res = await singleSlugData("/banner-slider/");
      if (res && res.length > 0) {
        setBanner(res[0]);
      } else {
        // Handle the case where the page with the given slug is not found
        console.error("Page not found");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log("error: ", error);
    }
  };

  return (
    <>
     { loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {" "}
          <Navbar />
          <Banner data={banner} />
          <AboutContent data={post} />
          {/* <Services />

      <BlogPost />

      <Webinar />

      <Partner /> */}
          <Footer />
        </>
      )}
    </>
  );
};

export default IndexPage;
