import React from "react";
import Skeleton from "./UI/Skeleton.jsx";

const NftSkeleton = ({classes, indexKey}) => {
  return (
    <div className={classes} key={indexKey}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton width="60px" height="60px" borderRadius="50%" />
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
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="nft__item_info">
          
            <Skeleton width="60%" height="20px" margin="8px 0"/>
          
          <div className="nft__item_price">
          <Skeleton width="30%" height="20px" />
          </div>
          <div className="nft__item_like">
          <Skeleton width="18px" height="18px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftSkeleton;
