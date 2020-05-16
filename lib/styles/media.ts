const mediaQuery = (minWidth: number) => `
  @media(min-width: ${minWidth}px)
`;

const media = {
  xsmall: mediaQuery(320),
  small: mediaQuery(768),
  medium: mediaQuery(1024),
  large: mediaQuery(1200),
  xlarge: mediaQuery(1440),
  xxlarge: mediaQuery(1920),
};

export default media;
