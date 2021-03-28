import React, {useState, useEffect} from 'react';

import './style.scss';

import {Container, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
//import {make} from "../../utils/connection";

let Login = () =>{
    useEffect(() => {
        async function getData() {
            let response = null //await getArticleList()

            if(!response.error){
                //manageArticleList(response.data)
            }
        }
        
        if (false) {
            //getData();
        }
    }, []);
    
    return(<>
        <Container className="login">
            <h2 className="text-center">Sign In</h2>
            <Form className="form">
                <Col>
                    <FormGroup>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="myemail@email.com"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="********"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <Button block={true}>Login</Button>
                </Col>
            </Form>
        </Container>
    </>)
}

export default Login