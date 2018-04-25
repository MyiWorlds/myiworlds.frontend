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
        path="/uid/:uid"
        render={props => (
          <CircleByKey user={user} uid={props.match.params.uid} {...props} />
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
          !user ? <PleaseLogin /> : <CreateCircle {...props} />
        }
      />
      <Route
        exact
        path="/update/:uid"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <UpdateCircle uid={props.match.params.uid} {...props} />
          )
        }
      />
      <Route
        exact
        path="/copy/:uid"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CopyCircle uid={props.match.params.uid} {...props} />
          )
        }
      />
      <Route
        exact
        path="/recents"
        render={props =>
          !user ? <PleaseLogin /> : <CirclesByUserKey {...props} />
        }
      />
      <Route
        exact
        path="/settings"
        render={props =>
          !user ? <PleaseLogin /> : <UserSettings user={user} {...props} />
        }
      />
      <Route
        exact
        path="/private/home"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CircleByKey user={user} uid={user.homePrivate.uid} {...props} />
          )
        }
      />
      <Route
        exact
        path="/inbox"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CircleByKey user={user} uid={user.inbox.uid} {...props} />
          )
        }
      />
      <Route
        exact
        path="/add-username"
        render={props => (!user ? <PleaseLogin /> : <AddUsername {...props} />)}
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
