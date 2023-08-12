"use client";

import { getPaginatedUsers } from "@/lib/actions";
import { IParams, IUser } from "@/lib/actions/interfaces";
import { useEffect, useState } from "react";

import DataTable from "@/components/datatable";
import SkeletonLoader from "@/components/skeletons";
import Pagination from "@/components/pagination";

export default function Users() {
  const [params, setParams] = useState<IParams>({ page: 1, per_page: 10 });
  const [dataSource, setDataSource] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  const getDataSource = async () => {
    setLoading(true);
    try {
      const response = await getPaginatedUsers(params);
      const { ok, data } = response;
      
      if (ok) setDataSource(data as IUser[]);

    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (!e.target.value) {
      getDataSource();
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setDataSource((prev) =>
        prev.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    getDataSource();
  }, [params.page]);

  const headers = [
    { text: "ID", value: "id" },
    {
      text: "Name",
      value: "name",
      rowStyles: "cursor-pointer font-semibold text-blue-600",
      rowCallback: () => {
        alert("clicked");
      },
    },
    { text: "Gender", value: "gender" },
    { text: "Email", value: "email" },
    { text: "Status", value: "status" },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-between items-center py-6 px-10">
        <h1 className="text-xl">User List</h1>
        <button className="bg-green-500 px-4 py-2 rounded-md shadow-lg text-white">
          Tambah User
        </button>
      </div>
      <div className="w-full py-6 px-10 flex justify-between">
        <div className="w-full flex-1">
          <input
            onChange={handleInputChange}
            onKeyDown={handleSearch}
            placeholder="Search User"
            type="text"
            value={searchText}
            className="focus:outline-none w-full px-4 py-3 shadow-md"
          />
        </div>
        <div className="flex text-white rounded-r-lg cursor-pointer hover:bg-green-500 bg-green-400 items-center justify-center px-6 shadow-lg">
          <span className="material-icons">search</span>
        </div>
      </div>
      <hr />
      {loading ? (
        <SkeletonLoader row={8} />
      ) : (
        <DataTable dataSource={dataSource} headers={headers} />
      )}
      <Pagination
        onPrevPage={() => setParams({ ...params, page: params.page - 1 })}
        onNextPage={() => setParams({ ...params, page: params.page + 1 })}
        currentPage={params.page}
        totalPages={500}
      />
    </div>
  );
}
