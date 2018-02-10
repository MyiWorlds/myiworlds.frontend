import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

const settings = {
  theme: {
    palette: {
      primary: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
      },
      accent: {
        light: red[300],
        main: red[500],
        dark: red[700],
      },
      primaryText: {
        color: grey,
      },
      secondaryText: {
        color: grey,
      },
    },
  },
  contentSizes: {
    xs: 200,
    sm: 400,
    md: 600,
    lg: 900,
    xl: 1200,
  },
};

export default settings;
