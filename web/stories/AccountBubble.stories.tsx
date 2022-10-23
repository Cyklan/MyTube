import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AccountBubble } from "../components/AccountBubble";

export default {
  component: AccountBubble,
} as ComponentMeta<typeof AccountBubble>;

export const Bubble: ComponentStory<typeof AccountBubble> = () => (
  <AccountBubble />
);
