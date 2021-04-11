import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import sanityClient from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react';
import './OnePost.css'


const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
    return builder.image(source);
}

function OnePost() {
    const [postData, setPostData] = useState(null);
    const {slug} = useParams();

    useEffect(() => {
        sanityClient.fetch(
            `*[slug.current == $slug]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                body,
                "name" : author->name,
                "authorImage": author->image
            }`,
            { slug }
        )   
        .then((data) => setPostData(data[0]))       
        .catch((err) => console.log(err))      
    }, [slug])

    if(!postData) return <div>Loading...</div>

    return (
        <div>
            {/* <div>
                <h2>{postData.title}</h2>
                <div>
                    <img id="author"
                        src={ urlFor(postData.authorImage).url() } 
                        alt="Author"
                    />
                    <h4>{postData.name}</h4>
                </div>
            </div> */}
            {/* <img id="main" src={urlFor(postData.mainImage).url()} alt="Main p"/>
            <div>
                <BlockContent
                    blocks={postData.body}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                />
            </div> */}
        </div>
    )
}

export default OnePost
