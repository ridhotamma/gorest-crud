import React from "react";
import { DataTableProps } from "./interface";

const DataTable = ({ headers, dataSource }: DataTableProps) => {
  return (
    <div className="flex flex-col overflow-scroll md:p-8 md:mt-0 mt-5 px-4">
      <div className="bg-white sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <table className="min-w-full">
            <thead className="bg-white border-b sticky top-0 shadow-sm">
              <tr>
                {headers?.map((data, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-6 py-5 cursor-pointer ${
                      data.align ?? "text-left"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-semibold text-gray-900">
                        {data.text}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSource?.length > 0 &&
                dataSource?.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    {headers?.map((item, index) => (
                      <td
                        key={index}
                        className={`text-sm min-w-[${
                          item.width ? item.width : 100
                        }px] text-gray-900 font-light px-6 py-4`}
                      >
                        <span onClick={item.rowCallback} className={`${item.rowStyles}`}>
                          {data[item.value!]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
