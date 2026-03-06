import React from 'react';
import { getAssetUrl } from '../utils/assetPath';
import './Footer.css';

const psyLogoUrl = getAssetUrl('_assets/images/icons/psyMI_logo.png');

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src={psyLogoUrl} alt="PSY MI" className="footer-logo" />
        </div>
        
        <div className="footer-center">
          <p className="footer-copyright">
            Copyright © 2024. PSY MI. All rights reserved.
          </p>
        </div>
        
        <div className="footer-right">
          <a href="https://www.instagram.com/mi___agency/" className="footer-social-link" aria-label="Instagram" target="_blank" rel="noreferrer">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#347AEC"/>
              <g transform="translate(10, 10)">
                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M16.5,6.5A1.5,1.5 0 1,1 15,5A1.5,1.5 0 0,1 16.5,6.5Z" fill="white" transform="scale(0.83) translate(0.5, 0.5)"/>
              </g>
            </svg>
          </a>
          <a href="https://t.me/mi_agency" className="footer-social-link" aria-label="Telegram" target="_blank" rel="noreferrer">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#347AEC"/>
              <svg x="9.08" y="10.23" width="21.84" height="19.54" viewBox="4 5 9 8">
                <path d="M12.6 5.671 11.248 12.731s-.19.49-.709.255L7.418 10.509l-.014-.007c.421-.392 3.69-3.435 3.832-3.573.222-.214.085-.341-.171-.18L6.235 9.924 4.373 9.275s-.293-.108-.322-.343c-.029-.235.331-.362.331-.362l7.593-3.085s.624-.284.624.186Z" fill="white"/>
              </svg>
            </svg>
          </a>
          <a href="https://www.facebook.com/HRmiagency" className="footer-social-link" aria-label="Facebook" target="_blank" rel="noreferrer">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#347AEC"/>
              <svg x="13.1" y="6.78" width="13.8" height="26.44" viewBox="8 3 6 12">
                <path d="M10.287 9.164h1.768l.278-1.712h-2.046V6.517c0-.712.243-1.342.94-1.342H12.35V3.68c-.197-.025-.614-.08-1.401-.08-1.644 0-2.608.828-2.608 2.713v1.139h-1.69v1.712h1.69v4.705c.335.048.674.08 1.022.08.315 0 .622-.027.925-.066V9.164Z" fill="white"/>
              </svg>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/miagency-ua/" className="footer-social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#347AEC"/>
              <svg x="11.38" y="11.8" width="17.24" height="16.39" viewBox="6 5 8 7">
                <path d="M13.3 9.335v2.482h-1.534V9.486c0-.575-.223-.968-.766-.968-.416 0-.671.272-.767.514-.032.091-.064.212-.064.364v2.422H8.635S8.667 7.882 8.635 7.489H10.169v.605c.192-.303.575-.726 1.374-.726.99 0 1.757.636 1.757 1.967ZM7.038 5.4c-.511 0-.863.333-.863.757 0 .424.319.757.831.757.543 0 .862-.333.862-.757.032-.454-.288-.757-.83-.757ZM6.271 11.817H7.805V7.489H6.271v4.328Z" fill="white"/>
              </svg>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
