import { Story } from "@/types/mainCarousels";
import StoryCarousel from "./storyCarousel";

const fetchStories = async (): Promise<Story[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stories/`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch stories");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
};

const StorySection = async () => {
  const data = await fetchStories();

  return (
    <section>
      <StoryCarousel stories={data} />
    </section>
  );
};

export default StorySection;
