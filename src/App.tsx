import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { TeaCategoriesProvider } from "./tea-categories/TeaCategoriesProvider";

import TeaCategories from "./tea-categories/TeaCategories";
import TeaCategoryEditor from "./tea-categories/editor/TeaCategoryEditor";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <TeaCategoriesProvider>
        <IonRouterOutlet>
          <Route exact path="/tea-categories">
            <TeaCategories />
          </Route>
          <Route path="/tea-categories/edit/:id">
            <TeaCategoryEditor />
          </Route>
          <Route exact path="/tea-categories/add">
            <TeaCategoryEditor />
          </Route>
          <Route exact path="/">
            <Redirect to="/tea-categories" />
          </Route>
        </IonRouterOutlet>
      </TeaCategoriesProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
