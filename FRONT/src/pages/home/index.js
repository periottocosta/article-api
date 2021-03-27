import React, {useState, useEffect} from 'react';

import './style.scss';

import Nav from "../../components/nav";
import Card from "../../components/card";
import {getArticleList} from "../../utils/connection";

let App = () =>{
    const fakeCoverArticleList = [
        {
            articleId: null,
            imageLink: 'empty',
            cardSize: 6   
        },{
            articleId: null,
            imageLink: 'empty',
            cardSize: 3
        },{
            articleId: null,
            imageLink: 'empty',
            cardSize: 3
        }]
    const fakeArticleList = [
        {
            articleId: null,
            imageLink: null,
            cardSize: 4
        },{
            articleId: null,
            imageLink: null,
            cardSize: 4
        },{
            articleId: null,
            imageLink: null,
            cardSize: 4
        }]
    const [loadingData, setLoadingData] = useState(true);
    const [articleList, setArticleList] = useState(fakeArticleList);
    const [coverArticleList, setCoverArticleList] = useState(fakeCoverArticleList);

    useEffect(() => {
        async function getData() {
            let response = await getArticleList()

            if(!response.error){
                manageArticleList(response.data)
            }
        }
        if (loadingData) {
            getData();
        }
    }, []);

    let manageArticleList = (articleList) =>{
        let sumCardsSize = 0
        let coverArticles = []
        let auxArticleList = []
        let defaultCardSize = 4
        let totalRowsByLine = 12
        let totalCardsByLine = 3
        let mainArticleCardSize = 6
        
        articleList.forEach(element => {
            if(element.mainArticle){
                element['cardSize'] = mainArticleCardSize
                
                coverArticles.push(element)
                sumCardsSize += mainArticleCardSize
            }else{
                element['cardSize'] = defaultCardSize
                auxArticleList.push(element)
            }
        })
        
        if(coverArticles.length == 0){
            let article = auxArticleList[0]
            article['cardSize'] = mainArticleCardSize
            sumCardsSize += mainArticleCardSize
            coverArticles.push(article)
            auxArticleList.splice(0, 1)
        }
        
        totalCardsByLine = totalCardsByLine - coverArticles.length
        for (let i = 0; i < totalCardsByLine; i++) {
            let item = auxArticleList[i]
            let mathCardSize = (totalRowsByLine - sumCardsSize) / totalCardsByLine
            item['cardSize'] = mathCardSize
            
            coverArticles.push(item)
        }
        auxArticleList.splice(0, totalCardsByLine)
        
        totalCardsByLine = 3 // reset value
        auxArticleList.forEach(element => {
            element['imageLink'] = null
        })

        setArticleList(auxArticleList);
        setCoverArticleList(coverArticles)
        setLoadingData(false);
    }
    
    return(<>
        <Nav />
        <div className="container article-container">
            <div className="row">

                {coverArticleList.map((item, index) => {
                    return (
                        <Card article={item} key={index} cardSize={item.cardSize}></Card>
                    )
                })}
                <hr></hr>
                {articleList.map((item, index) => {
                    return (
                        <Card article={item} key={index} cardSize={item.cardSize}></Card>
                    )
                })}
            </div>
        </div>
    </>)
}

export default App