import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Datatable from "../../../shared/datatable";
import { PageContainer } from "../../../shared/page/PageContainer";
import { getColumns } from "./table-columns";
import {
  enableDisableUser,
  getUsers,
} from "../../../../services/users/user-services";
import { PageHeader } from "../../../navigation/page-header";
import Modal from "../../../shared/modal/Modal";
import Swal from "sweetalert2";
import { logout } from "../../../../redux/reducer/authReducer";
import { SubHeading } from "../../../shared/generic/headers";
import { primaryColor } from "../../../shared/styles/color";

export const ClientList = () => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [fetchFlag, setFetchFlag] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const role = loggedInUser?.user?.user_type;

  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const togglViewModal = () => setViewModalOpen(!isViewModalOpen);
  const togglAddModal = () => setAddModalOpen(!isAddModalOpen);

  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    async function fetchUsers() {
      const users = await getUsers(page);
      if (users?.status === 401) {
        Swal.fire({
          title: "Session Expired!",
          text: "Please, login again.",
          icon: "warning",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(logout());
          }
        });
      } else if (role !== "admin") {
        Swal.fire({
          title: "You are trying to access a restricted page",
          text: "Please, login again.",
          icon: "warning",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(logout());
          }
        });
      } else {
        setUserList(users.data.users);
      }
    }

    fetchUsers();
  }, [page, fetchFlag]);

  const handleDisable = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Disable user",
      icon: "warning",
      confirmButtonText: "OK",
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await enableDisableUser(false, row?.id);
        setFetchFlag(!fetchFlag);
      }
    });
  };

  const handleEnable = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Enable user",
      icon: "warning",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      showCancelButton: true,
      allowEscapeKey: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await enableDisableUser(true, row?.id);
        setFetchFlag(!fetchFlag);
      }
    });
  };

  const handleAdd = (row) => {
    setAddModalOpen(!isAddModalOpen);
  };

  const columns = getColumns(handleDisable, handleEnable);

  return (
    <PageContainer>
      <Modal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        title="Edit User"
      >
        <p>test</p>
        <p>test</p>
      </Modal>
      <Modal
        isOpen={isViewModalOpen}
        onClose={togglViewModal}
        title="View User"
      >
        <p>test</p>
        <p>test</p>
      </Modal>
      <Modal
        isOpen={isAddModalOpen}
        onClose={togglAddModal}
        title="Create User"
      >
        <p>test</p>
        <p>test</p>
      </Modal>
      <SubHeading style={{ color: primaryColor, marginTop: 0 }}>
        Users
      </SubHeading>
      <Datatable
        total={userList.meta?.total}
        perPage={userList.meta?.perPage}
        totalPages={userList.meta?.totalPages}
        page={page}
        handlePageChange={handleChangePage}
        rows={userList?.data}
        columns={columns}
      />
    </PageContainer>
  );
};
