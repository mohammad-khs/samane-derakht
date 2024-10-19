import { Story } from "@/types/mainCarousels";
import StoryCarousel from "./ui/main/storyCarousel";

const StorySection = async () => {
  const res = await fetch("https://treeone.liara.run/api/stories/");
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
