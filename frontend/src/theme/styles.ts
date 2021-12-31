const styles = {
  global: {
    body: {
      background: '#cccccc42',
      color: 'black.500',
    },
    '#root': (props: any) => ({
      [`@media(max-width: ${props.breakpoints.md})`]: (props: any) => ({
        'padding-bottom': '4rem',
      }),
    }),
    '.special-border': {
      border: '10px solid',
      'border-image-slice': '1',
      'border-width': '1px',
      'border-image-source':
        'linear-gradient(180deg, #bbbaba00 0%, #ddddddff 100%)',
      padding: '2px',
    },
  },
};

export default styles;
