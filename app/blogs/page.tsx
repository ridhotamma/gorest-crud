"use client";

import { getPaginatedPosts, getPostDetailById } from "@/lib/actions";
import { IComment, IParams, IPost } from "@/lib/actions/interfaces";
import { useCallback, useEffect, useState } from "react";

import DataTable from "@/components/datatable";
import SkeletonLoader from "@/components/skeletons";
import Pagination from "@/components/pagination";
import { useToast } from "@/components/toast";
import Modal from "@/components/modal";
import { getPostComments } from "@/lib/actions/posts";
import { IHeader } from "@/components/datatable/interface";

export default function Users() {
  const [dataSource, setDataSource] = useState<IPost[]>([]);
  const [postDetail, setPostDetail] = useState<Partial<IPost>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [postDetailLoading, setPostDetailLoading] = useState<boolean>(true);
  const [params, setParams] = useState<IParams>({ per_page: 10, page: 1 });
  const [postDetailModalOpen, setPostDetailModalOpen] =
    useState<boolean>(false);

  const toast = useToast();

  const getDataSource = useCallback(async () => {
    setLoading(true);
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
  }, [params, toast])
  
  const getPostDetail = async (postId: number) => {
    try {
      setPostDetailLoading(true);

      const [postResponse, commentResponse] = await Promise.all([
        getPostDetailById(postId),
        getPostComments(postId),
      ]);

      const { ok: postOk, data: postData } = postResponse;
      const { ok: commentOk, data: commentData } = commentResponse;

      if (postOk) {
        setPostDetail(postData as IPost);
        setPostDetailModalOpen(true);
      }

      if (commentOk) {
        setPostDetail((prevPostDetail) => ({
          ...prevPostDetail,
          comments: commentData as IComment[],
        }));
      }
    } catch (error: any) {
      toast.trigger({
        type: "danger",
        message: error.message,
      });
    } finally {
      setPostDetailLoading(false);
    }
  };

   useEffect(() => {
    getDataSource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page]);
  
  const headers: IHeader[] = [
    {
      text: "ID",
      value: "id",
      rowStyles: () => "min-w-[100px] flex justify-start items-center cursor-pointer font-semibold text-blue-600",
      rowClick: (data: IPost) => getPostDetail(data.id),
    },
    { text: "User ID", value: "user_id", rowStyles: () => "min-w-[100px] flex justify-start items-center" },
    { text: "Title", value: "title", rowStyles: () => "min-w-[250px] flex justify-start items-center" },
    { text: "Body", value: "body", rowStyles: () => "min-w-[400px] md:min-w-[200px] flex justify-start items-center" },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-between items-center py-6 px-10">
        <h1 className="text-xl font-bold">Post List</h1>
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

      <Modal
        headerTitle="Post Detail"
        isOpen={postDetailModalOpen}
        onClose={() => setPostDetailModalOpen((prev: boolean) => !prev)}
      >
        <div className="px-2 py-6">
          <h1 className="text-2xl font-bold mb-2">{postDetail.title}</h1>
          <p className="text-gray-600 mb-4">{postDetail.body}</p>
          <p className="text-gray-600 mb-4">
            Posted by user ID: {postDetail.user_id}
          </p>

          <div className="border-t pt-4 overflow-auto max-h-[250px]">
            <h2 className="text-xl font-bold mb-2">Post Comments</h2>
            {postDetail.comments?.length ? (
              postDetail.comments.map((comment, index) => (
                <div key={index} className="flex items-start my-4">
                  <div className="mr-4">
                    <span className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center text-white">
                      {comment.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{comment.name}</p>
                    <p className="text-sm text-gray-500">{comment.email}</p>
                    <p className="text-gray-600">{comment.body}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments available</p>
            )}
          </div>
        </div>
      </Modal>

      {toast.ToastPortal()}
    </div>
  );
}
