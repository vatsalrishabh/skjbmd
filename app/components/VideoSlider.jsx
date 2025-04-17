"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper/modules";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import { Close, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const videos = [
  { id: "qqem8ZsTbJA", title: "Video 1" },
  { id: "kbGac3tnDVs", title: "Video 2" },
  { id: "A2mPnsoNVVc", title: "Video 3" },
  { id: "xZRG-yecmFI", title: "Video 4" },
  { id: "nirlteRrjoM", title: "Video 5" },
];

const VideoSlider = () => {
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const swiperRef = useRef(null);

  const handleOpen = (videoId) => {
    setSelectedVideo(videoId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="p-6 relative flex flex-col items-center">
      {/* Heading */}
      <Typography
        variant="h4"
        gutterBottom
        className="text-center text-gray-800 font-bold"
      >
         हमारे नवीनतम वीडियो देखें
      </Typography>

      <div className="relative w-full">
        {/* Custom navigation buttons */}
        <IconButton
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
          sx={{
            position: "absolute",
            top: "50%",
            left: 2,
            zIndex: 10,
            transform: "translateY(-50%)",
            backgroundColor: "#2D3748", // Dark background color
            color: "white", // White icon for contrast
            "&:hover": {
              backgroundColor: "#4A5568", // Lighter gray on hover
            },
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            padding: "12px",
            borderRadius: "50%",
          }}
        >
          <ArrowBackIosNew sx={{ color: "white" }} fontSize="medium" />
        </IconButton>

        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode, Navigation]}
          className="w-full"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="cursor-pointer" onClick={() => handleOpen(video.id)}>
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="rounded-lg w-full"
                />
                <Typography
                  variant="h6"
                  className="mt-2 text-center text-gray-800 font-medium"
                >
                  {video.title}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Next Button */}
        <IconButton
          onClick={() => swiperRef.current?.swiper?.slideNext()}
          sx={{
            position: "absolute",
            top: "50%",
            right: 2,
            zIndex: 10,
            transform: "translateY(-50%)",
            backgroundColor: "#2D3748", // Dark background color
            color: "white", // White icon color for contrast
            "&:hover": {
              backgroundColor: "#4A5568", // Lighter gray on hover
            },
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            padding: "12px",
            borderRadius: "50%",
          }}
        >
          <ArrowForwardIos sx={{ color: "white" }} fontSize="medium" />
        </IconButton>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-4/5 max-w-3xl bg-black p-4 rounded-lg">
            <IconButton
              className="absolute top-2 right-2 text-white"
              onClick={handleClose}
            >
              <Close />
            </IconButton>
            {selectedVideo && (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video"
                allow="autoplay; encrypted-media"
                className="rounded-lg"
              />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default VideoSlider;
