"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Caraousal() {
    const imgSrc = [
        "/hero/hero1.jpg",
        "/hero/hero2.jpg",
        "/hero/hero3.jpg","/hero/hero4.jpg","/hero/hero5.jpg","/hero/hero6.jpg","/hero/hero7.jpg",
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[30vh] lg:h-[75vh] overflow-hidden">
            <Image 
                src={imgSrc[activeIndex]} 
                alt={`Image ${activeIndex}`} 
                layout="fill"
                objectFit="cover"
                priority
            />
        </div>
    );
}
