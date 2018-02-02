import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../reactComponents/Card';
import { CardContent, CardMedia } from 'material-ui/Card';
import Typography from '../Typography';
import Button from '../../reactComponents/Button';
import Radio from 'material-ui/Radio';
import Bar from '../../reactComponents/Bar';

const MediaCard = props => {
  return (
    <Card
      styles={props.settings.linesFlattend.card.styles}
      raised={props.settings.linesFlattend.card.settings.raised}
      elevation={props.selectedType === props.circle.type ? 5 : 1}
    >
      <CardMedia
        style={props.settings.linesFlattend.media.styles}
        image={props.circle.media.blob.medium}
        title={props.circle.media.title}
      />
      <CardContent>
        <Typography
          type={props.settings.linesFlattend.title.settings.type}
          component={props.settings.linesFlattend.title.settings.component}
        >
          {props.circle.title}
        </Typography>
        <Typography
          component={
            props.settings.linesFlattend.description.settings.component
          }
        >
          {props.circle.description}
        </Typography>
      </CardContent>
      <Bar flexDirection="row-reverse" background="none">
        <div>
          {props.settings.linesFlattend.actions.lines.map(circle => {
            return (() => {
              switch (circle.type) {
                case 'BUTTON':
                  return (
                    <Button
                      key={circle.string}
                      dense={circle.settings.dense}
                      color={circle.settings.color}
                      styles={circle.styles}
                      onClick={() =>
                        props.handleSingleSelection(props.circle.type)}
                    >
                      {circle.string}
                    </Button>
                  );
                case 'RADIO':
                  return (
                    <Radio
                      checked={props.circle.type === props.selectedType}
                      onChange={() =>
                        props.handleSingleSelection(props.circle.type)}
                      value={props.circle.type}
                      name={circle.name}
                    />
                  );
                default:
                  return null;
              }
            })();
          })}
        </div>
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

/* <CardActions style={props.settings.linesFlattend.actions.styles}>
        {props.settings.linesFlattend.actions.lines.map(circle => {
          return (() => {
            switch (circle.type) {
              case 'BUTTON':
                return (
                  <Button
                    key={circle.string}
                    dense={circle.settings.dense}
                    color={circle.settings.color}
                    styles={circle.styles}
                    onClick={() =>
                      props.handleTypeChange('type', props.circle.type)}
                  >
                    {circle.string}
                  </Button>
                );
              case 'RADIO':
                return (
                  <Radio
                    checked={props.circle.type === props.type}
                    onChange={() =>
                      props.handleTypeChange('type', props.circle.type)}
                    value={props.circle.type}
                    name={circle.name}
                  />
                );
              default:
                return null;
            }
          })();
        })}
      </CardActions> */
