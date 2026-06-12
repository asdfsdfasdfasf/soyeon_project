import { useState } from "react";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";

import "../styles/contact.css";

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    orderNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    const newContact = {
      ...form,
      status: "대기중",
      createdAt: new Date().toLocaleString(),
    };

    await fetch("http://localhost:3001/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });

    alert("문의가 접수되었습니다.");

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      orderNumber: "",
      message: "",
    });
  };

  return (
    <>
      <TopNotice />
      <Header />
      <FixedLogo />

      <main className="contact-page">
        <section className="contact-title">
          <h2>CONTACT</h2>
          <p>
            문의사항을 남겨주시면 확인 후 답변드리겠습니다.
            <br />
            주문 관련 문의는 주문번호를 함께 입력해주세요.
          </p>
        </section>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <div className="contact-field">
              <label>
                이름 <span>*</span>
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="contact-field">
              <label>
                성 <span>*</span>
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="contact-row">
            <div className="contact-field">
              <label>
                email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="contact-field">
              <label>order number</label>
              <input
                name="orderNumber"
                value={form.orderNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="contact-field full">
            <label>
              문의 내용 <span>*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <p className="contact-required">
            <span>*</span> 필수 입력 항목입니다.
          </p>

          <button className="contact-send-btn">SEND</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Contact;