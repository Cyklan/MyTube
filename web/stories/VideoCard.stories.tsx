import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VideoCard } from "../components/VideoCard";

export default {
  component: VideoCard,
} as ComponentMeta<typeof VideoCard>;

export const Card: ComponentStory<typeof VideoCard> = () => (
  <VideoCard
    video={{
      createdAt: new Date(),
      description: "I'm pagging",
      id: "foobar",
      isPublic: true,
      title: "My awesome video",
      user: {
        id: "oaisjölkyjnljökxhb",
        username: "Cyki",
      },
    }}
  />
);

export const SuperLongTitle: ComponentStory<typeof VideoCard> = () => (
  <VideoCard
    video={{
      createdAt: new Date(),
      description: "I'm pagging",
      id: "foobar",
      isPublic: true,
      title:
        "My awesome video that is so cool, i can't even describe how cool it is. It's just the best. Get a load of this AMAZING video!",
      user: {
        id: "oaisjölkyjnljökxhb",
        username: "Cyki",
      },
    }}
  />
);
