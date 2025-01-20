import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import NftCard from "../NftCard.jsx";
import NftSkeleton from "../NftSkeleton.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

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

const classNames = "";

const NewItems = () => {
  const [newNfts, setNewNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const arrowRef = useRef(null);

  function convertTime(expDate) {
    if (!expDate) return null;

    const timeLeft = (expDate - currentTime) / 1000;

    if (timeLeft <= 0) return null;

    const hours = Math.floor(timeLeft / 60 / 60);
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = Math.floor(timeLeft % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    await setNewNfts(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
    AOS.init({
            duration: 2000,
            delay: 300,
            once: true
          });
  }, []);

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <Slider ref={arrowRef} {...sliderSettings}>
              {loading
                ? new Array(7).fill(0).map((_, index) => (
                    <NftSkeleton classes={classNames} indexKey={index} />
                  ))
                : newNfts.map((nft) => (
                  <NftCard
                  classes={classNames}
                  nftId={nft.nftId}
                  authorId={nft.authorId}
                  authorImg={nft.authorImage}
                  exp={nft.expiryDate}
                  nftImg={nft.nftImage}
                  title={nft.title}
                  price={nft.price}
                  likes={nft.likes}
                  />
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

export default NewItems;
