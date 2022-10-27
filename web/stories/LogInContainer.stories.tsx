import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LogInContainer } from "../components/LogInContainer";

export default {
  component: LogInContainer,
} as ComponentMeta<typeof LogInContainer>;

export const LoginContainer: ComponentStory<typeof LogInContainer> = () => (
  <LogInContainer
    onLogin={() => {}}
    onRegister={() => {}}
    registrationDisabled={false}
  />
);
export const LoginContainerWithDisabledRegistration: ComponentStory<
  typeof LogInContainer
> = () => (
  <LogInContainer
    onLogin={() => {}}
    onRegister={() => {}}
    registrationDisabled={true}
  />
);
