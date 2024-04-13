import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchPosts } from "../../actions/post";

const Post = () => {
  const { id } = useParams();
  const post = useSelector((state) => state.posts.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(id));
  }, [id]);

  return (
    <div>
      post
      <h1>{post?.title}</h1>
      <h2>{post?.overview}</h2>
    </div>
  );
};

export const postLoadData = (store, param) => {
  return store.dispatch(fetchPosts(param));
};

export default Post;
