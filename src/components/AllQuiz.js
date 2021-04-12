import React, {useEffect, useState} from 'react'
import sanityClient from '../client'
import {Link} from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import {Helmet} from "react-helmet";
import './AllQuiz.css'

function AllQuiz() {
    const [allQuizData, setAllQuizData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "quiz" ] | order(publishedAt desc){
                title,
                publishedAt,
                slug,
                status,
                "name" : author->name,
            }`
        ) 
        .then((data) => setAllQuizData(data))       
        .catch((err) => console.log(err))
        
    }, [])

    return (
        <div>
            {
                allQuizData && 
                allQuizData.map((quiz, index) => (
                  
                    <div key={quiz.slug.current}>
                  
                    <Helmet>
                    <meta charSet="utf-8" />
                    <title>AIS Quiz | Home</title>
                    </Helmet>
                    <div className="list-group" >
                        <Link to={'/' + quiz.slug.current} className="text-decoration-none">
                            <li className={`list-group-item py-3 mb-3 fs-5 fw-bold d-flex justify-content-between align-items-center ${!quiz.status ? "active" : null}`}>
                                { quiz.title }
                                <span className={`badge ${quiz.status ? 'bg-danger' : 'bg-dark'} rounded-pill`} style={{fontSize: '13px'}}>{ quiz.status ? "Finished" :   <ReactTimeAgo date={quiz.publishedAt} /> }</span>
                            </li>                        
                        </Link>
                     </div>
                    </div>
                ))
            }
        </div>
    )
}

export default AllQuiz

