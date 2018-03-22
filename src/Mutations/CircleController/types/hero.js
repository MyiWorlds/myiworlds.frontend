const hero = {
  type: 'BLOB_LINES',
  settings: {
    headerEnabled: false,
  },
  styles: {
    titleContainer: {
      padding: 12,
      marginBottom: '-8px',
    },
    titleText: {
      fontSize: '3.5rem',
      color: 'rgba(0, 0, 0, 0.74)',
      fontFamily: 'Roboto',
      fontWeight: 400,
      letterSpacing: '-.02em',
      lineHeight: '1.30357em',
    },
    subtitleContainer: {
      padding: 12,
    },
    subtitleText: {
      fontSize: '1.5rem',
      color: 'rgba(0, 0, 0, 0.54)',
      fontFamily: 'Roboto',
      fontWeight: 400,
      letterSpacing: '-.02em',
      lineHeight: '1.35417em',
    },
    descriptionContainer: {
      marginTop: '-6px',
      padding: '0px 12px 12px 12px',
    },
    descriptionText: {
      color: 'rgba(0, 0, 0, 0.84)',
    },
    tagsContainer: {
      marginTop: '-6px',
      padding: '0px 12px 12px 12px',
    },
    tagsText: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  },
  object: {
    lines: [
      {
        type: 'LINES',
        styles: {
          width: '100%',
          height: '60vh',
          textAlign: 'center',
        },
        lines: [
          {
            type: 'IMAGE',
            styles: {
              width: '100%',
              height: '60vh',
              backgroundSize: 'cover',
            },
            string:
              'https://images.unsplash.com/photo-1513622790541-eaa84d356909?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=087adf2e02fb2f08fdaa5c791546b7df&auto=format&fit=crop&w=1267&q=80',
          },
          {
            type: 'DIV',
            styles: {
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              position: 'absolute',
              background: 'rgba(0, 0, 0, 0.1)',
            },
          },
          {
            type: 'LINES',
            styles: {
              textAlign: 'center',
              width: '70vw',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
            lines: [
              {
                // Make this how Text components are built and props passed in must be like
                type: 'TEXT',
                settings: {
                  textType: 'display4',
                },
                styles: {
                  container: {},
                  string: {
                    color: 'white',
                    margin: 12,
                    whiteSpace: 'pre',
                  },
                },
                string: 'A HERO REBORN',
              },
              {
                type: 'TEXT',
                settings: {
                  textType: 'headline',
                },
                styles: {
                  container: {},
                  string: {
                    color: 'white',
                    margin: 8,
                  },
                },
                string: 'Only the best for you...',
              },
              {
                type: 'TEXT',
                settings: {
                  textType: 'subheading',
                },
                styles: {
                  container: {},
                  string: {
                    color: 'white',
                    margin: 8,
                  },
                },
                string: 'A description to really seal the deal',
              },
              {
                type: 'LINES',
                styles: {
                  justifyContent: 'center',
                },
                lines: [
                  {
                    type: 'BUTTON_LINK',
                    boolean: true,
                    color: 'primary',
                    title: 'SIGN UP',
                    string: '/contact',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default hero;

// Version with ids (closer to what it will eventually look like)
// const tempVarCircle = {
//   type: 'BLOB',
//   settings: {
//     headerEnabled: false,
//   },
//   styles: {
//     titleContainer: {
//       padding: 12,
//       marginBottom: '-8px',
//     },
//     titleText: {
//       fontSize: '3.5rem',
//       color: 'rgba(0, 0, 0, 0.74)',
//       fontFamily: 'Roboto',
//       fontWeight: 400,
//       letterSpacing: '-.02em',
//       lineHeight: '1.30357em',
//     },
//     subtitleContainer: {
//       padding: 12,
//     },
//     subtitleText: {
//       fontSize: '1.5rem',
//       color: 'rgba(0, 0, 0, 0.54)',
//       fontFamily: 'Roboto',
//       fontWeight: 400,
//       letterSpacing: '-.02em',
//       lineHeight: '1.35417em',
//     },
//     descriptionContainer: {
//       marginTop: '-6px',
//       padding: '0px 12px 12px 12px',
//     },
//     descriptionText: {
//       color: 'rgba(0, 0, 0, 0.84)',
//     },
//     tagsContainer: {
//       marginTop: '-6px',
//       padding: '0px 12px 12px 12px',
//     },
//     tagsText: {
//       color: 'rgba(0, 0, 0, 0.54)',
//     },
//     lines: [
//       '019e1790-cc99-11e7-be26-9784a4731e9b',
//       '0a4ad0a0-cc98-11e7-be26-9784a4731e9b',
//       '0d29b4d0-dd87-11e7-88eb-8bc241fdd2de',
//       '0dd81d40-dd87-11e7-88eb-8bc241fdd2de',
//     ],
//   },
// };
