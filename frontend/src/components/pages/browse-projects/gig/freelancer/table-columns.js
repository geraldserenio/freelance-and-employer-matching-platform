import { formatKey } from "../../../../../utils/textFormatter";
import {
  ActionButton,
  ActionContainer,
} from "../../../../shared/datatable/ActionButton";
import { primaryColor } from "../../../../shared/styles/color";

export const getColumns = (handleView) => [
  { field: "id", headerName: "ID", width: 130 },
  {
    field: "project_name",
    headerName: "Project name",
    width: 250,
  },
  {
    field: "client_name",
    headerName: "Client name",
    width: 200,
  },
  {
    field: "message",
    headerName: "Message",
    width: 250,
  },
  {
    field: "portfolio",
    headerName: "Portfolio",
    width: 250,
    renderCell: (params) => {
      let text = formatKey(params.value);
      return (
        <a href={text} target="_blank" color={{ color: primaryColor }}>
          {text}
        </a>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
    flex: 1,
    renderCell: (params) => {
      let bgColor = "#ccc";
      let text = formatKey(params.value);

      switch (params.value) {
        case "pending":
          bgColor = "#FFA500"; // Orange
          break;
        case "completed":
          bgColor = "#4CAF50"; // Green
          break;
        case "rejected":
          bgColor = "#FF4D4D"; // Red
          break;
        case "in_progress":
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
        {params?.row?.status == "in_progress" && (
          <ActionButton
            title={"SubmitMilestone"}
            handleClick={() => handleView(params.row)}
          />
        )}
      </ActionContainer>
    ),
  },
];
