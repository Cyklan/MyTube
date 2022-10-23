import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Logo } from "../components/Logo"

export default {
  component: Logo,
} as ComponentMeta<typeof Logo>;

export const Bubble: ComponentStory<typeof Logo> = () => (
  <Logo />
);
