import React, { useState, useEffect } from "react";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const params = useParams();
  const authorId = params.authorId;
  const [author, setAuthor] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(false);
  const [followers, SetFollowers] = useState([]);

  async function getAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );

    setAuthor(data);
    setNfts(data.nftCollection);
    setBanner(data.nftCollection[0].nftImage);
    SetFollowers(data.followers);
    setLoading(false);
  }

  function toggleFollow() {
    if (!follow === true) {
      setFollow(true);
      SetFollowers(followers + 1);
    } else {
      setFollow(false);
      SetFollowers(followers - 1);
    }
  }

  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

      
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{ background: `url(${banner}) top` }}
          ></section>
     

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {
                        loading ? <Skeleton width="150px" height="150px" borderRadius="100%"/>
                                : <img src={author.authorImage} alt="" />
                      }
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? <Skeleton width="70%" height="24px" />
                            : author.authorName}
                          <span className="profile_username">
                            {
                              loading ? <Skeleton width="50%" height="16px" />
                              : `@${author.tag}`
                            }
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? <Skeleton width="200px" height="16px" />
                            : author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{loading ? <Skeleton width="32px" height="16px" /> : followers}</div>
                      <Link to="#" className="btn-main" onClick={toggleFollow}>
                        {follow ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    author={author}
                    authorNfts={nfts}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
