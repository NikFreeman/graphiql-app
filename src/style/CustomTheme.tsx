import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: `'Oswald', sans-serif`,
  },
  textStyles: {
    p: {
      fontSize: ['17px', '14px'],
      fontWeight: '200',
    },
    a: {
      fontSize: ['17px', '14px'],
      fontWeight: '200',
    },
    h2: {
      fontFamily: `'Oswald', sans-serif`,
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderBottomRightRadius: '0.5rem',
        borderBottomLeftRadius: '0',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '0',
        minW: '80px',
        opacity: '0.9',
        padding: '0.6em 1.2em',
        _hover: { opacity: '1', borderColor: '#695bd3' },
      },
      Text: {
        baseStyle: {
          fontSize: ['17px', '14px'],
          fontWeight: '200',
        },
      },
      Heading: {
        baseStyle: {
          fontFamily: `'Oswald', sans-serif`,
          size: '6xl',
        },
      },
      Link: {
        baseStyle: {
          fontSize: ['17px', '14px'],
          fontWeight: '200',
          opacity: '0.9',
          _hover: { opacity: '1' },
        },
      },
    },
  },
});

export default theme;
