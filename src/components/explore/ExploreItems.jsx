import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../NftCard.jsx";
import NftSkeleton from "../NftSkeleton.jsx";

const classNames = "col-lg-3 col-md-6 col-sm-6 col-xs-12";

const ExploreItems = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadIndex, setLoadIndex] = useState(8);
  const [filter, setFilter] = useState("");
  const filterInputRef = useRef();

  async function getNfts(nftFilter = "") {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore" +
        nftFilter
    );

    await setNfts(data);
    setLoading(false);
  }

  async function filterNfts() {
    if (filterInputRef.current.value === "price_low_to_high") {
      getNfts("?filter=price_low_to_high");
    } else if (filterInputRef.current.value === "price_high_to_low") {
      getNfts("?filter=price_high_to_low");
    } else if (filterInputRef.current.value === "likes_high_to_low") {
      getNfts("?filter=likes_high_to_low");
    } else {
      getNfts("");
    }
  }

  function loadMore() {
    const currentIndex = loadIndex;
    setLoadIndex(currentIndex + 4);
  }

  useEffect(() => {
    getNfts();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={filterNfts}
          ref={filterInputRef}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8)
            .fill(0)
            .map((_, index) => (
              <NftSkeleton classes={classNames} indexKey={index} />
            ))
        : nfts
            .slice(0, loadIndex)
            .map((nft) => (
              <NftCard
                classes={classNames}
                nftId={nft.nftId}
                authorImg={nft.authorImage}
                exp={nft.expiryDate}
                nftImg={nft.nftImage}
                title={nft.title}
                price={nft.price}
                likes={nft.likes}
              />
            ))}
      {nfts.length > loadIndex && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
