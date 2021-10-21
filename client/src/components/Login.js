import * as React from 'react';
import {Button, Form, Nav, Navbar} from "react-bootstrap";
import "../styles/Login.css";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import AuthService from "../services/AuthService";
import {useHistory} from "react-router";

export const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    const  history= useHistory()

    const error = useSelector(state => state.authReducer.error)

    return (
        <div className="Login">
            <header>
                <Navbar bg="dark" variant="dark" fixed="top" className="w-60%">
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/login" disabled>Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <body>
            <br/>
            <Form>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div style={{marginTop: '20px', color:"red"}}>
                    {error && error}
                </div>
                <br/>
                <Button class="btn btn-dark"
                        onClick={() => dispatch(AuthService.loginUser(email, password, history))}>
                    Login
                </Button>
            </Form>
            </body>
        </div>
    );
};