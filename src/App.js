import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components/macro';

const media = {
  smallPlus: (...args) => css`
    @media screen and (min-width: 360px) {
      ${css.apply(null, args)}
    }
  `,
  mediumPlus: (...args) => css`
    @media screen and (min-width: 720px) {
      ${css.apply(null, args)}
    }
  `
}

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

  ${media.mediumPlus`
    padding: 1.5rem 2rem 1.5rem 2.5rem;
  `}
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

const Gutter = styled.div`
  margin: 1rem;
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

        ${media.smallPlus`
          font-size: 0.42rem;
        `}
        ${media.mediumPlus`
          font-size: 0.8rem;
          line-height: 100px;
        `}
      `}>
        {Array.from(title).map((char, i) => {
          let hue = Math.floor(360*i/title.length)

          return (
            <span
              key={i}
              css={css`
                color: hsl(${hue}, 60%, 53%);
                font-size: ${Math.pow(1 + Math.abs((title.length - 1)/2 - i)/(title.length-1)*3, 4)/16+4}em;
                vertical-align: -0.67em;
                text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
                line-height: 70px;
              `}>
              {char}
            </span>
          )
        })}
      </h1>
      <p css={css`
        color: #666;
        font-family: "Bungee Hairline", sans-serif;
        text-align: center;
        margin: 0;

        ${media.mediumPlus`
          font-size: 1.5rem;
          margin: 1rem 0 3rem;
        `}
      `}>
        Open support for open source
      </p>
      <Gutter>
        <Card css={css`
          margin: 2rem auto;
          max-width: 340px;
          color: #445;

          ${media.mediumPlus`
            max-width: 350px;
          `}
        `}>
          <p><strong>A bright, new and cheerful way to support open source.</strong></p>
          <p>We're launching soon, so enter your email below to be the first to get in on the deal!</p>
          <hr css={css`
            border: none;
            height: 1px;
            background-color: #f0f4f4;
            margin: 1.5rem;
          `} />
          <label css={css`
            font-weight: bold;
            font-size: 90%;
            line-height: 2rem;
          `}>
            Email
            <StyledInput
              autoFocus
              type="email"
            />
          </label>
          <button css={css`
            background-color: #33d833;
            background: linear-gradient(#83d8a0,#38d86c);
            border: 1px solid #3cdd6f;
            border-radius: 2rem;
            box-shadow: 0 0.25rem 1rem -0.25rem rgba(218,59,130,.5);
            color: white;
            cursor: pointer;
            display: block;
            line-height: 2rem;
            height: 3rem;
            font-weight: 500;
            font-family: Raleway;
            font-size: 1rem;
            margin: 1rem auto;
            padding: 0 3.5rem 0 1.5rem;
            position: relative;

            &:focus {
              outline: none;
              box-shadow: 0 0 1.5pt 1.5pt #4488dd;
            }

            &:hover {
              background: linear-gradient(#38d86c, #83d8a0);
            }
          `}>
            I want to contribute
            <div css={css`
              background-color: white;
              border-radius: 50%;
              width: 2rem;
              height: 2rem;
              position: absolute;
              right: 0.5rem;
              top: 50%;
              transform: translateY(-50%);
              box-shadow:
                inset 0 0 1px #3cdd6f,
                inset 0 1px 4px 0 rgba(146, 146, 186, 0.8);
            `}>
              <RightArrow css={css`
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%); 
              `} />
            </div>
          </button>
        </Card>
      </Gutter>
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

const RightArrow = (props) =>
  <svg {...props} width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.933243937" strokeLinecap="round">
      <g transform="translate(-178.000000, -21.000000)" stroke="#8A8AB5" strokeWidth="3">
        <g>
          <g transform="translate(169.000000, 8.000000)">
            <g transform="translate(16.500000, 21.500000)">
              <path d="M0.36071356,6.5 L12.5429864,6.5"></path>
              <path d="M14.9321267,6.5 L8.84099026,0.473886029"></path>
              <path d="M14.9321267,12.4090909 L8.84099026,6.38297694" transform="translate(11.945701, 9.454545) scale(1, -1) translate(-11.945701, -9.454545) "></path>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>

export default App;
