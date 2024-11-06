import React, { useState, useEffect } from "react";
import Navbar from "../components/_App/Navbar";
import PageBannerTitle from "../components/common/PageBannerTitle";
import Footer from "../components/_App/Footer";
import SustainabilityMain from "../components/Sustainability/SustainabilityMain";
import { singleSlugData } from "../utils/function";
import Loader from "../components/Loader";

const Sustainability = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("post: ", post);

  useEffect(() => {
    slugData();
  }, []);

  const slugData = async () => {
    try {
      setLoading(true);
      const res = await singleSlugData("sustainability");
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

  console.log("post", post);
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
              pageTitle="Sustainability"
              homePageUrl="/"
              homePageText="Home"
              activePageText="Sustainability"
              imgClass="/images/sustainability/banner.jpg"
            />
          ))}

          <SustainabilityMain data={post} />

          <Footer />
        </>
      )}
    </>
  );
};

export default Sustainability;
