import { formatKey } from "../../../utils/textFormatter";
import {
  ActionButton,
  ActionContainer,
} from "../../shared/datatable/ActionButton";

export const getColumns = (handleEdit, handleViewProjects, handleDelete) => [
  { field: "id", headerName: "Project ID", width: 90 },
  {
    field: "project_name",
    headerName: "Project name",
    width: 150,
    editable: true,
  },
  {
    field: "project_description",
    headerName: "Project description",
    width: 150,
    editable: true,
  },
  {
    field: "payment_conditions",
    headerName: "Payment conditions",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      let bgColor = "#ccc";
      let text = formatKey(params.value);

      switch (params.value) {
        case "in_progress":
          bgColor = "#FFA500"; // Orange
          break;
        case "completed":
          bgColor = "#4CAF50"; // Green
          break;
        case "closed":
          bgColor = "#FF4D4D"; // Red
          break;
        case "open":
          bgColor = "#ccccb3"; // gray
          break;
        default:
          break;
      }
      return (
        <div
          style={{
            backgroundColor: bgColor,
            color: "white",
            fontWeight: "bold",
            borderRadius: "30px",
            padding: "8px 12px",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            lineHeight: "1",
            fontSize: "12px",
            minWidth: "60px",
          }}
        >
          {text}
        </div>
      );
    },
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
          handleClick={() => handleViewProjects(params.row)}
        />
        {!params.row.isFreelancer ? (
          <ActionButton
            title={"Edit"}
            handleClick={() => handleEdit(params.row)}
          />
        ) : null}
        {!params.row.isFreelancer ? (
          <ActionButton
            title={"Trash"}
            handleClick={() => handleDelete(params.row)}
          />
        ) : null}
      </ActionContainer>
    ),
  },
];
