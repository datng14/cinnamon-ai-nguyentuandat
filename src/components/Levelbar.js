import React from "react";
import styled from "styled-components";

function Levelbar({ percent }) {
  return (
    <Wrapper percent={percent}>
      <div className="level-bar">
        <span style={{ width: percent + "%" }}>
          <span></span>
        </span>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .level-bar {
    height: 20px;
    position: relative;
    background: transparent;
    border: 2px solid #6d7496;
    overflow: hidden;
    & > span {
      display: block;
      height: 100%;
      & > span {
        display: block;
        height: 100%;
        background-color: ${({ percent }) =>
          percent >= 50
            ? "#27ad27"
            : percent < 50 && percent >= 25
            ? "#ffd402"
            : percent < 25
            ? "#ffa602"
            : "transparent"};
        -webkit-animation: move 1s ease-in-out;
        -webkit-animation-fill-mode: both;
        -moz-animation: move 1s ease-in-out;
        -moz-animation-fill-mode: both;
      }
    }
  }

  @keyframes move {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
export default Levelbar;
