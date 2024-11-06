import React, { useState, useEffect } from "react";
import Navbar from "../components/_App/Navbar";
import PageBannerTitle from "../components/common/PageBannerTitle";
import Footer from "../components/_App/Footer";
import Hospitality from "../components/Products/Hospitality";
import { singleSlugData } from "../utils/function";
import Loader from "../components/Loader";

const Infrastructure = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("post: ", post);

  useEffect(() => {
    slugData();
  }, []);

  const slugData = async () => {
    try {
      setLoading(true);
      const res = await singleSlugData("products");
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
              pageTitle="Products"
              homePageUrl="/"
              homePageText="Home"
              activePageText="Products"
              imgClass="/images/products/Banner.jpg"
            />
          ))}

          <Hospitality data={post} />

          {/* <Apparel />

      <Workwear /> */}

          <Footer />
        </>
      )}
    </>
  );
};

export default Infrastructure;
