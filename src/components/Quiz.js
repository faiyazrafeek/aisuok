import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import sanityClient from '../client'
import BlockContent from '@sanity/block-content-to-react';
import { Link } from 'react-router-dom'
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
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    )

    return (
        <div>
            <Link to="/" class="btn btn-outline-dark btn-sm mb-4" >Back</Link>

            <div>
                <h3 className="mb-3">{quizData.title}</h3>
            </div>           
            <div>
                <BlockContent
                    blocks={quizData.question}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                /> 
                <hr/>
                <h3 className="my-4">Answer</h3>         
                <BlockContent
                    blocks={quizData.answer}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                />
            </div>
        </div>
    )
}

export default Quiz
