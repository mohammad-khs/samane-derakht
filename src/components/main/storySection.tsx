import { Story } from "@/types/mainCarousels";
import StoryCarousel from "./storyCarousel";

const StorySection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stories/`);
  const data: Story[] = await res.json();
  return (
    <>
      <section>
        <StoryCarousel stories={data} />
      </section>
    </>
  );
};

export default StorySection;
