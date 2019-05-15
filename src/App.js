import React, { useState } from 'react';
import styled, { css, keyframes, createGlobalStyle } from 'styled-components/macro';
import { registerForNewsletter } from './firebase';

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

const NarrowCard = styled(Card)`
  color: #445;
  margin: 0 auto;
  max-width: 340px;
  ${media.mediumPlus`
    max-width: 350px;
  `}
`

const FlippableSide = styled.div`
  backface-visibility: hidden;
`

// https://davidwalsh.name/css-flip
const Flippable = ({ side, front, back, ...props }) =>
  <div {...props} css={css`
    perspective: 2500px;
  `}>
    <div css={css`
      transition: transform 500ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
      transform-style: preserve-3d;
      position: relative;
      transform: rotateY(${side === 'back' ? 180 : 0}deg);
    `}>
      <FlippableSide css={css`
        z-index: 2;
        transform: rotateY(0deg);
      `}>
        {front}
      </FlippableSide>
      <FlippableSide css={css`
        position: absolute;
        transform: rotateY(180deg);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `}>
        {back}
      </FlippableSide>
    </div>
  </div>

const StyledInput = styled.input`
  border: 1px solid ${props => props.error ? 'hsl(45,30%,85%)' : '#e0e4e4'};
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05) inset;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
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

const Field = ({ error, hint, label, onChange, className, style, hidden, ...props }) =>
  <div
    className={className}
    style={style}
    hidden={hidden}>
    <label css={css`
      ${error && css`
        color: hsl(45, 30%, 50%);
      `}
      font-weight: bold;
      font-size: 90%;
      line-height: 2rem;
    `}>
      Email
      <StyledInput
        {...props}
        error={!!error}
        onChange={event => onChange(event.target.value)}
      />
    </label>
    <div css={css`
      color: ${error ? 'hsl(45, 30%, 55%)' : 'hsl(0, 0%, 47%)'};
      font-size: 90%;
      line-height: 1.4rem;
    `}>
      {error || hint}
    </div>
  </div>

const Gutter = styled.div`
  margin: 1rem;
`

const scanAnimation = keyframes`
  0%, 80% {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.2);
  }
  100% {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.8);
  }
