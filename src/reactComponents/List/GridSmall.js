import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card from '../../reactComponents/Card';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from '../../reactComponents/Button';

const style = {
  mediaContainer: {
    width: '100%',
    height: 125,
  },
  media: {
    height: 75,
  },
  card: {
    minWidth: 180,
    maxWidth: 245,
    width: '100%',
  },
};

const GridSmall = props => {
  return (
    <Card className={props.classes.card}>
      <div
        className={props.classes.mediaContainer}
        style={{
          backgroundImage: `url(${props.circle.media.blob.medium})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backroundPosition: 'center',
        }}
        alt={props.circle.image.title}
      />
      <CardContent>
        <Typography type="headline" component="h2">
          {props.circle.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

GridSmall.prototype.propTypes = {
  circle: PropTypes.object,
};

export default withStyles(style)(GridSmall);
