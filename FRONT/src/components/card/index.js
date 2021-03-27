import React from 'react';

import './style.scss';

let Card = (props) => {
    let article = props.article
    let cardSize = props.cardSize

    let cardText = (<><div></div><div></div></>)
    let cardImage = null
    let cardTitle = null
    let cardAuthor = null
    let cardCategory = null
    let cardClassName = 'card empty-card'
    let cardGridSizeClassName = `col-12 col-sm-6 col-xl-${cardSize}`
    
    if(article.articleId != null){
        cardTitle = article.title
        cardImage = (<img src={article.imageLink} alt="" ></img>)
        cardAuthor = (<><div></div>  by Author</>)
        cardCategory = article.category 
        cardClassName = 'card'
        
        if(!article.mainArticle){
            cardText = article.introText
        }else{
            
            cardGridSizeClassName = `col-12 col-xl-${cardSize}`
            cardClassName = 'card main-article-card'
        }
    }

    return (
        <div className={cardGridSizeClassName}>
            <div className={cardClassName}>
                <div className="card-header">{cardCategory}</div>
                
                {article.imageLink != null ? (
                    <div className="card-img">{cardImage}</div>
                ) : (null)}
                
                <div className="card-title">{cardTitle}</div>
                <div className="card-author">{cardAuthor}</div>
                
                {cardText != null ? (
                    <div className="card-text">{cardText}</div>
                ) : (null)}
            </div>
        </div>
    );
}

export default Card