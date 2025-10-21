import { ActionContainer } from "../../../shared/datatable/ActionButton";

export const getColumns = (handleDisable, handleEnable) => [
  { field: "id", headerName: "Order #", width: 90 },
  {
    field: "first_name",
    headerName: "First Name",
    width: 150,
    editable: true,
  },
  {
    field: "middle_name",
    headerName: "Middle Name",
    width: 150,
    editable: true,
  },
  {
    field: "last_name",
    headerName: "Last name",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "user_type",
    headerName: "User type",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "is_active",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <div
        style={{
          backgroundColor: params.value ? "#4CAF50" : "#F44336", // Green for Active, Red for Inactive
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          textAlign: "center",
          fontWeight: "bold",
          width: "100px",
        }}
      >
        {params.value ? "Enabled" : "Disabled"}
      </div>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    align: "center",
    renderCell: (params) => (
      <ActionContainer>
        {params?.row.is_active ? (
          <span onClick={() => handleDisable(params.row)}>{"✖"}</span>
        ) : (
          <span onClick={() => handleEnable(params.row)}>{"✔"}</span>
        )}
      </ActionContainer>
    ),
  },
];
