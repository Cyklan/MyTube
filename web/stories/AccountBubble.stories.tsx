import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AccountBubble } from "../components/AccountBubble";

export default {
  component: AccountBubble,
} as ComponentMeta<typeof AccountBubble>;

export const LoggedOutBubble: ComponentStory<typeof AccountBubble> = () => (
  <AccountBubble isLoggedIn={false} />
);

export const LoggedInBubble: ComponentStory<typeof AccountBubble> = () => (
  <AccountBubble isLoggedIn={true} user={{
    id: "cl9n3o3fp00002e6d01yfpc6s",
    username: "Cyki"
  }} />
);
