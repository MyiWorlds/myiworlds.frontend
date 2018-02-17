import React from 'react';
import PropTypes from 'prop-types';

import Typography from '../Typography';
import Image from '../Image';
import Bar from '../Bar';
import Button from '../Button';
import Link from '../Link';

const circle = {
  blob: {
    container: {
      styles: {
        width: '100%',
        height: '60vh',
        textAlign: 'center',
        position: 'relative',
      },
    },
    backgroundImage: {
      styles: {
        width: '100%',
        height: '60vh',
      },
      string:
        'https://images.unsplash.com/photo-1513622790541-eaa84d356909?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=087adf2e02fb2f08fdaa5c791546b7df&auto=format&fit=crop&w=1267&q=80',
    },
    textContainer: {
      textAlign: 'center',
      width: '70vw',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    imageOverlay: {
      styles: {
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.1)',
      },
    },
    title: {
      styles: {
        color: 'white',
        margin: 12,
      },
      type: 'display4',
      string: 'A HERO REBORN',
    },
    subtitle: {
      styles: {
        color: 'white',
        margin: 8,
      },
      type: 'headline',
      string: 'Only the best for you...',
    },
    description: {
      styles: {
        color: 'white',
        margin: 8,
      },
      type: 'subheading',
      string: 'A description to really seal the deal',
    },
    actions: {
      styles: {
        justifyContent: 'center',
      },
      lines: [
        {
          type: 'BUTTON',
          boolean: true,
          color: 'primary',
          title: 'SIGN UP',
          string: '/contact',
        },
      ],
    },
  },
};

const ARRAYTYPEDATA = {
  type: 'ARRAY',
  array: [
    {
      type: 'ARRAY',
      styles: {
        width: '100%',
        height: '60vh',
        textAlign: 'center',
      },
      array: [
        {
          type: 'IMAGE',
          styles: {
            width: '100%',
            height: '60vh',
          },
          string:
            'https://images.unsplash.com/photo-1513622790541-eaa84d356909?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=087adf2e02fb2f08fdaa5c791546b7df&auto=format&fit=crop&w=1267&q=80',
        },
        {
          type: 'ARRAY',
          styles: {
            textAlign: 'center',
            width: '70vw',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
          array: [
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
              // Make this how Text components are built and props passed in must be like
              type: 'TEXT',
              settings: {
                type: 'display4',
                string: 'A HERO REBORN',
              },
              styles: {
                color: 'white',
                margin: 12,
              },
            },
            {
              type: 'TEXT',
              settings: {
                type: 'headline',
                string: 'Only the best for you...',
              },
              styles: {
                color: 'white',
                margin: 8,
              },
            },
            {
              type: 'TEXT',
              settings: {
                styles: {
                  color: 'white',
                  margin: 8,
                },
                type: 'subheading',
                string: 'A description to really seal the deal',
              },
            },
            {
              type: 'ARRAY',
              styles: {
                justifyContent: 'center',
              },
              array: [
                {
                  type: 'BUTTON',
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
};

const Hero = props => {
  return (
    <div className={circle.blob.container.styles}>
      <Image
        {...props}
        editing={props.editing}
        imageSize={'cover'}
        style={circle.blob.backgroundImage.styles}
        src={props.circle.string}
      />
      <div style={circle.blob.imageOverlay.styles} />
      <div style={circle.blob.textContainer}>
        <Typography
          type={circle.blob.title.type}
          style={circle.blob.title.styles}
        >
          {circle.blob.title.string}
        </Typography>
        <Typography
          type={circle.blob.subtitle.type}
          style={circle.blob.subtitle.styles}
        >
          {circle.blob.subtitle.string}
        </Typography>
        <Typography
          type={circle.blob.description.type}
          style={circle.blob.description.styles}
        >
          {circle.blob.description.string}
        </Typography>
        <Bar background="none" style={circle.blob.actions.styles}>
          {circle.blob.actions.lines.map(circle => {
            return (() => {
              switch (circle.type) {
                case 'BUTTON':
                  return (
                    <Link
                      key={circle.string}
                      href={circle.string}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        raised={circle.boolean}
                        color={circle.color}
                        style={circle.style}
                      >
                        {circle.title}
                      </Button>
                    </Link>
                  );
                default:
                  return null;
              }
            })();
          })}
        </Bar>
      </div>
    </div>
  );
};

Hero.prototype.propTypes = {
  circle: PropTypes.obj,
};

export default Hero;
