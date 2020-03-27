import React from 'react'
import './Credit.css';
import XakPlant from '../CreditsIcon/Xakplant';
import Github from '../CreditsIcon/Github';
import logo from '../../icons/hexound_logo.png'

export const Credits = () => (
    <div className={`credits`}>
        <div>
            <img src={logo} width={`40px`} height={`40px`} alt="chiptune player" title='Hexound v2 (chiptune web-player)'/>
        </div>
        <div className={`credits__title`}>
            Hexound v2 <span>chiptune web-player</span>
        </div>
        <div>
            <a style={{color:"#000000"}}
                title={`Github создателя и автора идеи Hexound`}
                href={`https://github.com/house-of-vanity`} 
                target={`_blank`}
                >
                    <Github width={`30px`} height={`30px`}/>
                </a>
            <a 
                title={`Блог о web-разработке соавтора hexound v2`} 
                target={`_blank`} href={`https://xakplant.ru`}
            >
                <XakPlant width={`30px`} height={`30px`}/>
            </a>
        </div>
    </div>
);