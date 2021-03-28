import React, {useState, useEffect} from 'react';

import './style.scss';

import {Container, Col, Form, FormGroup, Input, Button} from 'reactstrap';
import {newArticle} from "../../utils/connection";

let ArticleForm = () =>{
    const saveArticle = async (event) => {
        
        event.preventDefault();
        let title = document.getElementById('title').value
        let category = document.getElementById('category').value
        let imageLink = document.getElementById('imageLink').value
        let introText = document.getElementById('introText').value
        let articleBody = document.getElementById('articleBody').value
        
        let response = await newArticle({title, category, imageLink, introText, articleBody})
        console.log(response)
    }
    
    return(
        <Container>
            <h2 className="text-center">Salvar artigo</h2>
            <Form className="form" onSubmit={saveArticle}>
                <Col>
                    <FormGroup>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Titulo"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input
                            type="text"
                            name="category"
                            id="category"
                            placeholder="Categoria"
                        />
                    </FormGroup>
                </Col>

                <Col>
                    <FormGroup>
                        <Input
                            type="text"
                            name="imageLink"
                            id="imageLink"
                            placeholder="imageLink"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input
                            type="text"
                            name="introText"
                            id="introText"
                            placeholder="introText"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input
                            type="text"
                            name="articleBody"
                            id="articleBody"
                            placeholder="articleBody"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <Button block={true}>ArticleForm</Button>
                </Col>
            </Form>
        </Container>
    )
}

export default ArticleForm