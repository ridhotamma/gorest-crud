import { service } from "@/lib/service/http-common";
import { IParams, IPost } from "./interfaces";

/** Posts Api Collection */
function getPaginatedPosts(params: IParams) {
  return service({
    url: "/posts",
    method: "GET",
    params,
  });
}

function getPostDetailById(id: number) {
  return service({
    url: `/posts/${id}`,
    method: "GET",
  });
}

function getPostComments(postId: number) {
  return service({
    url: `/posts/${postId}/comments`,
    method: "GET",
  });
}

function createPost(data: IPost) {
  return service({
    url: `/posts`,
    method: "POST",
    data,
  });
}

function updatePost(id: number, data: IPost) {
  return service({
    url: `/posts/${id}`,
    method: "PUT",
    data,
  });
}

function deletePostById(id: number) {
  return service({
    url: `/posts/${id}`,
    method: "DELETE",
  });
}

export {
  getPaginatedPosts,
  getPostDetailById,
  createPost,
  updatePost,
  deletePostById,
  getPostComments,
};
