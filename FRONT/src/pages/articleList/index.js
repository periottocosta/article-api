import React, {useState, useEffect} from 'react';

import './style.scss';

import {Container, Table} from 'reactstrap';
import { getArticleList } from '../../utils/connection';

let ArticleList = () =>{
    const [articleList, setArticleList] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        async function getData() {
            let response = await getArticleList()
            
            if(!response.error){
                setLoadingData(false)
                setArticleList(response.data.results)
            }
        }
        if (loadingData) {
            getData();
        }
    }, []);
    
    return(<>
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {articleList.map( el=> (
                        <tr key={el.articleId}>
                            <td>{el.category}</td>
                            <td>{el.title}</td>
                            <td>{el.imageLink}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    </>)
}

export default ArticleList