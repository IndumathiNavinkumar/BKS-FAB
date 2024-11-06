import React, { useState, useEffect } from "react";
import Navbar from "../components/_App/Navbar";
import PageBannerTitle from "../components/common/PageBannerTitle";
import Footer from "../components/_App/Footer";
import FacilityEnables from "../components/Coating/Facility-enables";
import { singleSlugData } from "../utils/function";
import Loader from "../components/Loader";

const Coating = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    slugData();
  }, []);

  const slugData = async () => {
    try {
      setLoading(true);
      const res = await singleSlugData("coating");
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

          {post?._links?.["wp:featuredmedia"]?.map((mediaLink) =>{
console.log('✌️mediaLink --->', mediaLink);

        return(
            <PageBannerTitle
              key={mediaLink?.href}
              mediaLink={mediaLink?.href}
              pageTitle="Coating"
              homePageUrl="/"
              homePageText="Home"
              activePageText="Coating"
              imgClass="/images/coating/banner.jpg"
            />
          )   })   }

          <FacilityEnables data={post} />

          <Footer />
        </>
      )}
    </>
  );
};

export default Coating;
