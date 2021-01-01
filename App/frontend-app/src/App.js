import React from "react";
import "./App.css";
//Import Components
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import QuestionList from "./scenes/QuestionList/QuestionList";
import QuestionForm from "./scenes/QuestionForm/QuestionForm";

const App = () => {
  return (
    <div>
      <div className="home-header">
        <h1>Question App</h1>
      </div>
      <div className="content">
        <Router>
          <Switch>
            <Route exact path="/">
              <QuestionList />
              <Link to="/questions">
                <button className="submit-button" type="button">Submit Question</button>
              </Link>
            </Route>
            <Route path="/questions">
              <QuestionForm />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
