import { Fragment } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;

  const { data, error, isLoading, isFetchingNextPage, fetchNextPage } =
    usePosts({ pageSize });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {data.pages.map((posts, index) => (
          <Fragment key={index}>
            {posts?.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </Fragment>
        ))}
      </ul>

      <button
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
        className="btn btn-primary"
      >
        {isFetchingNextPage ? "Loading..." : "Load more"}
      </button>
    </>
  );
};

export default PostList;
