import { fetcher } from "@/lib/utils";
import { Story } from "@/types/mainCarousels";
import StoryCarousel from "./storyCarousel";

const fetchStories = async (): Promise<Story[]> => {
  try {
    const data = await fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stories/`);
    return data;
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
