import { Global } from '@emotion/react';

export const Fonts = () => (
  <Global
    styles={`
        @font-face {
            font-family: 'Estre';
            src: url('../fonts/Estre/estre.ttf')
        }
        @font-face {
            font-family: 'Eczar';
            src: url('../fonts/Eczar/Eczar-Regular.ttf')
        }
    `}
  />
);
