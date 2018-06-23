import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

import { Link } from 'react-router-dom';
import { Typography, Card, Button } from '@material-ui/core';

class Lines2 extends React.Component {
  static fragments = {
    circle: gql`
      fragment Lines2 on Circle {
        lines {
          uid
          id
          type
          title
          dateCreated
          dateUpdated
        }
      }
    `,
  };

  static propTypes = {
    circle: propType(Lines2.fragments.circle),
  };

  render() {
    const circle = this.props.circle;

    return (
      <Card style={{ margin: 8 }}>
        {circle.lines
          ? circle.lines.map(circle => {
              return (
                <Card key={circle.id} style={{ margin: 8 }}>
                  <Typography variant="title">{circle.title}</Typography>
                  <Typography variant="body1">{circle.type}</Typography>
                  <Typography variant="body2">{circle.dateCreated}</Typography>
                  <Typography variant="body2">{circle.dateUpdated}</Typography>
                  <Button component={Link} to={`/uid/${circle.uid}`}>
                    View
                  </Button>
                </Card>
              );
            })
          : null}
      </Card>
    );
  }
}

export default Lines2;