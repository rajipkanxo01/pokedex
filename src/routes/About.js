import React from "react";
import Background from "../components/Background";
import "../css/About.css";

import Ash from "../images/Ash.png";

export default function About() {
  return (
    <>
      <Background />
      <AboutContainer />
    </>
  );
}

function AboutContainer() {
  return (
    <div className="about-container">
      <div className="parent-container">
        <div className="textbox">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            rutrum lobortis mollis. In consequat enim eros. Sed ut accumsan
            neque. Morbi aliquam tincidunt sodales. Aenean velit orci, facilisis
            quis aliquet sed, scelerisque non neque. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Nam tempus lacus a rhoncus fermentum. Donec posuere ex in dui
            consectetur, non convallis lectus ultrices. Aliquam sodales eget
            felis et sollicitudin. Aenean accumsan eget lorem quis hendrerit.
            Vivamus dictum ipsum fermentum leo ultrices eleifend. Integer
            consectetur et justo a dapibus. Aliquam sodales convallis lacus vel
            scelerisque. Nullam id pellentesque tellus, dictum pretium eros.
            Quisque rhoncus orci ac velit iaculis auctor. Pellentesque
            condimentum lacinia metus sit amet tempus.
          </p>

          <p>
            Vestibulum feugiat accumsan nisi non vehicula. Curabitur facilisis
            cursus enim quis condimentum. Mauris auctor elementum sapien sed
            molestie. Nulla non nunc ut nulla interdum finibus. Nullam interdum,
            lectus a lacinia sollicitudin, purus justo pretium quam, sed
            consequat odio urna vel felis. Curabitur viverra enim sed consequat
            imperdiet. Duis elementum urna pulvinar erat dictum dignissim.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Morbi sagittis bibendum magna.
          </p>
        </div>
        <div className="imageBox">
          <img src={Ash} className="ash-image" alt="" />
        </div>
      </div>
    </div>
  );
}
