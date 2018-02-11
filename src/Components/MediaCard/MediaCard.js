import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import { CardContent, CardMedia } from 'material-ui/Card';
import Typography from '../Typography';
import Button from '../Button';
import Radio from 'material-ui/Radio';
import Bar from '../Bar';
import Video from '../Video/Video';

const MediaCard = props => {
  return (
    <Card
      style={props.settings.card.style}
      raised={props.settings.card.settings.raised}
      elevation={props.selectedCircle === props.circle ? 5 : 1}
    >
      {(props.circle.type.startsWith('IMAGE') && props.circle.string) ||
      props.circle.CardMedia ||
      props.circle.media ? (
        <div style={props.settings.media.style}>
          <CardMedia
            style={{ height: '100%' }}
            image={
              props.circle.type.startsWith('IMAGE') && props.circle.string
                ? props.circle.string
                : props.circle.media && props.circle.media.blob
                  ? props.circle.media.blob.medium
                  : ''
            }
            title={
              (props.circle.media && props.circle.media.title) ||
              props.circle.title
                ? props.circle.media && props.circle.media.title
                  ? props.circle.media.title
                  : props.circle.title
                : ''
            }
          />
        </div>
      ) : null}
      {props.circle.type.startsWith('VIDEO') ? (
        <div style={props.settings.media.style}>
          <Video
            style={props.settings.media.style}
            componentSize={props.size}
            circle={props.circle}
            type={props.circle.type}
          />
        </div>
      ) : null}
      <CardContent>
        <Typography
          type={props.settings.title.settings.type}
          component={props.settings.title.settings.component}
        >
          {props.circle.title}
        </Typography>
        <Typography component={props.settings.description.settings.component}>
          {props.circle.description}
        </Typography>
      </CardContent>
      <div style={{ height: '100%' }} />
      <Bar flexDirection="row-reverse" background="none">
        {props.settings.actions.lines.map(circle => {
          return (() => {
            switch (circle.type) {
              case 'BUTTON':
                return (
                  <Button
                    key={circle.string}
                    dense={circle.settings.dense}
                    color={circle.settings.color}
                    style={circle.style}
                    onClick={
                      props.handleSingleSelection
                        ? () => props.handleSingleSelection(props.circle)
                        : () => {}
                    }
                  >
                    {circle.string}
                  </Button>
                );
              case 'RADIO':
                return (
                  <Radio
                    checked={props.circle === props.selectedCircle}
                    onChange={
                      props.handleSingleSelection
                        ? () => props.handleSingleSelection(props.circle)
                        : () => {}
                    }
                    value={props.circle}
                    name={circle.name}
                  />
                );
              default:
                return null;
            }
          })();
        })}
      </Bar>
    </Card>
  );
};

MediaCard.prototype.propTypes = {
  handleSingleSelection: PropTypes.func,
  circle: PropTypes.object,
  settings: PropTypes.object,
};

export default MediaCard;

/* <CardActions style={props.settings.actions.style}>
        {props.settings.actions.lines.map(circle => {
          return (() => {
            switch (circle) {
              case 'BUTTON':
                return (
                  <Button
                    key={circle.string}
                    dense={circle.settings.dense}
                    color={circle.settings.color}
                    style={circle.style}
                    onClick={() =>
                      props.handleTypeChange('type', props.circle)}
                  >
                    {circle.string}
                  </Button>
                );
              case 'RADIO':
                return (
                  <Radio
                    checked={props.circle === props.type}
                    onChange={() =>
                      props.handleTypeChange('type', props.circle)}
                    value={props.circle}
                    name={circle.name}
                  />
                );
              default:
                return null;
            }
          })();
        })}
      </CardActions> */
