import Avatar from ".";

export default {
  title: "ui/Avatar",
  component: Avatar,
};

export const Default = () => <Avatar src="/hero.jpg" alt="hero" size={10} />;

export const FallBack1 = () => (
  <div className="flex space-x-4">
    <Avatar name="Hussam" size={10} />
    <Avatar name="Hussam Khatib" size={10} />
    <Avatar name="Hussam Khatib Hussam Khatib" size={10} />
  </div>
);

export const FallBack2 = () => (
  <div className="space-x-4">
    <Avatar name="" size={10} />
    <Avatar size={10} />
  </div>
);
