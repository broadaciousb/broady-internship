import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Countdown from "./Countdown";

const NftCard = ({classes, nftId, authorId, authorImg, exp, nftImg, title, price, likes}) => {
  const navigate = useNavigate();
  const [id, setId] = useState([]);

  useEffect(() => {
    setId(authorId);
  })

  return (
    <div
      key={nftId}
      className={classes}
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link to={{ pathname: "/author", state: { id: authorId } }} data-bs-toggle="tooltip" data-bs-placement="top">
            <img className="lazy" src={authorImg} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        <Countdown expiration={exp} />

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
            <img src={nftImg} className="lazy nft__item_preview" alt="" />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{title}</h4>
          </Link>
          <div className="nft__item_price">{price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
