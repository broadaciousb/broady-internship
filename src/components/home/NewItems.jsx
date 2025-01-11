import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";

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

    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="section-items" className="no-bottom">
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
                    <div className="" key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <div className="author__img--loading-skeleton"></div>
                          <i className="fa fa-check"></i>
                        </div>

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="loading-background"></div>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <div className="new-item__title-skeleton"></div>
                          </Link>
                          <div className="nft__item_price">
                            <div className="new-item__price-skeleton"></div>
                          </div>
                          <div className="nft__item_like">
                            <div className="new-item__likes-skeleton"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : newNfts.map((nft) => (
                    <div className="" key={nft.id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to="/author"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              className="lazy"
                              src={nft.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {nft.expiryDate - currentTime >= 0 && (
                          <div id="de_countdown" className="de_countdown">
                            {convertTime(nft.expiryDate)}
                          </div>
                        )}
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to="/item-details">
                            <img
                              src={nft.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <h4>{nft.title}</h4>
                          </Link>
                          <div className="nft__item_price">{nft.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{nft.likes}</span>
                          </div>
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

export default NewItems;
