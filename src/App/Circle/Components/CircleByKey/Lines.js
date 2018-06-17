import React from 'react';
import gql from 'graphql-tag';
import { propType, filter } from 'graphql-anywhere';

import { Link } from 'react-router-dom';
import { Typography, Card, Button } from '@material-ui/core';

import Lines2 from './Lines2';

class Lines extends React.Component {
  static fragments = {
    circle: gql`
      fragment Lines on Circle {
        lines {
          uid
          id
          type
          title
          dateCreated
          dateUpdated
          ...Lines2
        }
      }
      ${Lines2.fragments.circle}
    `,
  };

  static propTypes = {
    circle: propType(Lines.fragments.circle),
  };

  render() {
    const circle = this.props.circle;

    if (circle) {
      return (
        <div>
          {circle.lines
            ? circle.lines.map(circle => {
                return (
                  <Card key={circle.id} style={{ margin: 8 }}>
                    <Typography variant="title">{circle.title}</Typography>
                    <Typography variant="body1">{circle.type}</Typography>
                    <Typography variant="body2">
                      {circle.dateCreated}
                    </Typography>
                    <Typography variant="body2">
                      {circle.dateUpdated}
                    </Typography>
                    {/* Not yet working.  Get this working */}
                    <Lines2 circle={filter(Lines2.fragments.circle, circle)} />
                    <Button component={Link} to={`/uid/${circle.uid}`}>
                      View
                    </Button>
                  </Card>
                );
              })
            : null}
        </div>
      );
    }

    return null;
  }
}

export default Lines;
