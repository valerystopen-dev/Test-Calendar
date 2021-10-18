import './App.css';
import {Switch, Route, BrowserRouter} from "react-router-dom"
import {Register} from "./components/Register";
import {Login} from "./components/Login";
import {EventsList} from "./components/EventsList";

export const App = () => {


  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Register}/>
            <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/calendar" component={EventsList}/>
        </Switch>
      </BrowserRouter>
  );
};

