import React from "react";
import Card from "react-bootstrap/Card";
// import ActionButton from "./ActionButton";

const SingleBook = ({
  book: {
    _id,
    title,
    image,
    category: { categoryName },
    user,
    view,
    createdAt,
  },
}) => {
  return (
    <Card className="border-primary">
      <Card.Header className="text-white bg-primary">
        {categoryName}
      </Card.Header>
      <Card.Img
        variant="top"
        src={image.url}
        alt={title}
        style={{ width: "100%" }}
        className="mt-2"
      />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title className="text-success">{title}</Card.Title>
        <Card.Text>{view > 0 ? `${view} views` : "0 view"}</Card.Text>
        {/* <ActionButton _id={_id} /> */}
      </Card.Body>
      <Card.Footer>
        <div>Post by {user ? user.username : "unknow"}</div>
        <div>Created at {createdAt.slice(0, 10)}</div>
      </Card.Footer>
    </Card>
  );
};

export default SingleBook;
