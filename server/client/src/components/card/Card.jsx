import React from "react";
import './Card.css';

const Card = ({ picurl, title }) => {
    return (
        <div className='card'>
            <img className='pic' src={picurl} alt='' />
            <div className='title'>{title}</div>
            
        </div>
    );
};

export default Card;
