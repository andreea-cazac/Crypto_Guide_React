const primaryColor = '#14213D';
const secondaryColor = '#AEC6CF';
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

  components: {
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginVertical: 16,
      color: primaryColor,
    },
  },
};