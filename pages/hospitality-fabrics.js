import React, { useEffect, useState } from "react";
import Navbar from "../components/_App/Navbar";
import PageBannerTitle from "../components/common/PageBannerTitle";
import Footer from "../components/_App/Footer";
import HospitalityMain from "../components/Hospitality/HospitalityMain";
// import HospitalityTable from "../components/Hospitality/HospitalityTable";
import { gallery, parseImageUrls, singleSlugData } from "../utils/function";
// import ProductGallery from "../components/ProductGallery/ProductGallery";
// import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import Loader from "../components/Loader";

const HospitalityFabrics = () => {
  const [post, setPost] = useState([]);
  const [hospitalGallery, setHospitalGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("post: ", post);

  useEffect(() => {
    slugData();
    // hospital_gallery();
  }, []);

  const slugData = async () => {
    try {
      setLoading(true);
      const res = await singleSlugData("hospitality-fabrics");
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
              pageTitle="Hospitality Linen"
              homePageUrl="/products"
              homePageText="Product"
              activePageText="Hospitality Linen"
              imgClass="/images/products/hospitality/banner.jpg"
            />
          ))}

          <HospitalityMain data={post} />
          {/* <ProductGallery data={hospitalGallery} /> */}

          {/* <HospitalityTable /> */}

          {/* <Production />

      <WiderWidth />

      <Production2 /> */}

          <Footer />
        </>
      )}
    </>
  );
};

export default HospitalityFabrics;
