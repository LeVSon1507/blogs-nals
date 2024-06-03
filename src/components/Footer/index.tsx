/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from 'src/assets/images/content_blog.svg';
import FooterTitle from './FooterTitle';
import FooterLink from './FooterLink';
import { FaFacebookSquare } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io';
import { FaLinkedin } from 'react-icons/fa6';
import { MY_FB_URL, MY_LINKED_URL } from 'src/utils/helper';

const Footer = () => {
  return (
    <footer className="bg-light py-4">
      <div className="container">
        <div className="row center text-center text-md-left">
          <div className="col-md-4 mb-4 mb-md-0">
            <img
              src={logo}
              alt="logoT"
              width={60}
              height={60}
              className="bg-white p-2 mr-3 mb-2 rounded"
            />
            <FooterTitle text={'LVS Blogs'} />
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="#" className="text-dark mr-2">
                <p className="d-flex align-items-center">
                  <IoLogoInstagram className="mr-1" />
                </p>
              </a>
              <a href={MY_FB_URL} className="text-dark mr-2">
                <p className="d-flex align-items-center">
                  <FaFacebookSquare className="mr-1" />
                </p>
              </a>
              <a href={MY_LINKED_URL} className="text-dark">
                <p className="d-flex align-items-center">
                  <FaLinkedin className="mr-1" />
                </p>
              </a>
            </div>
          </div>
          <div className="col-md-4 mt-3 mb-4 mb-md-0">
            <FooterTitle text={'Address'} />
            <FooterLink text={'Da Nang city'} />
            <FooterLink text={'0982123456'} />
            <FooterLink text={'sonlvs1507@gmail.com'} />
            <FooterLink text={'https://blogs-nals.vercel.app/'} />
          </div>
          <div className="col-md-4 mt-3 mb-4 mb-md-0">
            <FooterTitle text={'Functions'} />
            <FooterLink text={'Latest news.'} />
            <FooterLink text={'Analysis and commentary.'} />
            <FooterLink text={'Information search.'} />
            <FooterLink text={'Community connection.'} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
