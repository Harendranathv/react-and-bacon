import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Bungee+Hairline|Bungee+Shade|Raleway:400,700');

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    background-color: #f8fafa;
    margin: 0;
    font-size: 1rem;
    font-family: Raleway, sans-serif;
    line-height: 1.5rem;
  }
`

const Card = styled.div`
  background-color: white;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05), 0px 0px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
`

const StyledInput = styled.input`
  border: 1px solid #e0e4e4;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05) inset;
  font-size: 1.2rem;
  padding: 0.75rem;
  width: 100%;
  display: block;

  &:focus {
    outline: none;
    box-shadow:
      2px 2px 3px rgba(0, 0, 0, 0.05) inset,
      0 0 1.5pt 1.5pt #4488dd;
  }
`

function App() {
  let title = "Contribudence"

  return (
    <div className="App">
      <GlobalStyle />
      <h1 css={css`
        text-align: center;
        font-size: 0.35rem;
        font-family: "Bungee Shade";
      `}>
        {Array.from(title).map((char, i) =>
          <span
            key={i}
            css={css`
              font-size: ${Math.pow(1 + Math.abs((title.length - 1)/2 - i)/(title.length-1)*3, 4)/16+4}em;
              vertical-align: -0.67em;
            `}>
            {char}
          </span>
        )}
      </h1>
      <Card css={css`
        margin: 2rem auto;
        max-width: 340px;
      `}>
        <StyledInput
          autoFocus
          type="email"
        />
      </Card>
      <footer css={css`
        line-height: 1.8rem;
        padding: 0 2rem;
        margin: 3rem auto;
        font-size: 0.9rem;
        text-align: center;
        max-width: 540px;

        &, a {
          color: #aab;
        }
      `}>
        View this site's <a href="https://github.com/frontarm/react-and-bacon">source at GitHub</a>. Learn to build it with <a href="http://frontarm.com/courses/react-and-bacon">React &amp; Bacon</a>.
        Copyright &copy; 2019 Seven Stripes Kabushiki Kaisha
      </footer>
    </div>
  );
}

export default App;
