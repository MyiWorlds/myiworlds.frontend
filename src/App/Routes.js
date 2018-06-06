import React from 'react';
import { Route, Switch } from 'react-router';

import CreateCircle from './Circle/Mutations/CreateCircle';
import UpdateCircle from './Circle/Mutations/UpdateCircle';
import AddUsername from './User/Mutations/AddUsername';

import CirclesByUserKey from './Circle/Components/CirclesByUserKey';
import CircleBySlug from './Circle/Components/CircleBySlug';
import CircleByKey from './Circle/Components/CircleByKey';
import CirclesByTags from './Circle/Components/CirclesByTags';
import CircleByUsername from './Circle/Components/CircleByUsername';
import CirclesByFilters from './Circle/Components/CirclesByFilters';
import CopyCircle from './Circle/Components/CopyCircle';
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
          <CircleByKey
            user={user}
            uid={props.match.params.uid}
            isPrimaryContent={true}
            {...props}
          />
        )}
      />
      <Route
        exact
        path="/search"
        render={props => <CirclesByTags {...props} isPrimaryContent={true} />}
      />
      <Route
        exact
        path="/create"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CreateCircle {...props} isPrimaryContent={true} />
          )
        }
      />
      <Route
        exact
        path="/update/:uid"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <UpdateCircle
              uid={props.match.params.uid}
              {...props}
              isPrimaryContent={true}
            />
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
            <CopyCircle
              uid={props.match.params.uid}
              {...props}
              isPrimaryContent={true}
            />
          )
        }
      />
      <Route
        exact
        path="/recents"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CirclesByUserKey {...props} isPrimaryContent={true} />
          )
        }
      />
      <Route
        exact
        path="/settings"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <UserSettings user={user} {...props} isPrimaryContent={true} />
          )
        }
      />
      <Route
        exact
        path="/private/home"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : user && user.homePrivate ? (
            <CircleByKey
              user={user}
              uid={user.homePrivate.uid}
              {...props}
              isPrimaryContent={true}
            />
          ) : (
            <AddUsername {...props} />
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
            <CircleByKey
              user={user}
              uid={user.inbox.uid}
              {...props}
              isPrimaryContent={true}
            />
          )
        }
      />
      <Route
        exact
        path="/add-username"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <AddUsername {...props} isPrimaryContent={true} />
          )
        }
      />
      <Route
        exact
        path="/filters"
        render={props => (
          <CirclesByFilters user={user} isPrimaryContent={true} />
        )}
      />
      <Route
        exact
        path="/privacy-policy"
        render={props => (
          <CircleBySlug username="APP" slug="/privacy-policy" {...props} />
        )}
      />
      <Route
        exact
        path="/terms-of-service"
        render={props => (
          <CircleBySlug username="APP" slug="/terms-of-service" {...props} />
        )}
      />
      <Route
        path="/:username"
        render={props => (
          <CircleByUsername username={props.match.params.username} {...props} />
        )}
      />
      <Route
        path="/:username/:slug"
        render={props => (
          <CircleBySlug
            username={props.match.params.username}
            slug={props.match.params.slug}
            isPrimaryContent={true}
            {...props}
          />
        )}
      />
    </Switch>
  );
};

export default Routes;
