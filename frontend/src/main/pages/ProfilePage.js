import React from "react";
import { Row, Col } from "react-bootstrap";
import RoleBadge from "main/components/Profile/RoleBadge";
import { useCurrentUser } from "main/utils/currentUser";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";


const ProfilePage = () => {
    

    const { data: currentUser } = useCurrentUser();
    const [show, setShow] = useState(false);
    //Stryker disable all
    const [phoneNumber, setPhoneNumber] = useState("");
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
    // Stryker restore all
    const [whichNumber, setWhichNumber] = useState(false);


    const handleClose = () => {
        setShow(false);
        // Stryker disable next-line all
        setPhoneNumber("");
    };

    const handleShow = () => setShow(true);

    const objectToAxiosParams = () => ({
        url: "/api/userprofile/update-cellPhone",
        method: "PUT",
        params: {
         cellPhone: phoneNumber
        }
      })

      const onSuccess = () => {
        toast(`Cell Phone number changed ${phoneNumber}`);
        setUpdatedPhoneNumber(phoneNumber);
        setWhichNumber(true);
        handleClose();
    };
    
    const mutation = useBackendMutation(
        objectToAxiosParams,
        { onSuccess }, 
        // Stryker disable next-line all : hard to set up test for caching
        ["/api/userprofile/update-cellPhone"]
    );
    

    const onSubmit = async (event) => {
        event.preventDefault(); 
        mutation.mutate(phoneNumber);
    };


    const onChangePhoneNumber = (e) => {
        const newPhoneNumber = e.target.value;
        setPhoneNumber(newPhoneNumber);
      };
    

    if (!currentUser.loggedIn) {
        return (
            <p>Not logged in.</p>
        )
    }
    
    const { email, pictureUrl, fullName, cellPhone} = currentUser.root.user;
    return (
        <BasicLayout>
            <Row className="align-items-center profile-header mb-5 text-center text-md-left">
                <Col md={2}>
                    <img
                        src={pictureUrl}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </Col>
                <Col md>
                    <h2>{fullName}</h2>
                    <p className="lead text-muted">{email}</p>
        
                    
                    <RoleBadge role={"ROLE_USER"} currentUser={currentUser}/>
                    <RoleBadge role={"ROLE_MEMBER"} currentUser={currentUser}/>
                    <RoleBadge role={"ROLE_ADMIN"} currentUser={currentUser}/>
                    <RoleBadge role={"ROLE_DRIVER"} currentUser={currentUser}/>
                    <RoleBadge role={"ROLE_RIDER"} currentUser={currentUser}/>
                    <p></p>
                    <>
                    <p className="lead text-muted" style={{ marginRight: "8px"}}>{"cell phone number: "} {whichNumber ? (updatedPhoneNumber ? updatedPhoneNumber : "N/A") : (cellPhone ? cellPhone : "N/A")}</p>
      <Button variant="primary" onClick={handleShow}>
        Change Cell Phone Number
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Input phone number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                id="PhoneInput"
                data-testid="PhoneInput"
                placeholder="###-###-####"
                autoFocus
                onChange={onChangePhoneNumber} // Update phone number state
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
        Save Changes
        </Button>
    </Modal.Footer>
      </Modal>
    </>
                </Col>
                
            </Row>
        </BasicLayout>
    );
};

export default ProfilePage;
