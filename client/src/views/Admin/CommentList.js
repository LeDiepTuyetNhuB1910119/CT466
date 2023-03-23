import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";

import { CommentContext } from "../../contexts/CommentContext";
import ActionCommentAdmin from "../../components/comments/ActionCommentAdmin";
import AddCommentModal from "../../components/comments/AddCommentModal";

const CommentList = () => {
  // comment context
  const {
    commentState: { comments, commentsLoading },
    getComments,
    getCommentsByBook,

    showToast: { show, message, type },
    setShowToast,
    setShowAddCommentModal,
  } = useContext(CommentContext);

  // useState
  const [filteredComments, setFilteredComments] = useState("");

  // use params
  const params = useParams();

  // use effect
  useEffect(() => {
    if (params.id) {
      const gettingCommentByBook = async () => {
        await getCommentsByBook(params.id);
      };
      gettingCommentByBook();
    } else {
      const gettingComments = async () => {
        getComments();
      };
      gettingComments();
    }
  }, [params.id]);

  // effect set filteredBook
  useEffect(() => {
    const setFilter = async () => {
      setFilteredComments(comments);
    };
    setFilter();
  }, [comments]);

  // function handle search comments
  const handleSearch = (event) => {
    let query = event.target.value;
    const searchComments = comments.filter(
      (comment) =>
        comment.content.toLowerCase().includes(query.toLowerCase()) ||
        comment.book.title.toLowerCase().includes(query.toLowerCase()) ||
        comment.user?.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredComments(searchComments);
  };

  let body = null;

  if (commentsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (filteredComments.length === 0) {
    body = <p className=" text-center mt-5">Không tìm thấy thông tin</p>;
  } else {
    body = (
      <>
        <div className="table-responsive">
          <table className="table table-bordered border-primary table-hover">
            <thead className="table-primary">
              <tr className="text-center align-middle">
                <th width="250">ID</th>
                <th>Content</th>
                <th width="200">Book</th>
                <th width="100">Poster</th>
                <th width="150">Created At</th>
                <th width="200">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comment) => (
                <tr key={comment._id} className="align-middle">
                  <td>{comment._id}</td>
                  <td>{comment.content}</td>
                  <td className="text-center">{comment.book.title}</td>
                  <td className="text-center">
                    {comment.user ? comment.user.username : "unknow"}
                  </td>
                  <td className="text-center">
                    {comment.createdAt.slice(0, 10)}
                  </td>
                  <td className="text-center">
                    <ActionCommentAdmin _id={comment._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      <Container>
        {params.id ? (
          <h1 className="text-center mt-4 my-4">Comments of Book</h1>
        ) : (
          <h1 className="text-center mt-4 my-4">List comments</h1>
        )}

        <div className="row">
          <div className="col col-md-4">
            <Form className="row">
              <Form.Label className="col-auto">Search comment:</Form.Label>
              <Form.Control
                type="search"
                className="col"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
              />
            </Form>
          </div>
          <div className="col d-grid justify-content-end">
            <Button
              onClick={() => {
                setShowAddCommentModal(true);
              }}
            >
              Create
            </Button>
          </div>
        </div>

        <div className="mb-4 mt-4">
          <b>Total: </b>
          <b className="text-success font-weight-bold">
            {filteredComments.length}
          </b>{" "}
          comments
        </div>

        <div>{body}</div>

        {/* add comment */}
        <AddCommentModal />

        {/* show toast */}
        <Toast
          show={show}
          style={{ position: "fixed", top: "10%", right: "10px" }}
          className={`bg-${type} text-white`}
          onClose={() =>
            setShowToast({
              show: false,
              message: "",
              type: null,
            })
          }
          delay={3000}
          autohide
        >
          <Toast.Body>
            <strong>{message}</strong>
          </Toast.Body>
        </Toast>
      </Container>
    </>
  );
};

export default CommentList;
