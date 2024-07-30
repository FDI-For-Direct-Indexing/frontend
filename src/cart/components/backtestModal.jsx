import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko"; // import Korean locale
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import "../styles/modal.css";

registerLocale("ko", ko); // register the locale

export default function BacktestModal({
  showModal,
  handleCloseModal,
  cartList,
  selectedList,
  ratios,
  setRatios,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleBacktestSubmit,
  isBacktestDisabled,
}) {
  const handleRatioChange = (code, value) => {
    if (/^\d*$/.test(value) && value.length <= 3) {
      setRatios((prev) => ({
        ...prev,
        [code]: value,
      }));
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date > endDate) {
      setEndDate(date);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">종목 비율 설정 및 날짜 선택</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedList.map((code, index) => {
          const item = cartList.find((item) => item.code === code);
          return (
            <div key={index} className="ratio-setting">
              <p className="backtest-modal-stock-name">{item.name}</p>
              <Form.Control
                type="number"
                value={ratios[code] || ""}
                onChange={(e) => handleRatioChange(code, e.target.value)}
                placeholder="비율 입력"
                min="0"
                max="100"
              />
            </div>
          );
        })}
        <p className="date-info">시작 날짜와 종료 날짜는 세 달 이상의 차이가 있어야 합니다.</p>
        <div className="date-picker">
          <p className="date-title">시작 날짜</p>
          <DatePicker
            className="date-select"
            selected={startDate}
            onChange={handleStartDateChange}
            maxDate={subMonths(new Date(), 3)} // 현재 날짜 기준으로 3달 전 이하로 선택 가능
            dateFormat="yyyy년 MM월 dd일"
            locale="ko"
          />
        </div>
        <div className="date-picker">
          <p className="date-title">종료 날짜</p>
          <DatePicker
            className="date-select"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={addMonths(startDate, 3)} // 시작 날짜 기준으로 3달 이후부터 선택 가능
            maxDate={new Date()} // 현재 날짜까지 선택 가능
            dateFormat="yyyy년 MM월 dd일"
            locale="ko"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleBacktestSubmit} disabled={isBacktestDisabled}>
          백테스트
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
