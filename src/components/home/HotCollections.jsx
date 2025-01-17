import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton.jsx";

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const HotCollections = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const arrowRef = useRef(null);

  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );

    await setAuthors(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <Slider ref={arrowRef} {...sliderSettings}>
              {loading
                ? new Array(6).fill(0).map((_, index) => (
                    <div className="" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="100%" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton
                            width="60px"
                            height="60px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <div>
                            <Skeleton width="40%" height="16px" />
                          </div>
                          <div>
                            <Skeleton width="20%" height="16px" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : authors.map((author) => (
                    <div className="" key={author.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={author.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={author.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{author.title}</h4>
                          </Link>
                          <span>ERC-{author.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
            <button
              className="slider-button prev-button"
              onClick={() => arrowRef.current.slickPrev()}
            >
              {"<"}
            </button>
            <button
              className="slider-button next-button"
              onClick={() => arrowRef.current.slickNext()}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
