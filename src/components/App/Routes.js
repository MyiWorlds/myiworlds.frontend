import React from 'react';
import { Route, Switch } from 'react-router';

import CreateCircle from '../../mutations/CreateCircle';
import UpdateCircle from '../../mutations/UpdateCircle';
import AddUsername from '../../mutations/AddUsername';

import CirclesByUserKey from '../CirclesByUserKey';
import CircleBySlug from '../CircleBySlug';
import CircleByKey from '../CircleByKey';
import CirclesByTags from '../CirclesByTags';
import CopyCircle from '../CopyCircle';
import UserSettings from './UserSettings';
import PleaseLogin from './PleaseLogin';

const Routes = props => {
  const { user } = props;
  return (
    <Switch>
      <Route exact path="/" render={props => <CirclesByUserKey {...props} />} />
      <Route
        path="/id/:_id"
        render={props => (
          <CircleByKey user={user} _id={props.match.params._id} {...props} />
        )}
      />
      <Route
        exact
        path="/search"
        render={props => <CirclesByTags {...props} />}
      />
      <Route
        exact
        path="/create"
        render={props =>
          user._id === 'GUEST' ? <PleaseLogin /> : <CreateCircle {...props} />
        }
      />
      <Route
        exact
        path="/update/:_id"
        render={props =>
          user._id === 'GUEST' ? (
            <PleaseLogin />
          ) : (
            <UpdateCircle _id={props.match.params._id} {...props} />
          )
        }
      />
      <Route
        exact
        path="/copy/:_id"
        render={props =>
          user._id === 'GUEST' ? (
            <PleaseLogin />
          ) : (
            <CopyCircle _id={props.match.params._id} {...props} />
          )
        }
      />
      <Route
        exact
        path="/recents"
        render={props =>
          user._id === 'GUEST' ? (
            <PleaseLogin />
          ) : (
            <CirclesByUserKey {...props} />
          )
        }
      />
      <Route
        exact
        path="/settings"
        render={props =>
          user._id === 'GUEST' ? (
            <PleaseLogin />
          ) : (
            <UserSettings user={user} {...props} />
          )
        }
      />
      <Route
        exact
        path="/private/home"
        render={props =>
          user._id === 'GUEST' ? (
            <PleaseLogin />
          ) : (
            <CircleByKey user={user} _id={user.homePrivate._id} {...props} />
          )
        }
      />
      <Route
        exact
        path="/inbox"
        render={props =>
          user._id === 'GUEST' ? (
            <PleaseLogin />
          ) : (
            <CircleByKey user={user} _id={user.inbox._id} {...props} />
          )
        }
      />
      <Route
        exact
        path="/add-username"
        render={props =>
          user._id === 'GUEST' ? <PleaseLogin /> : <AddUsername {...props} />
        }
      />
      <Route
        path="/:slug"
        render={props => (
          <CircleBySlug slug={props.match.params.slug} {...props} />
        )}
      />
    </Switch>
  );
};

export default Routes;
