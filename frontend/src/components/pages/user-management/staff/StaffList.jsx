import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Datatable from "../../../shared/datatable";
import { PageContainer } from "../../../shared/page/PageContainer";
import { getColumns } from "./table-columns";
import { PageHeader } from "../../../navigation/page-header";
import Modal from "../../../shared/modal/Modal";
import Swal from "sweetalert2";
import { logout } from "../../../../redux/reducer/authReducer";
import { getStaffs } from "../../../../services/staffs/staff-services";

export const StaffList = () => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const togglViewModal = () => setViewModalOpen(!isViewModalOpen);
  const togglAddModal = () => setAddModalOpen(!isAddModalOpen);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchUsers() {
      const staffs = await getStaffs(page);
      if (staffs?.status === 401) {
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
      } else {
        setUserList(staffs.data.staffs);
      }
    }

    fetchUsers();
  }, [page]);

  const handleEdit = (row) => {
    setEditModalOpen(!isEditModalOpen);
  };

  const handleView = (row) => {
    setViewModalOpen(!isViewModalOpen);
  };

  const handleAdd = (row) => {
    setAddModalOpen(!isAddModalOpen);
  };

  const columns = getColumns(handleEdit, handleView);

  return (
    <PageContainer>
      <Modal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        title="Edit Staff"
      >
        <p>test</p>
        <p>test</p>
      </Modal>
      <Modal
        isOpen={isViewModalOpen}
        onClose={togglViewModal}
        title="View Staff"
      >
        <p>test</p>
        <p>test</p>
      </Modal>
      <Modal
        isOpen={isAddModalOpen}
        onClose={togglAddModal}
        title="Create Staff"
      >
        <p>test</p>
        <p>test</p>
      </Modal>
      <PageHeader
        title={"Staffs"}
        buttonTitle={"Create Staff"}
        handleClick={handleAdd}
      />
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
