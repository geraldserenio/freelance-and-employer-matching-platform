import {
  ActionButton,
  ActionContainer,
} from "../../../shared/datatable/ActionButton";

export const getColumns = (handleRowAction, handleView) => [
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
    field: "due_date",
    headerName: "Due Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    align: "center",
    renderCell: (params) => (
      <ActionContainer>
        <ActionButton
          title={"View"}
          handleClick={() => handleView(params.row)}
        />
        <ActionButton
          title={"Edit"}
          handleClick={() => handleRowAction(params.row)}
        />
      </ActionContainer>
    ),
  },
];
