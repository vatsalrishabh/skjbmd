"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import { Modal, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const videos = [
  { id: "qqem8ZsTbJA", title: "Video 1" },
  { id: "kbGac3tnDVs", title: "Video 2" },
  { id: "A2mPnsoNVVc", title: "Video 3" },
  { id: "xZRG-yecmFI", title: "Video 4" },
  { id: "nirlteRrjoM", title: "Video 5" }
];

const VideoSlider = () => {
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpen = (videoId) => {
    setSelectedVideo(videoId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="p-4">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        className="w-full"
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div className="cursor-pointer" onClick={() => handleOpen(video.id)}>
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                className="rounded-lg w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-4/5 max-w-3xl bg-black p-4 rounded-lg">
            <IconButton className="absolute top-2 right-2 text-white" onClick={handleClose}>
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