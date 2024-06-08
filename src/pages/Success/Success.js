import React from "react";
import { Link } from "react-router-dom";

function Success() {
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
      <h2>Siparişiniz Alındı!</h2>
      <p>Teşekkür ederiz, siparişiniz başarıyla alındı.</p>
      <p>Siparişiniz en kısa sürede işleme alınacak ve size bildirilecektir.</p>
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

export default Success;
