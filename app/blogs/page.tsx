"use client";

import { getPaginatedPosts } from "@/lib/actions";
import { IParams, IUser } from "@/lib/actions/interfaces";
import { useEffect, useState } from "react";

import DataTable from "@/components/datatable";
import SkeletonLoader from "@/components/skeletons";

export default function Users() {
  const [params, setParams] = useState<IParams>({ page: 1, per_page: 10 });
  const [dataSource, setDataSource] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getDataSource = async () => {
    try {
      const response = await getPaginatedPosts(params);
      const { ok, data } = response;

      setDataSource(data as IUser[]);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataSource();
  }, []);

  const headers = [
    { text: "ID", value: "id" },
    { text: "User ID", value: "user_id", width: 200 },
    { text: "Title", value: "title" },
    { text: "Body", value: "body" },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-between items-center py-6 px-10">
        <h1 className="text-xl">Post List</h1>

        <button className="bg-green-500 px-4 py-2 rounded-md shadow-lg text-white">
          Tambah User
        </button>
      </div>

      <hr />

      {loading ? (
        <SkeletonLoader row={10}/>
      ) : (
        <DataTable dataSource={dataSource} headers={headers} />
      )}
    </div>
  );
}
