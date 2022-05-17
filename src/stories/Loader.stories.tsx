import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Loader from "common/components/Loader/Loader";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Moje Wydatki/Loader",
  component: Loader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   overlay: { control: 'boolean' },
  // },
} as ComponentMeta<typeof Loader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Default.args = {
//   overlay: false
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Loader',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Loader',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Loader',
// };
