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
        _hover: { opacity: '1' },
      },
      Text: {
        baseStyle: {
          fontSize: ['17px', '14px'],
          fontWeight: '200',
        },
      },
      Link: {
        baseStyle: {
          fontSize: ['17px', '14px'],
          fontWeight: '200',
        },
      },
    },
  },
});

export default theme;
