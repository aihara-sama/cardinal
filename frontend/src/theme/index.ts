import { extendTheme } from '@chakra-ui/react';
import Button from './components/button';
import Input from './components/button';
import styles from './styles';
import textStyles from './textStyles';
import colors from './colors';
import layerStyles from './layerStyles';

const overrides = {
  styles,
  colors,
  textStyles,
  fontSizes: {
    heading: {
      primary: '1.5rem',
    },
  },
  sizes: {
    logoSize: '75px',
  },
  layerStyles,
  components: {
    Button,
    Input,
  },
  fonts: {
    // body: 'Estre',
    body: 'Eczar',
  },
  space: {
    pageMargin: '1.5rem',
  },
};

export default extendTheme(overrides);
