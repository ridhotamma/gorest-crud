import { service } from "@/lib/service/http-common";
import { IParams, IUser } from "./interfaces";

/** User Api Collection */
function getPaginatedUsers(params: IParams) {
  return service({
    url: "/users",
    method: "GET",
    params,
  });
}

function createUser(data: IUser) {
  return service({
    url: "/users",
    method: "POST",
    data,
  });
}

function updateUser(userId: number, data: IUser) {
  return service({
    url: `/users/${userId}`,
    method: "PUT",
    data,
  });
}

function deleteUser(userId: number) {
  return service({
    url: `/users/${userId}`,
    method: "DELETE",
  });
}

function getUserPosts(userId: number) {
  return service({
    url: `/users/${userId}/posts`,
    method: "GET",
  });
}

function getUserTodos(userId: number) {
  return service({
    url: `/users/${userId}/todos`,
    method: "GET",
  });
}

export {
  getPaginatedUsers,
  createUser,
  getUserPosts,
  getUserTodos,
  updateUser,
  deleteUser,
};
