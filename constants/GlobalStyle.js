const primaryColor = '#14213D';
const secondaryColor = '#AFD5F0';
const white = '#fff';
const gray = '#555';
const errorColor = '#cc0000';
const successColor = '#00aa00';

export const GlobalStyle = {
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
    background: white,
    errorColor: errorColor,
    successColor: successColor,
    subtleText: gray,
  },
  fonts: {
    title: 'Geogrotesque',
  },
  components: {
    title: {
      fontSize: 30,
      marginVertical: 16,
      color: primaryColor,
      fontFamily: 'Geogrotesque',
    },
  },
};