import Image from "next/image";
import { Card } from "@/components/ui/card";

const timelineEvents = [
  {
    year: "1969",
    label: "The Foundation",
    title: "The Pioneer Kharigar",
    description:
      "Our story began in Jaipur with a humble kitchen and a pure promise: craft sweets with uncompromising quality, ritual, and warmth.",
    image: "/hero1.png",
    imageAlt: "Traditional Indian sweets and ingredients",
  },
  {
    year: "1978",
    label: "The Identity",
    title: "Sanwariya Legacy",
    description:
      "As demand grew, our family established signature recipes rooted in desi ghee, saffron, and hand-finished techniques.",
    image: "/premium-selection/1.png",
    imageAlt: "Royal gulab jamun presentation",
  },
  {
    year: "1994",
    label: "The Expansion",
    title: "First Signature Store",
    description:
      "Our first flagship sweet house opened with one mission: deliver a royal experience with every bite and every box.",
    image: "/hero3.png",
    imageAlt: "Showcase of traditional sweets",
  },
  {
    year: "2022",
    label: "The Modern Vision",
    title: "Craft for New Generations",
    description:
      "Today, Sanwariya blends heritage with modern standards while preserving the same handcrafted soul that defines our name.",
    image: "/hero4.png",
    imageAlt: "Modern premium dessert visuals",
  },
];

const AboutTimeline = () => {
  return (
    <section className="w-full py-14 md:py-20">
      <div className="main-container mx-auto">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-gold-secondary text-sm tracking-[3px] uppercase">
            Our Story
          </p>
          <h1 className="mt-4 text-white text-4xl md:text-5xl font-sans font-bold">
            A Timeline of Taste and Tradition
          </h1>
          <p className="mt-4 text-beige/80 libertinus-serif-regular">
            Inspired by your reference layout, this page traces Sanwariya&apos;s
            journey from a local craft to a timeless premium sweet brand.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gold/35 md:block" />

          <div className="space-y-10 md:space-y-14">
            {timelineEvents.map((event, index) => {
              const isLeftAligned = index % 2 === 0;

              return (
                <div
                  key={event.year}
                  className={`grid items-center gap-6 md:grid-cols-2 md:gap-10 ${
                    isLeftAligned ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <Card className="border-gold/25 bg-maroon/45 py-0 backdrop-blur-sm overflow-hidden">
                    <div className="relative h-80 md:h-96">
                      <Image
                        src={event.image}
                        alt={event.imageAlt}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </Card>

                  <div className="relative px-1 md:px-4">
                    <div className="absolute left-[-1.15rem] top-6 hidden size-4 rounded-full border-2 border-gold bg-maroon md:block" />
                    <p className="text-gold-secondary text-xs tracking-[2px] uppercase">
                      {event.year} • {event.label}
                    </p>
                    <h2 className="mt-2 text-white text-3xl font-sans font-semibold">
                      {event.title}
                    </h2>
                    <p className="mt-3 text-beige/80 leading-7 libertinus-serif-regular">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
