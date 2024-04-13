import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPosts } from "../../actions/post";

const Home = () => {
  const posts = useSelector((state) => state.posts?.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      {posts?.map((movie) => (
        <div key={movie.id}>
          <Link to={`/post/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
          <p>{movie.overview}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export const homeLoadData = (store) => {
  return store.dispatch(fetchPosts());
};

export default Home;
