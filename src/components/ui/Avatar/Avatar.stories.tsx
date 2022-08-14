import { ComponentMeta } from "@storybook/react";
import Avatar from ".";

export default {
  title: "ui/Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

export const Default = () => <Avatar src="/hero.jpg" alt="hero" size={40} />;

export const FallBack1 = () => (
  <div className="flex space-x-4">
    <Avatar name="Hussam" size={40} />
    <Avatar name="Hussam Khatib" size={40} />
    <Avatar name="Hussam Khatib Hussam Khatib" size={40} />
  </div>
);

export const FallBack2 = () => (
  <div className="space-x-4">
    <Avatar name="" size={40} />
    <Avatar size={40} />
  </div>
);
