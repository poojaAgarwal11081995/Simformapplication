import React from 'react';
import { Route, Switch ,Redirect} from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";
import {useCookies } from 'react-cookie';
import Login from '../localauth/login';
import Profile from '../localauth/profile';
import {PROFILE_PATH, LOGIN_PATH} from "../../path";
import {USER_DETAILS} from "../../constant";
function routes() {
    return (
      <div>
<Online>
        <Switch>
        <Route path="/"  exact render={() => <Redirect to="/profile" />}/>
        <Route exact path={LOGIN_PATH} component={Login} />
        <PrivateRoutes exact path={PROFILE_PATH} component={Profile} />   
      </Switch>
      </Online>
      <Offline>
      offline (surprise!)
      </Offline>
      </div>
      
       
    )
}
const PrivateRoutes = ({ component:Component, ...rest }) => {
  const [cookies, setCookie] = useCookies([USER_DETAILS]);
 
  return (
    <Route
      {...rest}
      render={(props) =>
        (cookies[USER_DETAILS] && cookies[USER_DETAILS].email ? (<Component {...props} />) : (<Redirect to="/login" />))
      }
    />
  );
};

export default routes
