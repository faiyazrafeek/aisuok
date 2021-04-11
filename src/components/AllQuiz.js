import React, {useEffect, useState} from 'react'
import sanityClient from '../client'
import {Link} from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'

function AllQuiz() {
    const [allQuizData, setAllQuizData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "quiz" ]{
                title,
                publishedAt,
                slug,
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
                    <div className="list-group">
                        <Link to={'/' + quiz.slug.current} key={quiz.slug.current} className="text-decoration-none">
                            <li class="list-group-item py-3 mb-3 fs-5 fw-bold d-flex justify-content-between align-items-center">
                                {quiz.title}
                                <span class="badge bg-primary rounded-pill" style={{fontSize: '13px'}}><ReactTimeAgo date={quiz.publishedAt} /></span>
                            </li>                        
                        </Link>
                     </div>
                ))
            }
        </div>
    )
}

export default AllQuiz

