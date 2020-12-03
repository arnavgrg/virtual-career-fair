import React from "react";
import {Card, Button, Image, Table, Form} from "react-bootstrap";
import Countdown from "react-countdown";

const Completionist = () => <span>Career fair ended.</span>;

export default class RecruiterLivePage extends React.Component {
    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
        };
  render() {
    const students = ['Denise Wang', 'Siddharth Joshi', 'Arnav Garg'];
    const items = []
  
    for (const [index, value] of students.entries()) {
      items.push(
        <tr>
            <td>{value}</td>
            <td>Full-time software engineering (frontend)</td>
            <td>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </td>
            <td><Button size="sm" variant="outline-dark" onClick={this.handleRoute("/recruiter-resume")}>View Resume</Button></td>
        </tr>
      )
    }

    return (
      <div style={{padding: "20px", "textAlign": "center"}}>
        <Card style={{"padding": "20px", "boxShadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
            <h2><b>Live Career Fair:</b> UCLA Engineering Tech Fair</h2>
            <h5>Students in queue for Google full-time software engineering roles.</h5>
        </Card>
        <br></br>
        <Card style={{"padding": "20px", "boxShadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
            <h4>
                <b>Time left in career fair:</b>
            </h4>
            <h5>
                <Countdown date={Date.now() + 500000000}>
                    <Completionist />
                </Countdown>
            </h5>
            <h6></h6>
            <h4>
                <b>Students remaining in queue:</b>
            </h4>
            <h5> 4 students</h5>
            <h6></h6>
            <h4>
                <b>Join next meeting:</b>
                <h6></h6>
                <Button size="sm" variant="outline-success" onClick={this.handleRoute("/recruiter-video-call")}>Join Now</Button>
            </h4>
        </Card>
        <br></br>
        <Card style={{padding: "20px", "boxShadow": "8px 4px 8px 4px rgba(0,0,0,0.2)"}}>
            <h3>Notes for student applicants.</h3>
            <p></p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Interests</th>
                    <th style={{"width": "40%"}}>Notes</th>
                    <th>Resume</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {items}
                    <tr>
                    <td>Arnav Garg</td>
                    <td>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button size="sm" variant="outline-dark">Save</Button>        
                    </td>
                    <td>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button size="sm" variant="outline-dark">Save</Button>
                    </td>
                    <td><Button size="sm" variant="outline-dark" onClick={this.handleRoute("/recruiter-resume")}>View Resume</Button></td>
                    </tr>
                </tbody>
            </Table>
        </Card>
      </div>
    );
  }
}
