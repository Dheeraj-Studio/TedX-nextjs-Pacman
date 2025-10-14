import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// The array of all your speakers
const allSpeakers = [
  { name: 'Rekha Raju', image: '/assets/speaker_1.jpg' },
  { name: 'Mohan Savarkar', image: '/assets/speaker_2.jpg' },
  { name: 'Vivek Agarwal', image: '/assets/speaker_3.jpg' },
  { name: 'Sudipto Das', image: '/assets/speaker_4.jpg' },
  { name: 'Sankho Kun', image: '/assets/speaker_5.jpg' },
  { name: 'Prof. B. Ravi', image: '/assets/speaker_6.jpg' },
];

export function SpeakersCarousel() {
  return (
    // The Carousel component is set to be wider to better fit the images
    <Carousel
      className="w-full max-w-md mx-auto" // Centered and wider
      opts={{
        align: "start",
        loop: true, // Allows the carousel to loop indefinitely
      }}
    >
      <CarouselContent className="-ml-4">
        {allSpeakers.map((speaker, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              {/* Each card is a clickable link (optional, can be removed) */}
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Card className="border-none bg-black">
                  <CardContent className="relative aspect-square flex items-center justify-center p-0">
                    <img
                      src={speaker.image}
                      alt={`Photo of ${speaker.name}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 rounded-b-lg">
                      <p className="text-center text-2xl font-bold text-red-600">
                        {speaker.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white bg-black bg-opacity-50 " />
      <CarouselNext className="text-white bg-black bg-opacity-50 " />
    </Carousel>
  );
}
