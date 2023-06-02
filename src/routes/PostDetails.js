import React from "react";
import { useLoaderData, Link, Form, redirect } from "react-router-dom";

import Modal from "../components/Modal";
import styles from "./PostDetails.module.css";

export default function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={styles.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={styles.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={styles.details}>
        <p className={styles.author}>{post.author}</p>
        <p className={styles.text}>{post.body}</p>
        <div className={styles.actions}>
          <Form method="delete" replace>
            <button type="submit">Delete</button>
          </Form>
          <Link to=".." type="button">
            Cancel
          </Link>
        </div>
      </main>
    </Modal>
  );
}

export const loader = async ({ params }) => {
  const response = await fetch(`http://localhost:8080/posts/${params.id}`);
  const resData = await response.json();
  return resData.post;
};

export const action = async ({ params }) => {
  const res = await fetch(`http://localhost:8080/posts/${params.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 204) {
    return redirect("/");
  }
};
