import React from "react";
import { Pagination as Pages } from "@mui/material";
import styled from "styled-components";

const PaginationContainer = styled.div`
  width: 100%;
  margin: auto;
`;

export default function Pagination(props) {
  const { page, handlePageChange, totalPages } = props;

  const handoleChangePage = (event, newPage) => {
    handlePageChange(newPage);
  };

  return (
    <PaginationContainer id="page">
      <Pages
        count={totalPages}
        variant="outlined"
        page={page}
        onChange={handoleChangePage}
      />
    </PaginationContainer>
  );
}
