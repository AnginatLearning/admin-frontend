import React from "react";

export default function PricingTable({ prices }) {
  return (
    <div
      style={{
        maxHeight: "250px", //Limit the height of the container
        overflowY: "auto", // Enable vertical scrolling
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    >
      <table
        className="table text-center"
        style={{
          borderRadius: "8px",
          borderCollapse: "collapse", // Avoid double borders
          tableLayout: "fixed", // Ensures even column widths
          width: "100%",
          margin: "0",
        }}
      >
        <thead
          style={{
            backgroundColor: "#6A73FA",
            color: "white",
            position: "sticky", // Keep header visible while scrolling
            top: "0", // Align it at the top
            zIndex: "1", // Ensures it stays above table content
          }}
        >
          <tr>
            <th className="text-white" style={{ width: "10%" }}>
              Srl No.
            </th>
            <th className="text-white" style={{ width: "30%" }}>
              Currency
            </th>
            <th className="text-white" style={{ width: "30%" }}>
              Offer Price
            </th>
            <th className="text-white" style={{ width: "30%" }}>
              Standard Price
            </th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{price.currency}</td>
              <td>{price.offerPrice}</td>
              <td>{price.standardPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
