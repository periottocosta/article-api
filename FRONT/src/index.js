import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//import Login from "./pages/login";
import ArticleList from "./pages/articleList";
import ArticleForm from "./pages/articleForm";

ReactDOM.render(
    <Router>
       <Switch>
            <Route exact path="/" component={ArticleList}/>
            <Route exact path="/form" component={ArticleForm}/>
  	    </Switch>
    </Router>, document.getElementById('root'));