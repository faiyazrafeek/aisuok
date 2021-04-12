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
        <div class="d-flex justify-content-center" >
            <div className="spinner-border" role="status" style={{width: '2.5rem', height: '2.5rem'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
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
            <Link to="/" className="btn btn-outline-dark mt-4 float-end mb-5" >Back</Link>
            <div className="clearfix"></div>
        </div>
    )
}

export default Quiz
