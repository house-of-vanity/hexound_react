import React from 'react'
import './Credit.css';
import XakPlant from '../CreditsIcon/Xakplant';
import Github from '../CreditsIcon/Github';

export const Credits = () => (
    <div className={`credits`}>
        <diiv>
            <span>Hexound v2</span>
        </diiv>
        <div>
            <a style={{color:"#000000"}}
                title={`Github создателя и автора идеи Hexound`}
                href={`https://github.com/house-of-vanity`} 
                target={`_blank`}
                >
                    <Github width={`40px`} height={`40px`}/>
                </a>
            <a 
                title={`Блог о web-разработке соавтора hexound v2`} 
                target={`_blank`} href={`https://xakplant.ru`}
            >
                <XakPlant width={`40px`} height={`40px`}/>
            </a>
        </div>
    </div>
);