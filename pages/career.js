import React, { useState, useEffect } from "react";
import Navbar from "../components/_App/Navbar";
import PageBannerTitle from "../components/common/PageBannerTitle";
import Footer from "../components/_App/Footer";
import CareerMain from "../components/Careers/CareerMain";
import { accordiantSlugData, singleSlugData } from "../utils/function";
import JobContent from "../components/Job/JobContent";
import Loader from "../components/Loader";

const Career = () => {
  const [post, setPost] = useState(null);
  const [accordiant, setAccordiant] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("post: ", post);

  useEffect(() => {
    slugData();
    jobData();
  }, []);

  const jobData = async () => {
    try {
      setLoading(true);
      const res = await accordiantSlugData("career");
      setAccordiant(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  };

  const slugData = async () => {
    try {
      setLoading(true);
      const res = await singleSlugData("career");
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />

          {post?._links?.["wp:featuredmedia"]?.map((mediaLink) => (
            <PageBannerTitle
              key={mediaLink?.href}
              mediaLink={mediaLink?.href}
              pageTitle="Career"
              homePageUrl="/"
              homePageText="Home"
              activePageText="Career"
              imgClass="/images/career/Banner.jpg"
            />
          ))}

          <CareerMain data={post} />
          <JobContent data={accordiant} />

          <Footer />
        </>
      )}
    </>
  );
};

export default Career;
