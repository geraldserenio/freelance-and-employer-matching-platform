import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { WhiteStyledPaper } from "../../../../shared/containers/dashboard";
import { SecondaryButtonStyle } from "../../../../shared/button/buttonsStyles";
import {
  EarningsHeader,
  EarningsTitle,
} from "../../../../shared/blocks/earnings-bar-graph/Earnings";
import Datatable from "../../../../shared/datatable";
import { useNavigate } from "react-router-dom";

export const FreelanceDashActiveProjects = ({
  columns,
  rows,
  handleChangePage,
}) => {
  const navigate = useNavigate();
  return (
    <WhiteStyledPaper>
      <EarningsHeader>
        <EarningsTitle>Active projects:</EarningsTitle>
        <SecondaryButtonStyle onClick={() => navigate("/projects")}>
          All Projects
        </SecondaryButtonStyle>
      </EarningsHeader>
      <div style={{ borderTop: "1px solid #F7F7F7", margin: "2em 0em" }}></div>
      {/* <DataGrid
        rows={rows}
        columns={modifiedColumns}
        // pageSizeOptions={[25, 50]}
        sx={{
          maxHeight: "50dvh",
          border: "none", // Removes outer border
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "2px solid #118AB2",
          },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-row": { borderBottom: "none" },
          "& .status-ongoing": { color: "blue", fontWeight: "bold" },
          "& .status-completed": { color: "green", fontWeight: "bold" },
          "& .status-cancelled": { color: "red", fontWeight: "bold" },
        }}
      /> */}

      <Datatable
        total={rows.meta?.total}
        perPage={rows.meta?.perPage}
        totalPages={rows.meta?.totalPages}
        page={1}
        handlePageChange={handleChangePage}
        rows={rows?.data}
        columns={columns}
        height={"300px"}
      />
    </WhiteStyledPaper>
  );
};
