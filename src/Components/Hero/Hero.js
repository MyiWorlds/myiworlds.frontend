import React from 'react';
import PropTypes from 'prop-types';

import Typography from '../Typography';
import Image from '../Image';
import Bar from '../Bar';
import Button from '../Button';
import Link from '../Link';

const circle = {
  object: {
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

const Hero = props => {
  return (
    <div className={circle.object.container.styles}>
      <Image
        {...props}
        editing={props.editing}
        backgroundSize={'cover'}
        style={circle.object.backgroundImage.styles}
        src={props.circle.string}
      />
      <div style={circle.object.imageOverlay.styles} />
      <div style={circle.object.textContainer}>
        <Typography
          type={circle.object.title.type}
          style={circle.object.title.styles}
        >
          {circle.object.title.string}
        </Typography>
        <Typography
          type={circle.object.subtitle.type}
          style={circle.object.subtitle.styles}
        >
          {circle.object.subtitle.string}
        </Typography>
        <Typography
          type={circle.object.description.type}
          style={circle.object.description.styles}
        >
          {circle.object.description.string}
        </Typography>
        <Bar background="none" style={circle.object.actions.styles}>
          {circle.object.actions.lines.map(circle => {
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
