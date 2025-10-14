import { SpeakersCarousel } from "@/components/SpeakersCarousel"; // Adjust path

export default function SpeakersSection() {
  return (
    <section className="w-full bg-black text-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Meet Our Esteemed Speakers
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-3xl mx-auto">
            Insights from industry leaders and academic pioneers who are shaping the future.
          </p>
        </div>
        <SpeakersCarousel />
      </div>
    </section>
  );
}
