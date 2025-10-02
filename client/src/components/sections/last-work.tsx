"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

export function LastWorkSection() {
    const images = [
        "/1.png",
        "/2.png",
        "/3.png",
    ];

    return (
        <section className="w-full bg-background dark:bg-black relative pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 overflow-hidden">
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center">
                    <Badge variant="outline" className="mb-3 md:mb-4 bg-background dark:bg-black text-xs md:text-sm">
                        Our Latest Work
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                        Recent Projects
                    </h2>
                </div>

                <div className="mt-8 md:mt-12 lastwork-swiper">
                    <div className="relative">
                        <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white w-10 h-10 flex items-center justify-center backdrop-blur hover:bg-black/70 transition" aria-label="Previous"></button>
                        <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white w-10 h-10 flex items-center justify-center backdrop-blur hover:bg-black/70 transition" aria-label="Next"></button>

                        <Swiper
                            modules={[EffectCoverflow, Navigation]}
                            effect="coverflow"
                            centeredSlides
                            slidesPerView="auto"
                            grabCursor
                            spaceBetween={0}
                            navigation={{ nextEl: ".lastwork-swiper .swiper-button-next", prevEl: ".lastwork-swiper .swiper-button-prev" }}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 180,
                                modifier: 1.2,
                                slideShadows: false,
                            }}
                            className="h-[70vh] md:h-[75vh]"
                        >
                            {images.map((src, idx) => (
                                <SwiperSlide key={idx} className="!w-[85%] sm:!w-[75%] lg:!w-[65%] xl:!w-[900px]">
                                    <div className="relative h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden shadow-2xl bg-black/60">
                                        <div className="absolute inset-0 overflow-y-auto overscroll-contain touch-pan-y slide-scroll">
                                            <img
                                                src={src}
                                                alt={`Project ${idx + 1}`}
                                                className="block w-full h-auto select-none"
                                                loading={idx === 0 ? "eager" : "lazy"}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .lastwork-swiper .swiper { padding: 2rem 3.5rem; }
                @media (max-width: 640px) { .lastwork-swiper .swiper { padding: 1.5rem 2.25rem; } }

                .lastwork-swiper .swiper-slide { 
                    transition: transform .45s ease, box-shadow .45s ease, opacity .45s ease, filter .45s ease; 
                    filter: brightness(.85);
                    transform: scale(.9);
                    z-index: 1;
                }
                .lastwork-swiper .swiper-slide-prev,
                .lastwork-swiper .swiper-slide-next {
                    filter: brightness(.9);
                    transform: scale(.94);
                    z-index: 2;
                }
                .lastwork-swiper .swiper-slide-active { 
                    transform: scale(1);
                    filter: none;
                    z-index: 3;
                }

                /* Elevation for active slide */
                .lastwork-swiper .swiper-slide-active > div { box-shadow: 0 25px 60px rgba(0,0,0,.35); }

                /* Make inner content scroll independently */
                .lastwork-swiper .touch-pan-y { touch-action: pan-y; }

                /* Hide scrollbar visually on the active slide only, keep scroll usable */
                .lastwork-swiper .swiper-slide-active .slide-scroll { scrollbar-width: none; }
                .lastwork-swiper .swiper-slide-active .slide-scroll::-webkit-scrollbar { display: none; width: 0; height: 0; }
            `}</style>
        </section>
    );
}


