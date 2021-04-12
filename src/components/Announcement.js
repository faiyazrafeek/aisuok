import React, { useEffect, useState } from 'react'
import sanityClient from '../client'
import BlockContent from '@sanity/block-content-to-react';

function Announcement() {
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "announcement" ]{
                title,
                slug,
                message,
                footer,
                level,
            }`
        ) 
        .then((data) => setAnnouncement(data[0]))       
        .catch((err) => console.log(err))

    }, [])

    if(!announcement) return (
        <div class="d-flex justify-content-center mt-3" >
            <div className="spinner-border" role="status" style={{width: '2rem', height: '2rem'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    return (
        <div className={`fs-5 mb-4 alert alert-dismissible fade show alert-${announcement.level === 'info' ? "primary" : "danger"}`} role="alert">
            <strong className="fs-4">{announcement.title}</strong> 
            <BlockContent
                blocks={announcement.message}
                projectId={sanityClient.clientConfig.projectId}
                dataset={sanityClient.clientConfig.dataset}
            />
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <hr/>
            <p>{announcement.footer}</p>
        </div>
    )
}

export default Announcement
