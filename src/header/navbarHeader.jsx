import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { DESCRIPTION } from "../constants/color";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/navbar.css";
import LOGO from "../assets/image/header-logo.png";
import CART from "../assets/image/cart.svg";
import SEARCH from "../assets/image/search.svg";
import USER from "../assets/image/header-user.svg";
import CHATSYMBOL from "../assets/image/chat-symbol.svg";
import {
  useKeyword,
  useIncludedResults,
  useShowIncludedResults,
} from "./hooks/searchbar";

function NavbarHeader() {
  const { keyword, setKeyword, searchKeyword } = useKeyword();
  const includedResults = useIncludedResults(keyword);
  const {
    showIncludedResults,
    handleKeyword,
    handleIncludedResultClick,
    wrapperRef,
  } = useShowIncludedResults(setKeyword);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="nav-body">
      <Container fluid className="con-fluid">
        <Navbar.Brand onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img src={LOGO} alt="Logo" width="160" className="d-inline-block align-top" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll" className="ms-auto">
          <Form className="d-flex search-form" onSubmit={searchKeyword}>
            <div ref={wrapperRef} className="search-form-group">
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
              {showIncludedResults && includedResults.length > 0 && (
                <div className="includedSearchForm">
                  {includedResults.map((result, index) => (
                    <a key={index} className="included-result" onClick={() => handleIncludedResultClick(result)} >
                      {result}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Form>

          <Nav.Link href="/" className="nav-right-link" >
            <img src={CHATSYMBOL} alt="Chat" width="24" style={{ marginRight: '8px' }} />
            <p style={{ margin: 0, color:DESCRIPTION }}>새 채팅 시작하기</p>
          </Nav.Link>
          <Nav.Link href="/cart" className="nav-right-link" >
            <img src={CART} alt="Cart" width="24" style={{ marginRight: '8px' }} />
            <p style={{ margin: 0, color:DESCRIPTION }}>장바구니</p>
          </Nav.Link>
          <Nav.Link href="/user" className="nav-right-link" >
            <img src={USER} alt="User" width="24" style={{ marginRight: '8px' }} />
            <p style={{ margin: 0, color:DESCRIPTION }}>홍길동 님</p>
          </Nav.Link>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavbarHeader;