"use client";

import { getPaginatedPosts, getPostDetailById } from "@/lib/actions";
import { IParams, IPost } from "@/lib/actions/interfaces";
import { useEffect, useState } from "react";

import DataTable from "@/components/datatable";
import SkeletonLoader from "@/components/skeletons";
import Pagination from "@/components/pagination";
import { useToast } from "@/components/toast";

export default function Users() {
  const [dataSource, setDataSource] = useState<IPost[]>([]);
  const [postDetail, setPostDetail] = useState<Partial<IPost>>({})
  const [loading, setLoading] = useState<boolean>(true);
  const [postDetailLoading, setPostDetailLoading] = useState<boolean>(true);
  const [params, setParams] = useState<IParams>({ per_page: 10, page: 1 });

  const toast = useToast();

  const getDataSource = async () => {
    setLoading(true)
    try {
      const response = await getPaginatedPosts(params);
      const { ok, data } = response;
      if (ok) setDataSource(data as IPost[]);
    } catch (error: any) {
      toast.trigger({
        type: "danger",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const getPostDetail = async (postId: number) => {
    setPostDetailLoading(true)
    try {
      const response = await getPostDetailById(postId)
      const {ok, data} = response

      if (ok) setPostDetail(data as IPost)

    } catch (error: any) {
      toast.trigger({
        type: 'danger',
        message: error.message
      })
    } finally {
      setPostDetailLoading(false)
    }
  }

  const headers = [
    {
      text: "ID",
      value: "id",
      rowStyles: () => "cursor-pointer font-semibold text-blue-600",
      rowClick: (data: IPost) => getPostDetail(data.id),
    },
    { text: "User ID", value: "user_id", width: 200 },
    { text: "Title", value: "title" },
    { text: "Body", value: "body" },
  ];

  useEffect(() => {
    getDataSource();
  }, [params.page]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-between items-center py-6 px-10">
        <h1 className="text-xl">Post List</h1>
      </div>

      <hr />

      {loading ? (
        <SkeletonLoader row={10} />
      ) : (
        <DataTable dataSource={dataSource} headers={headers} />
      )}

      <Pagination
        onPrevPage={() => setParams({ ...params, page: params.page - 1 })}
        onNextPage={() => setParams({ ...params, page: params.page + 1 })}
        currentPage={params.page}
        totalPages={500}
      />

      {toast.ToastPortal()}
    </div>
  );
}
