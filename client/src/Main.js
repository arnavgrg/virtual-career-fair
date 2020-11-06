import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { SearchPage, StudentProfilePage, HomePage, SearchResultsPage, RouteNotFound, StudentLivePage, RecruiterProfilePage, ManageFairPage, CreateFairPage, OrganizerPage, LoginPage, RecruiterAddEditBoothPage } from "./Pages";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class Main extends React.Component {
  state = {
    searchText: ""
  };

  handleRoute = route => () => {
    this.props.history.push({ pathname: route });
  };

  handleSearchInput = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  handleSearchSubmit = () => {
    if (this.state.searchText) {
      this.props.history.push({
        pathname: "/results",
        state: {
          searchText: this.state.searchText
        }
      });
    } else {
      alert("Please enter some search text!");
    }
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link onClick={this.handleRoute("/")}>JobZ</Nav.Link>
            <Nav.Link onClick={this.handleRoute("/student")}>Students</Nav.Link>
          </Nav>
          <Form inline>
            
            <Button onClick={this.handleRoute("/search")} variant="outline-info">
              Searching for Something Specific?
            </Button>
          </Form>
        </Navbar>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/student" component={StudentProfilePage} />
          <Route exact path="/results" component={SearchResultsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/org" component={OrganizerPage} />
          <Route exact path="/createfair" component={CreateFairPage} />
          <Route exact path="/managefair" component={ManageFairPage} />
          <Route exact path="/studentlive" component={StudentLivePage} />
          <Route exact path="/recruiter" component={RecruiterProfilePage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/add-edit-booth" component={RecruiterAddEditBoothPage} />
          <Route component={RouteNotFound} />
        </Switch>
      </>
    );
  }
}

export default withRouter(Main);
