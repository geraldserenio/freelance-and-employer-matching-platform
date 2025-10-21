import { formatKey } from "../../../utils/textFormatter";
import {
  ActionButton,
  ActionContainer,
} from "../../shared/datatable/ActionButton";
import { primaryColor } from "../../shared/styles/color";

export const getFreelancerColumns = (handleWithdraw, navigate) => [
  { field: "id", headerName: "Project ID", width: 150 },
  {
    field: "project_name",
    headerName: "Project name",
    flex: 1,
    renderCell: (params) => {
      let bgColor = "#ccc";
      let text = formatKey(params.value);
      return (
        <a
          onClick={() =>
            navigate("/view-project", { state: { projectId: params?.row?.id } })
          }
          style={{
            backgroundColor: bgColor,
            color: primaryColor,
            fontWeight: "bold",
            borderRadius: "30px",
            padding: "8px 12px",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            lineHeight: "1",
            fontSize: "12px",
            minWidth: "60px",
            cursor: "pointer",
          }}
        >
          {text}
        </a>
      );
    },
  },
  {
    field: "project_description",
    headerName: "Project description",
    width: 300,
    editable: true,
  },
  {
    field: "project_terms",
    headerName: "Payment conditions",
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
    field: "project_status",
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
    flex: 1,
    renderCell: (params) => {
      return (
        <ActionContainer>
          {params?.row?.job_listings_for_freelancer?.project?.status ==
          "completed" ? (
            <ActionButton
              title={"Withdraw"}
              handleClick={() => handleWithdraw(params.row)}
            />
          ) : null}
        </ActionContainer>
      );
    },
  },
];
