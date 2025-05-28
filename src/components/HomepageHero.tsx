import { ArrowRight, Gift, Star, Vibrate, Zap } from "lucide-react";
import Image from "next/image";
import Container from "./atoms/Container";
import InternalLink from "./InternalLink";

export default function HomepageHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const menuItems = [
    {
      label: "Nya casinon",
      link: "/nya-casinon",
      icon: <Star size={24} className="text-primary" />,
    },
    {
      label: "Casino med Swish",
      link: "/casino-med-swish",
      icon: <Vibrate size={26} className="text-primary" />,
    },
    {
      label: "Casino bonusar",
      link: "/casino-bonus",
      icon: <Gift size={24} className="text-primary" />,
    },
    {
      label: "Snabba uttag",
      link: "/casino-med-snabba-uttag",
      icon: <Zap size={24} className="text-primary" />,
    },
  ];

  return (
    <div className="relative overflow-hidden bg-darklight">
      <Container>
        <div className="relative z-10 flex flex-col gap-4 pb-4 pt-6 lg:pb-16 lg:pt-12">
          <section className="relative z-10">
            <h1 className="max-w-md font-jakarta text-4xl font-bold tracking-tight text-white sm:text-[45px] sm:leading-[52px]">
              {title}
            </h1>
            <div
              className="mt-3 leading-6 text-gray200 lg:mt-6 lg:max-w-2xl"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <ul className="mt-4 grid grid-cols-1 gap-3 lg:mt-10 lg:grid-cols-4 lg:gap-4">
              {menuItems.map((item) => (
                <li key={`menu-item-${item.label}`}>
                  <InternalLink
                    href={item.link}
                    prefetch={false}
                    className="group relative flex items-center justify-center gap-4 overflow-hidden rounded-md bg-white p-4 font-jakarta transition md:gap-2.5 lg:h-[58px] lg:p-3.5"
                  >
                    {item.icon}
                    {item.label}
                    <div className="ml-auto rounded-full bg-blue100 p-1.5 group-hover:bg-dark group-hover:text-white">
                      <ArrowRight className="size-5" />
                    </div>
                  </InternalLink>
                </li>
              ))}
            </ul>
          </section>
          <Image
            src={
              "https://content.casinogringos.se/wp-content/uploads/2025/03/gringo-bg.webp"
            }
            className="absolute -right-36 bottom-0 hidden size-[435px] opacity-50 lg:-right-12 lg:block lg:opacity-100"
            priority={true}
            width={435}
            quality={50}
            alt="Casinogringos"
            height={435}
          />
        </div>
      </Container>
    </div>
  );
}
