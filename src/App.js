import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const getBackgroundCSS = ( degree, backgroundColors ) => {
  let string = `background: linear-gradient(${degree || 135}deg,`;
  string += backgroundColors.join(",")
  string += ");"

  return string;
};

// Styling the webpage
const StyledMain = styled.main`
  ${props => props.backgroundCSS}
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

const updateLocalStorage = (degree, backgroundColors) => {
  // JSON stringify state
  const stringDegree = JSON.stringify(degree)
  const stringBackgroundColors = JSON.stringify(backgroundColors)
  // save string to localstorage
  localStorage.setItem('degree', stringDegree)
  localStorage.setItem('backgroundColors', stringBackgroundColors)
}

const getFromLocalStorage = () => {
  const degree = localStorage.getItem('degree')
  const colors = localStorage.getItem('backgroundColors')
  if (!colors) {
    return null
  }
  return [JSON.parse(degree), JSON.parse(colors)]
}

const App = () => {
  const [backgroundColors, setBackgroundColors] = useState(["#d4d4d4", "#34e791", "#000000"])
  const [degree, setDegree] = useState(45)

  // Initial run
  useEffect(() => {
    const [degree, backgroundColors] = getFromLocalStorage()
    if (backgroundColors) {
      setBackgroundColors(backgroundColors)
    }
    if (degree) {
      setDegree(degree)
    }
  }, [])

  // Runs everytime there is a change
  useEffect(() => {
    updateLocalStorage(degree, backgroundColors)
  }, [degree, backgroundColors])

  const handleColorChange = (event, i) => {
    const newColor = event.target.value
    const newBackgroundColors = [...backgroundColors]
    newBackgroundColors[i] = newColor
    setBackgroundColors(newBackgroundColors)
  }
  
  const backgroundCSS = getBackgroundCSS(degree, backgroundColors)
  
  const addColor = () => {
    // clone the existing
    const newBackgroundColors = [...backgroundColors]
    // add new color at the end
    newBackgroundColors.push("#ffffff")
    // set it into state
    setBackgroundColors(newBackgroundColors)
  }

  const removeColor = (index) => {
    // clone
    const newBackgroundColors = [...backgroundColors]
    // remove
    newBackgroundColors.splice(index, 1)
    // set to state
    setBackgroundColors(newBackgroundColors)
  }

  const handleDegree = (event) => {
    const newDegree = event.target.value
    setDegree(newDegree)
  }

  return (
    <StyledMain backgroundCSS={backgroundCSS}>
      <h1>CSS Gradient Generator</h1>
      <div>
        Angle:
        <input
          type="number"
          value={degree}
          onChange={(event) => handleDegree(event)}
          style={{ width: "100px" }}
        />
        {backgroundColors.map((color, index) => (
          <div key={`${index}${color}`}>
            Colour #{index + 1}:{" "}
            <input
              type="color"
              value={color}
              onChange={(event) => handleColorChange(event, index)}
            />
            {backgroundColors.length > 2 && <button onClick={() => removeColor(index)}>Remove Colour</button>}
          </div>
          )
        )}
        <br />
        <button type="submit" onClick={addColor}>Add Colour</button>
        <p>{backgroundCSS}</p>
      </div>
    </StyledMain>
  )
}

export default App;
