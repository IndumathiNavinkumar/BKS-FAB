import React, { useEffect, useState } from "react";
import Navbar from "../components/_App/Navbar";
import PageBannerTitle from "../components/common/PageBannerTitle";
// import MainContent from "../components/about/MainContent";
import Footer from "../components/_App/Footer";
// import Awards from "../components/about/Awards";
// import Management from "../components/about/Management";
// import Milestones from "../components/about/Milestones";
import { singleSlugData } from "../utils/function";
import AboutComponent from "../components/about/aboutComponent";
import Loader from "../components/Loader";

const AboutPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    slugData();
  }, []);

  const slugData = async () => {
    try {
      setLoading(true);
      const res = await singleSlugData("about-us");
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

  return (
    <>
     { loading ? (
        <Loader />
      ) : (
        <>
      <Navbar />

      {post?._links?.["wp:featuredmedia"]?.map((mediaLink) => (
        <PageBannerTitle
          key={mediaLink?.href}
          mediaLink={mediaLink?.href}
          pageTitle="About"
          homePageUrl="/"
          homePageText="Home"
          activePageText="About"
        />
      ))}

      <AboutComponent data={post} />
      <Footer />
      </>
      )}
    </>
  );
};

export default AboutPage;
