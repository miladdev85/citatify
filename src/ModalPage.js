import React, { useEffect, useCallback } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

const ModalPage = ({ title, confirm, cancel, show, toggle, submit, children }) => {
  const clickHandle = useCallback(
    event => {
      if (event.target.classList.contains("modal")) {
        toggle();
      }
    },
    [toggle]
  );

  useEffect(() => {
    document.addEventListener("mousedown", clickHandle);
    return () => document.removeEventListener("mousedown", clickHandle);
  }, [clickHandle]);

  return (
    <MDBContainer>
      <MDBModal isOpen={show} toggle={toggle} centered>
        <MDBModalHeader toggle={toggle}>{title}</MDBModalHeader>
        <MDBModalBody>{children}</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="mdb-color" onClick={toggle}>
            {cancel}
          </MDBBtn>
          <MDBBtn color="danger" onClick={submit}>
            {confirm}
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default ModalPage;
