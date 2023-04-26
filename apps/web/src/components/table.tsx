import { ArrowLeftIcon, ArrowRightIcon } from "@rallly/icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React from "react";

import { Button } from "@/components/button";

export const Table = <
  T extends Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends ColumnDef<T, any>,
>(props: {
  columns: C[];
  data: T[];
  footer?: React.ReactNode;
  enableTableFooter?: boolean;
  pageSize?: number;
  layout?: "fixed" | "auto";
  className?: string;
}) => {
  const { pageSize = props.data.length } = props;
  const table = useReactTable<T>({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    // pagination
    initialState: { pagination: { pageSize } },
    getPaginationRowModel: getPaginationRowModel(),
  });
  const { t } = useTranslation();
  return (
    <div className={props.className}>
      <table
        className={clsx(
          "border-collapse bg-white",
          props.layout === "auto" ? "w-full table-auto" : "table-fixed",
        )}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize(),
                    maxWidth:
                      props.layout === "auto" ? header.getSize() : undefined,
                  }}
                  className="whitespace-nowrap border-b border-r border-gray-100 px-4 py-2.5 text-left align-bottom text-sm font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={clsx(
                    "overflow-hidden border-r border-gray-100 px-4 py-2.5",
                    {
                      "border-b ": table.getRowModel().rows.length !== i + 1,
                    },
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {props.enableTableFooter ? (
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th className="border-t bg-gray-50" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        ) : null}
      </table>
      {table.getState().pagination.pageSize < props.data.length ? (
        <div className="flex justify-end border-t bg-gray-100 px-4 py-2.5">
          <Button
            icon={<ArrowLeftIcon />}
            disabled={table.getState().pagination.pageIndex === 0}
            onClick={() => {
              table.setPageIndex(table.getState().pagination.pageIndex - 1);
            }}
          />
          <Button
            icon={<ArrowRightIcon />}
            disabled={
              table.getState().pagination.pageIndex === table.getPageCount() - 1
            }
            onClick={() => {
              table.setPageIndex(table.getState().pagination.pageIndex + 1);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};