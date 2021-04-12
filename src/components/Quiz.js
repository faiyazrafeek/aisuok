import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import sanityClient from '../client'
import BlockContent from '@sanity/block-content-to-react';
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";
import './OnePost.css'


function Quiz() {
    const [quizData, setQuizData] = useState(null);
    const {slug} = useParams();

    useEffect(() => {
        sanityClient.fetch(
            `*[slug.current == $slug]{
                title,
                slug,
                "name" : author->name,
                question,
                answer,
            }`,
            { slug }
        )   
        .then((data) => setQuizData(data[0]))       
        .catch((err) => console.log(err))      
    }, [slug])

    if(!quizData) return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>AIS Quiz | {quizData.title}</title>
            </Helmet>          
            <div>
                <h3 className="text-center mb-4">{quizData.title}</h3>
            </div>           
            <div>
                <BlockContent
                    blocks={quizData.question}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                /> 
                <hr className="my-4"/>
                <h3 className="mb-4">Answer</h3>         
                <BlockContent
                    blocks={quizData.answer}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                />
            </div>
            <Link to="/" className="btn btn-outline-dark btn-sm mt-4" >Back</Link>
        </div>
    )
}

export default Quiz
