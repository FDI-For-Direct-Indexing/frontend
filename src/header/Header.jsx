import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Header.css";
import {
  useKeyword,
  useIncludedResults,
  useShowIncludedResults,
} from "./hooks/searchBar";

function Header() {
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
          <img
            src="../assets/image/header-logo.png"
            alt="Logo"
            width="120"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">홈</Nav.Link>
            <Nav.Link href="/compare">순위 비교</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchKeyword}>
            <div ref={wrapperRef} className="searchForm">
              <Form.Control
                type="search"
                placeholder="종목명으로 검색해보세요."
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={handleKeyword}
              ></Form.Control>
              {showIncludedResults && includedResults.length > 0 && (
                <div className="includedSearchForm">
                  {includedResults.map((result, index) => (
                    <a
                      key={index}
                      className="included-result"
                      onClick={() => {
                        handleIncludedResultClick(result);
                      }}
                    >
                      {result}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="outline-light"
              type="submit"
              className="search-button"
            >
              <img src="/search-icon.svg" alt="Search" width="20" />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;