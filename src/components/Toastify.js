import React from "react";
import Toast from "react-bootstrap/Toast";
import styled from "styled-components";

const Wrapper = styled.div`
  .toast-container {
    position: absolute;
    right: 20px;
  }
`;

function Toastify({ show, title, content, onClose }) {
  return (
    <Wrapper>
      <div className="toast-container">
        <Toast delay={2000} show={show} autohide onClose={onClose}>
          <Toast.Header>
            <strong className="mr-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{content}</Toast.Body>
        </Toast>
      </div>
    </Wrapper>
  );
}

export default Toastify;
