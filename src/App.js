import "./App.css";
import React, { useState } from "react";
import styled from "styled-components";

const getBackGroundColor = ({ degree, backGroundColors }) => {
  let string = `${degree || 135}deg`;

  for (let i = 0; i < backGroundColors.length; i++) {
    string += `, ${backGroundColors[i]}`;
  }

  return string;
};

// Styling the webpage
const StyledMain = styled.main`
  background-image: linear-gradient(${getBackGroundColor});
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

const App = () => {
  const [backgroundColors, setBackgroundColors] = useState(["#d4d4d4", "#34e791", "#000000"])
  const [degree, setDegree] = useState(45)

  const handleColorChange = (event, i) => {
    const newColor = event.target.value

    const newBackgroundColors = [...backgroundColors]

    newBackgroundColors[i] = newColor

    setBackgroundColors(newBackgroundColors)
  }

  const handleDegree = (event) => {
    const newDegree = event.target.value
    setDegree(newDegree)
  }

  return (
    <StyledMain backgroundColors={backgroundColors} degree={degree}>
      <h1>CSS Gradient Generator</h1>
      <div>
        Angle:
        <input
          type="number"
          value={degree}
          onChange={(event) => handleDegree(event)}
          style={{ width: "100px" }}
        />
        {backgroundColors.map((color, index) => {
          return (
            <div key={index}>
              Colour #{index + 1}:{" "}
              <input
                key={color}
                type="color"
                value={color}
                onChange={(event) => handleColorChange(event, index)}
              />
            </div>
          );
        })}
        {/* Colour #2: <input type="color" /> */}
      </div>
    </StyledMain>
  )
}

export default App;