`

const TitleCharacter = ({ char, hue, i, length }) => {
  return (
    <span css={css`
      display: inline-block;
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.2);
      animation: ${scanAnimation} 1s ${i/18 + 0.2}s alternate ease infinite;      
      font-size: ${Math.pow(1 + Math.abs((length - 1)/2 - i)/(length-1)*3, 4)/16+4}em;
      vertical-align: -0.67em;
    `}>
      <span css={css`
        display: inline-block;
        mix-blend-mode: hard-light;
        color: hsl(${hue}, 60%, 47%);
      `}>
        {char}
      </span>
    </span>
  )
}

function App() {
  let title = "Contribudence"
  let [busy, setBusy] = useState(false)
  let [done, setDone] = useState(false)
  let [email, setEmail] = useState('')
  let [error, setError] = useState(null)

  let hasValidEmail = /.+@.+\..+/.test(email)

  let handleSubmit = async event => {
    event.preventDefault()

    if (!hasValidEmail) {
      setError(
        !email ? "Thanks! Please enter an email to get started." :
        !hasValidEmail ? "I can't send to that email. Did you enter it correctly?" :
        null
      )
      return
    }

    setBusy(true)

    try {
      await registerForNewsletter({
        email,
      })
      setDone(true)
    }
    catch (error) {
      setBusy(false)
      setError('')
    }
  }

  return (
    <div css={css`
      overflow: hidden;
    `}>
      <GlobalStyle />
      <header css={css`
        background: linear-gradient(#ffffff 0%, #ffffff 60%, #f8fafa 95%);
        padding: 1px 0;
      `}>
        <h1 css={css`
          line-height: 70px;
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
          {Array.from(title).map((char, i) =>
            <TitleCharacter
              key={i}
              char={char}
              hue={Math.floor(360*i/title.length)}
              i={i}
              length={title.length}
            />
          )}
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
      </header>
      <Gutter>
        <Flippable
          side={done ? 'back' : 'front'}
          front={
            <NarrowCard>
              <form onSubmit={handleSubmit}>
                <p><strong>A bright, new and cheerful way to support open source.</strong></p>
                <p>We're launching soon, so enter your email below to be the first to get in on the deal!</p>
                <hr css={css`
                  border: none;
                  height: 1px;
                  background-color: #f0f4f4;
                  margin: 1.5rem;
                `} />
                <Field
                  autoFocus
                  error={error}
                  label='Email'
                  type='email'
                  value={email}
                  onChange={setEmail}
                />
                <Button
                  busy={busy}
                  disabled={busy}
                  label="I want to contribute"
                  type="submit"
                />
              </form>
            </NarrowCard>
          }
          back={
            <NarrowCard css={css`
              position: absolute;
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              height: 100%;
              width: 100%;
              left: 50%;
              transform: translateX(-50%);
            `}>
              <h2>Thanks, Mate!</h2>
              <p>
                You'll be hearing from us as soon as we're ready to launch.
              </p>
            </NarrowCard>
          }
        />
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

const Button = ({ busy, color='#38d86c', label, ...props }) =>
  <button {...props} css={css`
    background: ${color} linear-gradient(rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.08));
    border: 1px solid rgba(0, 0, 0, 0.1);
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
    opacity: 1;
    transition: opacity 100ms ease-out;

    &[disabled] {
      cursor: default;
      opacity: 0.8;
    }

    &:focus {
      outline: none;
      box-shadow:
        0 0 1.5pt 1.5pt #4488dd,
        0 0.25rem 1rem -0.25rem rgba(218,59,130,.5);
    }

    &:hover {
      background: ${color} linear-gradient(rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.1));
    }

    &:active {
      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.15));
    }
  `}>
    {label}
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
      overflow: hidden;
    `}>
      <Spinner active={busy} css={css`
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 500ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
        transition-delay: ${busy ? 150 : 0}ms;
        opacity: ${busy ? 1 : 0};
      `} />
      <RightArrow css={css`
        position: absolute;
        left: 50%;
        top: 50%;
        opacity: 1;
        transform: translate(-50%, -50%);
        ${busy ? css`
          transform: translate(-150%, -50%);
          animation: ${arrowAnimation} 350ms cubic-bezier(0.895, 0.030, 0.635, 0.220);
        ` : css`
          transition:
            transform 300ms cubic-bezier(0.165, 0.840, 0.440, 1.000),
            opacity 250ms cubic-bezier(0.165, 0.840, 0.440, 1.000);
        `}
      `} />
    </div>
  </button>

const arrowAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  90% {
    opacity: 0;
    transform: translate(50%, -50%);
  }
  99% {
    transform: translate(50%, -50%);
  }
  100% {
    transform: translate(-150%, -50%);
  }
`

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  90% {
    transform: rotate(350deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

// https://projects.lukehaas.me/css-loaders/
const Spinner = ({ active, color='#aabbcc', backgroundColor='#fff', ...props }) =>
  <div {...props} css={css`
    border-radius: 50%;
    display: block;
    width: 50%;
    height: 50%;
    box-shadow: inset 0 0 0 2px ${color};
  `}>
    <div css={css`
      position: absolute;
      width: calc(50% + 1.5px);
      height: calc(100% + 3px);
      background-color: ${backgroundColor};
      border-radius: 9999px 0 0 9999px;
      top: -1px;
      left: -1px;
      transform-origin: calc(100% - 0.5px) calc(50%);
      ${active && css`
        animation: ${spinnerAnimation} 1.2s infinite cubic-bezier(0.5, 0, 0.5, 1) 0.32s;
      `}
    `} />
    <div css={css`
      position: absolute;
      width: calc(50% + 1.5px);
      height: calc(100% + 3px);
      background-color: ${backgroundColor};
      border-radius: 0 9999px 9999px 0;
      top: -1px;
      left: calc(50% - 0.5px);
      transform-origin: 0 calc(50%);
      ${active && css`
        animation: ${spinnerAnimation} 1.2s infinite cubic-bezier(0.5, 0, 0.5, 1);
      `}
    `} />
  </div>

const RightArrow = ({ ...props }) =>
  <svg
    {...props}
    css={css``} // For some reason, styled-components fails without this.
    width="30px"
    height="30px"
    viewBox="0 0 30 30"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.933243937" strokeLinecap="round">
      <g transform="translate(-178.000000, -21.000000)" stroke="#777788" strokeWidth="3">
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
