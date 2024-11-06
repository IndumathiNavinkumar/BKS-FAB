import React, { useState, useEffect } from "react";
import Navbar from "../components/_App/Navbar";
import PageBannerTitle from "../components/common/PageBannerTitle";
import Footer from "../components/_App/Footer";
import ApparelMain from "../components/Apparel/ApparelMain";
import { gallery, parseImageUrls, singleSlugData } from "../utils/function";
import Loader from "../components/Loader";

const ApparelFabrics = () => {
  const [post, setPost] = useState(null);
  // const [hospitalGallery, setHospitalGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    slugData();
    // hospital_gallery();
  }, []);

  const slugData = async () => {
    try {
      setLoading(true);
      const res = await singleSlugData("apparel-fabrics");
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

  // const hospital_gallery = async () => {
  //   try {
  //     const res = await gallery();
  //     const response = parseImageUrls(res);
  //     setHospitalGallery(response);
  //   } catch (error) {
  //     console.log("hospitalerror: ", error);
  //   }
  // };

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
              pageTitle="Apparel Fabrics"
              homePageUrl="/products"
              homePageText="Product"
              activePageText="Apparel Fabrics"
              imgClass="/images/products/apparel/banner.jpg"
            />
          ))}

          <ApparelMain data={post} />
          {/* <ProductGallery data={hospitalGallery} /> */}

          <Footer />
        </>
      )}
    </>
  );
};

export default ApparelFabrics;
