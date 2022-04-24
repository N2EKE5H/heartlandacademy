import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const SocialMedia = styled.div`
  a {
    color: #fff;
  }
`;

const Footer = () => {
  const getYear = () => {
    const d = new Date();
    let year = d.getFullYear();
    return year;
  };

  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4">
        <SocialMedia className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </SocialMedia>

        <section className="mb-5 p-2">
          <h3 className="text-white">
            Creating Opportunity Through Education!!!
          </h3>
        </section>
        <section className="">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase text-white">Heartland Academy</h5>
              <p>
                Heartland Academy(HA) is a democratic school practicing quality
                and non-violent education which provides co-educational
                education from nursery all the way through to Plus Two.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase text-white">Useful Links</h5>

              <ul className="list-unstyled mb-0">
                <StyledLink to="/">
                  <li>
                    <a className="text-white">Home</a>
                  </li>
                </StyledLink>

                <StyledLink to="/careers">
                  <li>
                    <a className="text-white">Careers</a>
                  </li>
                </StyledLink>

                <StyledLink to="/about">
                  <li>
                    <a className="text-white">About Us</a>
                  </li>
                </StyledLink>

                <StyledLink to="/news">
                  <li>
                    <a className="text-white">News</a>
                  </li>
                </StyledLink>

                <StyledLink to="/gallery/albums">
                  <li>
                    <a className="text-white">Gallery</a>
                  </li>
                </StyledLink>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase text-white">Links To CLCR</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    href="https://www.forchildrights.org"
                    target="_blank"
                    className="text-white"
                  >
                    Introduction To CLCR
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.forchildrights.org"
                    target="_blank"
                    className="text-white"
                  >
                    Learn more about CLCR
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase text-white">Follow Us</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    href="#!"
                    target="_blank"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fab fa-facebook-f mt-3 mr-2"></i>Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    target="_blank"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fab fa-twitter mt-3 mr-2"></i>Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    target="_blank"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fab fa-instagram mt-3 mr-2"></i>Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    target="_blank"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fab fa-github mt-3 mr-2"></i>Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Copyright © {`${getYear()}`}, Heartland Academy
      </div>
    </footer>
  );
};

export default Footer;
