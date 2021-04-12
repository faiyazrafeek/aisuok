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

    if(!announcement) return <span></span>

    return (
        <div className={`mb-4 alert alert-${announcement.level === 'info' ? "primary" : "danger"}`} role="alert">
            <h4 className="alert-heading">{announcement.title} </h4>
            <BlockContent
                    blocks={announcement.message}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
            /> 
            <hr />
            <p className="mb-0">{announcement.footer}</p>
        </div>
    )
}

export default Announcement
