const defaultMediaCard = {
  id: 'default-display',
  type: 'MEDIA_CARD',
  settings: {
    appBar: {
      spacing: 16,
      listIcon: 'list',
      media: {
        id: 'media1',
        type: 'FONT_ICON',
        style: {
          fontSize: '32px',
          transform: 'rotate(90deg)',
        },
        string: 'view_module',
      },
      cardSizes: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 4,
        xl: 4,
      },
    },
    card: {
      settings: {
        raised: false,
        margin: props =>
          props.type === props.circle.type ? { margin: '12px' } : '',
      },
      style: {
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    media: {
      id: 'media2',
      style: {
        height: 200,
      },
    },
    title: {
      settings: {
        type: 'headline',
        component: 'h2',
      },
    },
    description: {
      settings: {
        component: 'p',
      },
    },
    actions: {
      style: {
        width: '100%',
      },
      lines: [
        {
          type: 'BUTTON',
          settings: {
            color: 'primary',
            dense: 'true',
          },
          string: 'Select',
        },
        {
          type: 'BUTTON',
          settings: {
            color: 'primary',
            dense: 'true',
          },
          string: 'learn more',
        },
      ],
    },
  },
};

export default defaultMediaCard;
