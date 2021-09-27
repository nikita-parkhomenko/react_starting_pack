// NOTE import styles including bootstrap classes
import '../src/style/all.scss';

// NOTE metadata about a story, typically used to control the behavior of Storybook features
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
