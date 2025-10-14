import { SpeakersCarousel } from "@/components/SpeakersCarousel"; // Adjust path if needed

export default function YourPage() {
  return (
    <div className="bg-black py-12">
      <h2 className="text-4xl font-bold text-center text-white mb-8">Our Speakers</h2>
      <SpeakersCarousel />
    </div>
  );
}
