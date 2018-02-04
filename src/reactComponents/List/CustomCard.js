import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../reactComponents/Card';
import { CardContent, CardMedia } from 'material-ui/Card';
import Typography from '../Typography';
import Button from '../../reactComponents/Button';
import Radio from '../../reactComponents/Radio';
import Bar from '../../reactComponents/Bar';

const CustomCard = props => {
  return (
    <Card
      style={props.settings.card.style}
      raised={props.settings.card.settings.raised}
    >
      <CardMedia
        style={props.settings.media.style}
        image={props.circle.media.blob.medium}
        title={props.circle.media.title}
      />
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
      <Bar flexDirection="row-reverse" background="none">
        <div>
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
                      onClick={() =>
                        props.handleTypeChange('type', props.circle.type)
                      }
                    >
                      {circle.string}
                    </Button>
                  );
                case 'RADIO':
                  return (
                    <Radio
                      checked={props.circle.type === props.type}
                      onChange={() =>
                        props.handleTypeChange('type', props.circle.type)
                      }
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

CustomCard.prototype.propTypes = {
  handleTypeChange: PropTypes.func.isRequired,
  circle: PropTypes.object,
};

export default CustomCard;
