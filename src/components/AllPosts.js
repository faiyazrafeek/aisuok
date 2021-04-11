import React, {useEffect, useState} from 'react'
import sanityClient from '../client'
import {Link} from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'

function AllPosts() {
    const [allPostData, setAllPostsData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "post" ]{
                title,
                _updatedAt,
                slug,
                "name" : author->name,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                body
            }`
        ) 
        .then((data) => setAllPostsData(data))       
        .catch((err) => console.log(err))
        
    }, [])


    return (
        <div>
            {
                allPostData && 
                allPostData.map((post, index) => (
                    <Link to={'/' + post.slug.current} key={post.slug.current} className="list-group text-decoration-none">
                        <div href="#" className="list-group-item list-group-item-action mb-3" key={index}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{post.title}</h5>
                                <small> <ReactTimeAgo date={post._updatedAt} /> </small>
                            </div>
                            <p className="mb-1"> Test </p>
                            <small>By {post.name}</small>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default AllPosts

