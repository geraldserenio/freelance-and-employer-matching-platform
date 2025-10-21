import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "./pagination";
import styled from "styled-components";
import { H3 } from "../generic/headers";
import { medium, small } from "../styles/sizes";
import { fontFamily } from "../styles/theme";

export default function Datatable(props) {
  const {
    total,
    perPage,
    page,
    handlePageChange,
    rows,
    columns,
    totalPages,
    height,
  } = props;
  const getRowId = (row) => row.id;

  const recordsInfo = useMemo(() => {
    return (
      <RecordsInfo>
        {page == 1 ? 1 : parseInt(page - 1) * parseInt(perPage)} {"- "}{" "}
        {parseInt(perPage) > parseInt(total) ? total : perPage} {"of"} {total}
      </RecordsInfo>
    );
  }, [page, total]);

  return (
    <div style={{ height: height ?? "390px" }}>
      <style>
        {`
          .MuiDataGrid-root .MuiDataGrid-columnHeaders {
            font-family: ${fontFamily.font};
            font-size: 20px;
          }
        `}
      </style>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        hideFooter
        sx={{
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            fontFamily: fontFamily.font,
            fontSize: "16px",
          },
        }}
      />
      <PaginationBase>
        <div>{recordsInfo}</div>
        <div>
          {FooterComponent({
            totalPages,
            page,
            handlePageChange,
          })}
        </div>
      </PaginationBase>
    </div>
  );
}

const FooterComponent = (properties) => {
  const { page, handlePageChange, totalPages } = properties;
  return (
    <Pagination
      totalPages={totalPages}
      page={page}
      handlePageChange={handlePageChange}
    />
  );
};

const RecordsInfo = styled(H3)`
  margin-top: ${small}px;
`;

const PaginationBase = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${medium}px;
`;
