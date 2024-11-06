import React, { useState, useEffect } from "react";
import Navbar from "../components/_App/Navbar";
import PageBannerTitle from "../components/common/PageBannerTitle";
import Footer from "../components/_App/Footer";
import { accordiantSlugData, singleSlugData } from "../utils/function";
import Loader from "../components/Loader";

const Career = () => {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState(null);

  const [accordiant, setAccordiant] = useState([]);
  const [loading, setLoading] = useState(false);


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
      const res = await singleSlugData("apply-now");
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

  useEffect(() => {
    const data = localStorage.getItem("title");
    setTitle(data);
    // document.getElementById(title).value=title ;
  }, []);

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
              homePageUrl="/career"
              homePageText="Job Vacancy"
              activePageText="Apply Now"
              imgClass="/images/career/Banner.jpg"
            />
          ))}
          <div className="contact-area ptb-110">
            <div className="container">
              <div className="section-title">
                {/* <span>Contact Us</span> */}
                <h2>Apply Now</h2>
                <br></br>
                {/* <h4 id="title-display">{title}</h4> */}
                <iframe
                  src={`https://files.bksfabrics.in/career/apply-now/`}
                  width="100%"
                  height="640"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  scroll="no-scroll"
                  style={{ overflow: "hidden", padding: "0px" }}
                ></iframe>
              </div>
            </div>
          </div>
          {/* <ApplyNow data={post} />  */}
          {/* <JobContent data={accordiant}/> */}

          <Footer />        
        </>
      )}
    </>
  );
};

export default Career;
