import React from 'react'
import {Helmet} from "react-helmet";


const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Benvingut a la Botiga Online',
    description: 'Troba allò que busques al millor preu',
    keywords: 'Electrònica, Informàtica, Gaming, Videojocs, Components, PC'
}

export default Meta

