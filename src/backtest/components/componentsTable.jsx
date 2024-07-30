import React from "react";
import SectionChip from "../../common/ui/sectionChip";

export default function ComponentsTable({ selectedItems, userId }) {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>섹터</th>
          <th>종목명</th>
          <th>종목코드</th>
          <th>구성비율</th>
        </tr>
      </thead>
      <tbody>
        {selectedItems.map((item) => (
          <tr key={item.code}>
            <td>
              <div className="cart-sector">
                <SectionChip sector={item.sector} />
              </div>
            </td>
            <td>
              <div>
                <a
                  href={`/dashboard/` + userId + `/` + item.code}
                  style={{ textDecorationLine: "none", color: "#5a607f" }}
                >
                  {item.name}
                </a>
              </div>
            </td>
            <td>
              <div>
                <a
                  href={`/dashboard/` + userId + `/` + item.code}
                  style={{ textDecorationLine: "none", color: "#5a607f" }}
                >
                  {item.code}
                </a>
              </div>
            </td>
            <td>
              <div>{item.ratio}%</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
