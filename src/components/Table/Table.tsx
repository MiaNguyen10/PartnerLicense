import React from "react";
import { OnClickType, PaginateProps } from "../../global/Interface.d";
import { DefaultLimit } from "../../global/config";
import {
  Paper,
  TableContainer,
  TableRow,
  Table as TableData,
  TableHead,
  TableCell,
  TableBody,
  TablePagination,
  TableCellProps,
} from "@mui/material";

export interface TablePageProps {
  page?: number;
  limit?: number;
}

const Table: React.FC<TableProps> = ({
  total,
  page,
  limit,
  rows,
  columns,
  onClick,
}) => {
  const cpage = page || 0;
  const rowsPerPage = limit || DefaultLimit;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (onClick) onClick({ page: newPage, limit: rowsPerPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (onClick) {
      onClick({ page: 0, limit: +event.target.value });
    }
  };

  if (
    (!rows && !columns) ||
    (rows && rows.length === 0 && columns && columns.length === 0)
  )
    return <></>;

  let data = rows;
  if (rows) {
    data = rows.slice(cpage * rowsPerPage, cpage * rowsPerPage + rowsPerPage);
  }

  return (
    <Paper>
      <TableContainer data-testid="table">
        <TableData stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column: ColumnProps) => (
                <TableCell
                  key={column?.id}
                  align={column?.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  <>{column.label}</>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row: ArrayType) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns?.map((column: ColumnProps) => {
                      const value = column?.id ? row[column.id] : "";
                      return (
                        <TableCell
                          key={`${row?.id || column.id}_${
                            Math.random() * 100000
                          }`}
                          align={column?.align || "left"}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </TableData>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[DefaultLimit, 25, 100]}
        component="div"
        count={total || rows?.length || 0}
        rowsPerPage={rowsPerPage}
        page={cpage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-testid="pagination"
        role="pagination"
      />
    </Paper>
  );
};

export interface ColumnProps extends TableCellProps {
  id?: string | undefined;
  label?: string | undefined;
  minWidth?: number | undefined;
  format?: string | undefined | OnClickType;
  align?: "inherit" | "left" | "center" | "right" | "justify" | undefined;
  sortable?: boolean;
}
type ArrayType = {
  [key: string]: any;
};
export interface TableProps extends TablePageProps {
  columns?: Array<ColumnProps> | undefined;
  rows?: ArrayType;
  onClick?: (page: PaginateProps) => void;
  total?: number;
  isFullData?: boolean;
}

export default Table;
