import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const params = useParams();
  const nftId = params.nftId;
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getDetails() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setDetails(data);
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="70%" height="50vh" />
                ) : (
                  <img
                    src={details.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {loading ? (
                      <Skeleton width="60%" height="32px" />
                    ) : (
                      `${details.title} #${details.tag}`
                    )}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {!loading && details.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {!loading && details.likes}
                    </div>
                  </div>
                  <p>
                    {loading ? (
                      <Skeleton width="60%" height="150px" />
                    ) : (
                      details.description
                    )}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${details.ownerId}`}>
                            {loading ? (
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="100%"
                              />
                            ) : (
                              <img
                                className="lazy"
                                src={details.ownerImage}
                                alt=""
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${details.ownerId}`}>
                            {loading ? (
                              <Skeleton width="100px" height="16px" />
                            ) : (
                              details.ownerName
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${details.creatorId}`}>
                            {loading ? (
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="100%"
                              />
                            ) : (
                              <img
                                className="lazy"
                                src={details.creatorImage}
                                alt=""
                              />
                            )}

                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${details.creatorId}`}>
                            {loading ? (
                              <Skeleton width="100px" height="16px" />
                            ) : (
                              details.creatorName
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>
                        {loading ? (
                          <Skeleton width="48px" height="28px" />
                        ) : (
                          details.price
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
