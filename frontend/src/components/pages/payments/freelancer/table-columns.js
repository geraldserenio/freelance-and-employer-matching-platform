import { formatKey } from "../../../../utils/textFormatter";
import {
  ActionButton,
  ActionContainer,
} from "../../../shared/datatable/ActionButton";

export const getColumns = (handleEditProjects, handleDeleteJob) => [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "project_name",
    headerName: "Project name",
    width: 250,
    editable: true,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 250,
    editable: true,
  },
  {
    field: "remarks",
    headerName: "Remarks",
    width: 300,
    editable: true,
  },
  {
    field: "client",
    headerName: "Client",
    width: 250,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      let bgColor = "#ccc";
      let text = formatKey(params.value);

      switch (params.value) {
        case "returned_to_client":
          bgColor = "#666600";
          break;
        case "approved":
          bgColor = "#FFA500"; // Orange
          break;
        case "completed":
          bgColor = "#4CAF50"; // Green
          break;
        case "declined":
          bgColor = "#FF4D4D"; // Red
          break;
        case "sent":
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
  // {
  //   field: "action",
  //   headerName: "Action",
  //   width: 150,
  //   align: 'center',
  //   renderCell: (params) => (
  //     <ActionContainer>
  //       {/* <ActionButton title={"View"} handleClick={() => handleViewProjects(params.row)} /> */}
  //       <ActionButton title={"Edit"} handleClick={() => handleEditProjects(params.row)} />
  //       <ActionButton title={"Trash"} handleClick={() => handleDeleteJob(params.row)} />
  //     </ActionContainer>
  //   ),
  // },
];
