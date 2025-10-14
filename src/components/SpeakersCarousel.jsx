"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import VanillaTilt from "react-vanilla-tilt";

// --- Speaker Data ---
const allSpeakers = [
  { name: 'Rekha Raju', title: 'Classical Dancer', image: '/assets/speaker_1.jpg' },
  { name: 'Mohan Savarkar', title: 'Tech Evangelist', image: '/assets/speaker_2.jpg' },
  { name: 'Vivek Agarwal', title: 'AI Researcher', image: '/assets/speaker_3.jpg' },
  { name: 'Sudipto Das', title: 'Lead Architect', image: '/assets/speaker_4.jpg' },
  { name: 'Sankho Kun', title: 'Design Principal', image: '/assets/speaker_5.jpg' },
  { name: 'Prof. B. Ravi', title: 'Academic Head', image: '/assets/speaker_6.jpg' },
];

// --- The Main Component ---
export function SpeakersCarousel() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[autoplayPlugin.current]}
      onMouseEnter={autoplayPlugin.current.stop}
      onMouseLeave={autoplayPlugin.current.reset}
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent className="-ml-6">
        {allSpeakers.map((speaker, index) => (
          <CarouselItem key={index} className="pl-6 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <SpeakerCard speaker={speaker} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Removed border-neutral-700 from buttons for a cleaner look */}
      <CarouselPrevious className="ml-14 h-10 w-10 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border-0" />
      <CarouselNext className="mr-14 h-10 w-10 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border-0" />
    </Carousel>
  );
}

// --- Individual Speaker Card Component ---
function SpeakerCard({ speaker }) {
  const tiltOptions = {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
    scale: 1.05,
  };

  return (
    <VanillaTilt options={tiltOptions} className="w-full h-full">
      {/* REMOVED 'border' and 'border-white/10' from this div */}
      <div className="group relative w-full h-full overflow-hidden rounded-xl bg-neutral-900 p-2">
        <Card className="border-none bg-transparent">
          <CardContent className="relative aspect-[3/4] p-0 overflow-hidden rounded-lg">
            <motion.img
              src={speaker.image}
              alt={`Photo of ${speaker.name}`}
              className="absolute inset-0 h-full w-full object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </CardContent>
        </Card>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <motion.h3 
            className="text-xl md:text-2xl font-bold"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {speaker.name}
          </motion.h3>
        </div>
      </div>
    </VanillaTilt>
  );
}
