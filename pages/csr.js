import React, { useEffect, useState } from "react";
import Navbar from "../components/_App/Navbar";
import PageBannerTitle from "../components/common/PageBannerTitle";
import Footer from "../components/_App/Footer";
import CsrMain from "../components/CSR/CsrMain";
import { singleSlugData } from "../utils/function";
import Loader from "../components/Loader";

const Csr = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    slugData();
  }, []);

  const slugData = async () => {
    try {
      setLoading(true);
      const res = await singleSlugData("csr");
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
              pageTitle="Corporate Social Responsibility"
              homePageUrl="/"
              homePageText="Home"
              activePageText="Corporate Social Responsibility"
              imgClass="/images/csr/Banner.jpg"
            />
          ))}

          <CsrMain data={post} />

          <Footer />
        </>
      )}
    </>
  );
};

export default Csr;
