import React, { useState, useEffect } from "react";

import { Button, ListGroup, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteStaffs, listStaffs } from "../../../actions/staffsActions";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";
import StaffsModal from "../../contents/StaffModal";
import { toast } from "react-toastify";
import { STAFFS_CREATE_RESET } from "../../../actions/types";
import { BASE_URL } from "../../../api";

const StaffContainer = styled.div`
  padding: 30px 40px;
  i {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h3 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
    margin-top: 10px;
  }
  h4 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const ButtonContent = styled.div`
  margin-top: 10px;
`;

const StaffDetail = styled.div`
  h3 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  h4 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const StaffContent = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;

const NoStaffs = styled.div`
  font-size: 20px;
  height: 100vh;
  margin-top: 200px;
  text-align: center;
`;

const AdminStaffs = ({ history }) => {
  const [modalShow, setModalShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const availableStaffs = useSelector((state) => state.availableStaffs);
  const { loading, staffs, error } = availableStaffs;

  const staffsDelete = useSelector((state) => state.staffsDelete);
  const { success, error: deleteError } = staffsDelete;

  const staffsCreate = useSelector((state) => state.staffsCreate);
  const { success: createSuccess, error: createError } = staffsCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      dispatch(listStaffs());
      if (success) {
        dispatch(listStaffs());
      }
      if (createSuccess) {
        dispatch(listStaffs());
        dispatch({ type: STAFFS_CREATE_RESET });
        setModalShow(false);
      }
    } else {
      history.push("/admin/login");
    }
  }, [dispatch, history, userInfo, success, createSuccess]);

  const staffDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteStaffs(id));
      toast.success("Staff Deleted Successfully");
    }
  };

  return (
    <StaffContainer>
      <Title darkmode={darkMode}>
        <h3>Staffs</h3>
        <ButtonContent>
          <Button
            onClick={() => setModalShow(true)}
            className={darkMode ? "btn-dark" : "btn-primary"}
          >
            <i className="fas fa-plus" /> New
          </Button>
        </ButtonContent>
        <StaffsModal show={modalShow} onHide={() => setModalShow(false)} />
      </Title>
      <>
        {deleteError ? <Message variant="danger">{deleteError}</Message> : ""}
        {createError ? <Message variant="danger">{deleteError}</Message> : ""}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {staffs && staffs.length === 0 && (
              <NoStaffs>Staff List is Empty.</NoStaffs>
            )}
            <ListGroup as="ol" numbered>
              {staffs &&
                staffs.map((staff) => (
                  <ListGroup.Item
                    className={
                      darkMode
                        ? "d-flex justify-content-between align-items-start bg-dark text-white"
                        : "d-flex justify-content-between align-items-start bg-light text-dark"
                    }
                    key={staff._id}
                  >
                    <StaffContent>
                      <div>
                        <Image
                          src={`${BASE_URL}${staff.image}`}
                          height="180px"
                          width="240px"
                          alt="staff"
                        />
                      </div>
                      <StaffDetail darkmode={darkMode}>
                        <h4>Full Name: {staff.fullName}</h4>
                        <h4>Position: {staff.position}</h4>
                        <h4>Email: {staff.email}</h4>
                        <h4>Phone No: {staff.phone}</h4>
                        <Button
                          size="sm"
                          className="btn-danger mt-1"
                          onClick={() => staffDeleteHandler(staff._id)}
                        >
                          Delete
                        </Button>
                      </StaffDetail>
                    </StaffContent>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </>
        )}
      </>
    </StaffContainer>
  );
};

export default AdminStaffs;
