import "../assets/styles/_app.scss";
import React from "react";
import { Provider,ReactReduxContext  } from "react-redux";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "../history";

import routes from "./RootRoutes";
import {Store}  from "../redux/Store";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayout";
import AuthGuard from "./auth/AuthGuard";
import ReduxToastr from 'react-redux-toastr';
import Spinner from '../components/matx/MatxLoadable/spinner';
import { ConnectedRouter } from "connected-react-router";
import  { Router} from 'react-router-dom'


const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      {/* <Provider store={Store} context={ReactReduxContext }> */}
      <Provider store={Store}>
      <ReduxToastr
        timeOut={3000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
        <MatxTheme>
          <Auth>
          {/* <ConnectedRouter  history={history} context={ReactReduxContext } baseName='gntv' > */}
          <Router history={history}>
              <AuthGuard>
                <MatxLayout />
              </AuthGuard>
              </Router>
            {/* </ConnectedRouter> */}
          </Auth>
        </MatxTheme>
        <Spinner/>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
