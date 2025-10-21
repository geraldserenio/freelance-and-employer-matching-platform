import { formatKey } from "../../../../utils/textFormatter";
import {
  ActionButton,
  ActionContainer,
} from "../../../shared/datatable/ActionButton";

export const getColumns = (
  handleEditProjects,
  handleDeleteJob,
  handleViewJob,
) => [
  { field: "id", headerName: "Job id", width: 90 },
  {
    field: "job_title",
    headerName: "Job title",
    width: 250,
    editable: true,
  },
  {
    field: "qualification",
    headerName: "Qualification",
    width: 250,
    editable: true,
  },
  {
    field: "responsibilities",
    headerName: "Responsibilities",
    width: 250,
    editable: true,
  },
  {
    field: "location",
    headerName: "location",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
  },
  {
    field: "contract_type",
    headerName: "Contract type",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },

  {
    field: "salary",
    headerName: "Salary",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
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
          handleClick={() => handleViewJob(params.row)}
        />
        <ActionButton
          title={"Edit"}
          handleClick={() => handleEditProjects(params.row)}
        />
        <ActionButton
          title={"Trash"}
          handleClick={() => handleDeleteJob(params.row)}
        />
      </ActionContainer>
    ),
  },
];
