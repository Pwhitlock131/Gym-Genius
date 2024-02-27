import React from "react";
import Header from "../components/Header"

export default function Error() {
  return (
    <div >
      <Header />
      <div className="d-flex align-items-center justify-content-center mt-5">
        <h3>I'm sorry. We could not find that page.</h3>
      </div>
    </div>
  )
}