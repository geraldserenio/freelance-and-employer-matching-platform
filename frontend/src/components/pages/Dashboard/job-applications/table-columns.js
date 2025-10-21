import { formatKey } from "../../../../utils/textFormatter";
import {
  ActionButton,
  ActionContainer,
} from "../../../shared/datatable/ActionButton";

export const getFreelancerColumns = (handleViewProjects) => [
  { field: "id", headerName: "Project ID", width: 150 },
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
    type: "number",
    width: 250,
    editable: true,
  },
  {
    field: "client",
    headerName: "Client",
    type: "number",
    width: 250,
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
        case "hired":
          bgColor = "#4CAF50"; // Green
          break;
        case "rejected":
          bgColor = "#FF4D4D"; // Red
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
      </ActionContainer>
    ),
  },
];
