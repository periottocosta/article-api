import axios from 'axios';

const connectServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL
    //baseURL: 'https://django-exemple-deploy.herokuapp.com/api'
});

export const getArticleList = async () =>{
    let response = {
        data: null,
        error: false,
        connectionFail: false,
    };

    await connectServer.get('article').then((articleList)=>{
        response.data = articleList.data
        console.warn(response)
    })
    .catch(function (error) {
        console.log(error);
        response.error = true;
        response.connectionFail = true;
    });
    
    return response;
}

export const getArticleByID = async (articlleId) =>{
    let response = {
        data: null,
        error: false,
        connectionFail: false,
    };

    await connectServer.get('article' + articlleId).then((article)=>{
        response.data = article.data
    })
    .catch((error)=>{
        console.log(error);
        response.error = true;
        response.connectionFail = true;
    });

    return response;
}

export const updateArticle = async (article) =>{
    const { id, title, category, imageLink, introText, articleBody } = article;
    
    let response = {
        data: null,
        error: false,
        connectionFail: false,
    };

    await connectServer.put('article/'+ id, {
        'title': title,
        'category': category,
        'imageLink': imageLink,
        'introText': introText,
        'articleBody': articleBody,
    })
    .then((article)=>{
        response.data = article.data
    })
    .catch((error)=>{
        console.log(error);
        response.error = true;
        response.connectionFail = true;
    });

    return response;
}

export let newArticle = async (article) =>{
    const { title, category, imageLink, introText, articleBody } = article;
    
    let response = {
        data: null,
        error: false,
        connectionFail: false,
    };

    await connectServer.post('article', {
        'title': title,
        'category': category,
        'imageLink': imageLink,
        'introText': introText,
        'articleBody': articleBody,
    })
    .then((article)=>{
        response.data = article.data
    })
    .catch((error)=>{
        console.log(error);
        response.error = true;
        response.connectionFail = true;
    });

    return response;
}

export let deleteArticle = async (id) =>{
    
    let response = {
        data: null,
        error: false,
        connectionFail: false,
    };

    await connectServer.delete('article/'+ id).then((article)=>{
        response.data = article.data
    })
    .catch((error)=>{
        console.log(error);
        response.error = true;
        response.connectionFail = true;
    });

    return response;
}