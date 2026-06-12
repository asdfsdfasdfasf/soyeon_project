import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";

import "../styles/adminContacts.css";

function AdminContacts() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const getContacts = async () => {
    const response = await fetch("http://localhost:3001/contacts");
    const data = await response.json();

    setContacts(data.reverse());
  };

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (!loginUser || loginUser.role !== "admin") {
      alert("관리자만 접근할 수 있습니다.");
      navigate("/");
      return;
    }

    getContacts();
  }, [navigate]);

  const changeStatus = async (contact) => {
    const newStatus = contact.status === "대기중" ? "답변완료" : "대기중";

    await fetch(`http://localhost:3001/contacts/${contact.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    getContacts();

    setSelectedContact({
      ...contact,
      status: newStatus,
    });
  };

  return (
    <>
      <TopNotice />
      <Header />
      <FixedLogo />

      <main className="admin-contact-page">
        <h2>문의 관리</h2>

        <div className="admin-contact-layout">
          <section className="admin-contact-list">
            {contacts.length === 0 ? (
              <p className="empty-contact">등록된 문의가 없습니다.</p>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="admin-contact-item"
                  onClick={() => setSelectedContact(contact)}
                >
                  <div>
                    <p className="contact-name">
                      {contact.lastName}
                      {contact.firstName}
                    </p>
                    <p className="contact-email">{contact.email}</p>
                  </div>

                  <div>
                    <p className="contact-date">{contact.createdAt}</p>
                    <span className={`contact-status ${contact.status}`}>
                      {contact.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </section>

          <section className="admin-contact-detail">
            {!selectedContact ? (
              <p className="select-message">문의를 선택해주세요.</p>
            ) : (
              <>
                <h3>문의 상세</h3>

                <div className="detail-row">
                  <strong>이름</strong>
                  <p>
                    {selectedContact.lastName}
                    {selectedContact.firstName}
                  </p>
                </div>

                <div className="detail-row">
                  <strong>이메일</strong>
                  <p>{selectedContact.email}</p>
                </div>

                <div className="detail-row">
                  <strong>주문번호</strong>
                  <p>{selectedContact.orderNumber || "없음"}</p>
                </div>

                <div className="detail-row">
                  <strong>문의 날짜</strong>
                  <p>{selectedContact.createdAt}</p>
                </div>

                <div className="detail-message">
                  <strong>문의 내용</strong>
                  <p>{selectedContact.message}</p>
                </div>

                <button
                  className="status-btn"
                  onClick={() => changeStatus(selectedContact)}
                >
                  {selectedContact.status === "대기중"
                    ? "답변완료로 변경"
                    : "대기중으로 변경"}
                </button>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminContacts;