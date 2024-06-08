import React from "react";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Hata !. Siparişiniz Alinamadi!</h2>
      <p>
        Ana sayfaya dönmek için tiklayin{" "}
        <Link to={"../"} replace={true}>
          Anasayfa
        </Link>
        .
      </p>
    </div>
  );
}

export default Cancel;
