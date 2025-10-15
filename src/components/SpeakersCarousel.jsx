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
  { name: 'Rekha Raju', title: 'Classical Dancer', image: '/assets/speaker_1.jpg', description: 'Dr. Rekha Raju is a renowned Indian classical dancer and teacher from Bengaluru, specializing in Bharatanatyam and Mohiniyattam. With years of dedication to preserving and promoting India\'s rich cultural heritage, she combines tradition with storytelling, inspiring audiences through her graceful performances and commitment to nurturing the next generation of classical artists.' },
  { name: 'Mohan Savarkar', title: 'Tech Evangelist', image: '/assets/speaker_2.jpg', description: 'Mohan Savarkar, Vice President of Product Line at Tata Motors, is a visionary leader behind many of India\'s most iconic car designs. With decades of experience in automotive innovation, he has championed safety, sustainability, and technology-driven transformation in India\'s mobility landscape.' },
  { name: 'Vivek Agarwal', title: 'AI Researcher', image: '/assets/speaker_3.jpg', description: 'Vivek Agarwal, Country Director for India at the Tony Blair Institute for Global Change, is a policy expert and technology strategist with experience across four continents. He has led transformative initiatives at the intersection of governance, innovation, and sustainability, shaping forward-thinking policies that drive inclusive growth and technology-enabled development worldwide.' },
  { name: 'Sudipto Das', title: 'Lead Architect', image: '/assets/speaker_4.jpg', description: 'Sudipto Das, an author, musician, and social thinker, is an IIT Kharagpur alumnus and co-founder of two startups. Known for his acclaimed novels The Ekkos Clan and The Aryabhata Clan, he is also a trained violinist and composer whose work blends history, culture, and art to explore the deeper harmonies of human experience.' },
  { name: 'Sankho Kun', title: 'Design Principal', image: '/assets/speaker_5.jpg', description: 'Sankhojyoti Halder, aka Sankho Kun, is the co-founder of AdKo — a 360° content-first marketing agency that\'s collaborated with brands like Google, Audi, and KFC. An IIT Hyderabad alumnus and former Microsoft intern, he\'s also a digital creator with 250K+ followers, blending creativity and strategy to build impactful, performance-driven campaigns.' },
  { name: 'Prof. B. Ravi', title: 'Academic Head', image: '/assets/speaker_6.jpg', description: 'Prof. B. Ravi, Director of NITK Surathkal and founder of BETIC, E-Foundry, and OrthoCAD at IIT Bombay, is a pioneering innovator and educator. With 60+ medical devices, 20+ startups, and transformative research in design and manufacturing, his work has improved healthcare access, inspired entrepreneurship, and benefited over a million patients across India.' },
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

  const [showDescription, setShowDescription] = React.useState(false);

  const toggleDescription = () => setShowDescription((v) => !v);
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDescription();
    }
  };

  return (
    <VanillaTilt options={tiltOptions} className="w-full h-full">
      {/* Click/tap target with keyboard accessibility */}
      <div
        className="group relative w-full h-full overflow-hidden rounded-xl bg-neutral-900 p-2"
        role="button"
        tabIndex={0}
        aria-pressed={showDescription}
        aria-label={`Toggle description for ${speaker.name}`}
        onClick={toggleDescription}
        onKeyDown={handleKey}
      >
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

            {/* Description overlay - slides up; tap/click toggles */}
            <div
              className={
                `absolute inset-x-0 bottom-0 translate-y-full ${showDescription ? '!translate-y-0' : ''} ` +
                `transition-transform duration-300 ease-out`
              }
            >
              <div className="bg-black/85 backdrop-blur-sm px-4 py-3 md:px-5 md:py-4 max-h-40 md:max-h-48 overflow-y-auto">
                <p className="text-sm md:text-base text-neutral-200 leading-snug">
                  {speaker.description}
                </p>
              </div>
            </div>
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
