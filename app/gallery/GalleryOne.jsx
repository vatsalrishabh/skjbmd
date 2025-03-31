"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Link from "next/link";

const GalleryOne = () => {
  const [posts, setPosts] = useState([
    { instagramLink: "https://www.instagram.com/p/C3KHOW8x-Gy/", productId: "product1" },
    { instagramLink: "https://www.instagram.com/p/DGSqSruvCUE", productId: "product2" },
    { instagramLink: "https://www.instagram.com/p/C-zFuKESvBY/", productId: "product3" },
    { instagramLink: "https://www.instagram.com/p/C94t02Py9En/", productId: "product4" },
    { instagramLink: "https://www.instagram.com/p/C8VxMkoI83_/", productId: "product5" },
    { instagramLink: "https://www.instagram.com/p/C7jCwMhykKQ/", productId: "product6" },
    { instagramLink: "https://www.instagram.com/reel/C4VnGqqyuvg/", productId: "product7" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInstagramPosts = async () => {
      try {
        const response = await axios.get(`/api/gallery`);
        if (response.data && Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        setError("Failed to load posts");
        setPosts([
          { instagramLink: "https://www.instagram.com/p/C3KHOW8x-Gy/", productId: "product1" },
          { instagramLink: "https://www.instagram.com/p/DGSqSruvCUE", productId: "product2" },
          { instagramLink: "https://www.instagram.com/p/C-zFuKESvBY/", productId: "product3" },
          { instagramLink: "https://www.instagram.com/p/C94t02Py9En/", productId: "product4" },
          { instagramLink: "https://www.instagram.com/p/C8VxMkoI83_/", productId: "product5" },
          { instagramLink: "https://www.instagram.com/p/C7jCwMhykKQ/", productId: "product6" },
          { instagramLink: "https://www.instagram.com/reel/C4VnGqqyuvg/", productId: "product7" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getInstagramPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [posts]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4 text-gray-600">Our Gallery</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="p-3">
                {/* Instagram Embed */}
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={post.instagramLink}
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: "0",
                    borderRadius: "3px",
                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "1px",
                    maxWidth: "540px",
                    minWidth: "326px",
                    padding: "0",
                    width: "99.375%",
                  }}
                ></blockquote>

                {/* Buttons Section */}
                <div className="flex justify-center gap-4 mt-4">
                  {/* Buy Now Button */}
                  <Link href={`/product/${post.productId}`}>
                    <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition-all">
                      <FaShoppingCart />
                      Buy Now
                    </button>
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition-all"
                    onClick={() => alert("Added to Wishlist!")}
                  >
                    <FaHeart />
                    Wishlist
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryOne;