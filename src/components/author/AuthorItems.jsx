import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NftSkeleton from "../NftSkeleton.jsx";
import NftCard from "../NftCard.jsx";

const AuthorItems = () => {
  const [author, setAuthor] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const classNames = "col-lg-3 col-md-6 col-sm-6 col-xs-12";

  const { id } = useParams();

  async function getAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012`
    );

    setAuthor(data);
    setNfts(data.nftCollection);
    setLoading(false);
  }

  useEffect(() => {
    getAuthor();
    console.log(author);
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8)
            .fill(0)
            .map((_, index) => (
              <NftSkeleton classes={classNames} indexKey={index} />
            ))
        
          : nfts.map((nft) => (
            <NftCard
                classes={classNames}
                nftId={nft.Id}
                authorImg={author.authorImage}
                nftImg={nft.nftImage}
                title={nft.title}
                price={nft.price}
                likes={nft.likes}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
