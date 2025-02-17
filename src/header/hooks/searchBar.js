import { useState, useEffect, useRef } from "react";
import { getSearchResult, getIncludedSearchResult } from "../apis/search";
import useDebounce from "./debounce";
import { useNavigate } from "react-router-dom";

export const useKeyword = (userId) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchKeyword = async (event) => {
    event.preventDefault();
    const searchResult = await getSearchResult(keyword);
    if (searchResult.code === 404) {
      alert("해당 종목을 찾을 수 없습니다.");
      return;
    }
    navigate(`/dashboard/${userId}/${searchResult.code}`);
  };

  return { keyword, setKeyword, searchKeyword };
};

export const useIncludedResults = (keyword) => {
  const [includedResults, setIncludedResults] = useState([]);
  const debouncedQuery = useDebounce(keyword, 500);

  async function fetchIncludedSearchResult() {
    const includedSearchResult = await getIncludedSearchResult(keyword);
    setIncludedResults(includedSearchResult || []);
  }

  useEffect(() => {
    fetchIncludedSearchResult();
  }, [debouncedQuery, keyword]);

  return includedResults;
};

export const useShowIncludedResults = (setKeyword) => {
  const [showIncludedResults, setShowIncludedResults] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowIncludedResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleIncludedResultClick = (keyword) => {
    setKeyword(keyword);
    setShowIncludedResults(false);
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
    setShowIncludedResults(true);
  };

  return {
    showIncludedResults,
    handleKeyword,
    handleIncludedResultClick,
    wrapperRef,
  };
};
