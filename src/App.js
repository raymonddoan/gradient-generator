import "./App.css";
import React, { Component } from "react";
import styled from "styled-components";

const getBackGroundColor = ({ degree, backGroundColors }) => {
  let string = `${degree}deg`;

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

class App extends Component {
  state = {
    backgroundColors: ["#d4d4d4", "#34e791", "#000000"],
    degree: 45,
  };

  handleDegreeChange = (event) => {
    const newDegree = event.target.value;
    this.setState({ degree: newDegree });
  };

  handleColourChange = (event, index) => {
    // console.log(event.target.value)
    const newColor = event.target.value;

    // Create a copy of the backGroundColor array
    const newBackgroundColor = [...this.state.backgroundColors];
    // Change value of array
    newBackgroundColor[index] = newColor;
    // Set new array as new state
    this.setState({ backgroundColors: newBackgroundColor }); // this will conduct the render method
  };

  render() {
    const { degree, backgroundColors: backgroundColors } = this.state;

    return (
      // Pass chosen color into main and set background
      <StyledMain backGroundColors={backgroundColors} degree={degree}>
        <h1>CSS Gradient Generator</h1>
        <div>
          Angle:
          <input
            type="number"
            value={degree}
            onChange={(event) => this.handleDegreeChange(event)}
            style={{ width: "100px" }}
          />
          {backgroundColors.map((color, index) => {
            return (
              <div key={index}>
                Colour #{index + 1}:{" "}
                <input
                  type="color"
                  value={color}
                  onChange={(event) => this.handleColourChange(event, index)}
                />
              </div>
            );
          })}
          {/* Colour #2: <input type="color" /> */}
        </div>
      </StyledMain>
    );
  }
}

export default App;
