import { React, useEffect, useState } from "react";
import axios from "axios";
import SectionChip from "../../common/ui/sectionChip";
import upicon from "../../assets/image/up-icon.svg";
import downicon from "../../assets/image/down-icon.svg";
import Dropdown from "react-bootstrap/Dropdown";
import SEARCH from "../../assets/image/search.svg";
import trashCan from "../../assets/image/trashCan.png";
import Form from "react-bootstrap/Form";

import {
  useKeyword,
  useIncludedResults,
  useShowIncludedResults,
} from "../../header/hooks/searchBar";
import { colorMapping } from "../../constants/color";

export default function DiList({ userId }) {
  const [cartList, setCartList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const { keyword, setKeyword, searchKeyword } = useKeyword();
  const { showIncludedResults, handleKeyword, handleIncludedResultClick, wrapperRef } =
    useShowIncludedResults(setKeyword);
  const sectors = Object.keys(colorMapping);
  const [color, setColor] = useState("#a1a7c4");
  const [selectedSector, setSelectedSector] = useState("섹터");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_LOCAL_API_URL+`/api/cart?id=` + userId);
        if (response.data) {
          setCartList([...response.data]);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [userId]);

  const allSelected = selectedList.length === cartList.length;

  const handleSelect = (code) => {
    if (selectedList.includes(code)) {
      setSelectedList(selectedList.filter((item) => item !== code));
    } else {
      setSelectedList([...selectedList, code]);
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedList([]);
    } else {
      setSelectedList(cartList.map((item) => item.code));
    }
  };

  const handleSectorColor = (sector) => {
    if (sector === "섹터") {
      return setColor("#a1a7c4");
    } else {
      return setColor("black");
    }
  };

  const getChangeColor = (change) => {
    return change >= 0 ? "#FF0000" : "#0029FF";
  };

  const getChangeIcon = (change) => {
    return change >= 0 ? upicon : downicon;
  };

  const handleDeleteSelected = async () => {
    try {
      const deleteData = selectedList.map((code) => ({ code, userId }));
      await axios.delete(process.env.REACT_APP_LOCAL_API_URL+"/api/cart", { data: deleteData });

      // 삭제된 항목들을 필터링하여 새로운 cartList를 설정
      const newCartList = cartList.filter((item) => !selectedList.includes(item.code));
      setCartList(newCartList);
      setSelectedList([]);
    } catch (error) {
      console.error("Error deleting selected items", error);
    }
  };

  return (
    <div>
      <div className="cart-header">
        <div className="cart-input">
          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ color: color }}>
              {selectedSector}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {sectors.map((sector) => (
                <Dropdown.Item
                  key={sector}
                  href="#/"
                  onClick={() => {
                    setSelectedSector(sector);
                    handleSectorColor(sector);
                  }}
                >
                  {sector}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form className="di-search" onSubmit={searchKeyword}>
            <div className="search-form-group">
              <img src={SEARCH} alt="Search" width="24" />
              <Form.Control
                type="search"
                placeholder="종목명으로 검색하세요."
                className="search-input me-2"
                aria-label="Search"
                value={keyword}
                onChange={handleKeyword}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchKeyword(e); // Enter key를 누르면 검색
                  }
                }}
              ></Form.Control>
            </div>
          </Form>
        </div>
        <img
          className="trash-can"
          src={trashCan}
          alt="trashCan"
          width="24"
          onClick={handleDeleteSelected}
        />
      </div>
      <div className="table-container">
        <table className="table-auto">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
              </th>
              <th>섹터</th>
              <th>종목명</th>
              <th>종목코드</th>
              <th>시세</th>
              <th>전일대비</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map((item) => (
              <tr key={item.code}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedList.includes(item.code)}
                    onChange={() => handleSelect(item.code)}
                  />
                </td>
                <td>
                  <div className="cart-sector">
                    <SectionChip sector="에너지" />
                  </div>
                </td>
                <td>
                  <div>
                    <a
                      href={`/dashboard/` + item.code}
                      style={{ textDecorationLine: "none", color: "#5a607f" }}
                    >
                      {item.name}
                    </a>
                  </div>
                </td>
                <td>
                  <div>
                    <a
                      href={`/dashboard` + item.code}
                      style={{ textDecorationLine: "none", color: "#5a607f" }}
                    >
                      {item.code}
                    </a>
                  </div>
                </td>
                <td style={{ color: getChangeColor(item.compare) }}>{item.price}</td>
                <td style={{ color: getChangeColor(item.compare) }}>
                  <div className="price-change">
                    <img
                      className="up-down-icon"
                      src={getChangeIcon(item.compare)}
                      alt="up-and-down"
                      style={{ width: "15px", height: "15px", marginRight: "5px" }}
                    />
                    <p>{Math.abs(item.compare)}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
