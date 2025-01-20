import React from "react";
import NftSkeleton from "../NftSkeleton.jsx";
import NftCard from "../NftCard.jsx";

const AuthorItems = ({ author, authorNfts, loading }) => {
  const classNames = "col-lg-3 col-md-6 col-sm-6 col-xs-12";



  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8)
            .fill(0)
            .map((_, index) => (
              <NftSkeleton classes={classNames} indexKey={index} key={index}/>
            ))
        
          : authorNfts.map((nft) => (
            <NftCard
                classes={classNames}
                nftId={nft.nftId}
                authorImg={author.authorImage}
                nftImg={nft.nftImage}
                title={nft.title}
                price={nft.price}
                likes={nft.likes}
                key={nft.id}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
