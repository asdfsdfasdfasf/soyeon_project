import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import "../styles/returns.css";

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const orderFaqs = [
    {
      question: "S2yeonnie 제품은 어디서 구매할 수 있나요?",
      answer:
        "S2yeonnie 제품은 오직 S2yeonnie 공식 웹사이트에서만 구매가 가능합니다.",
    },
    {
      question: "주문을 취소할 수 있나요?",
      answer: "주문 취소는 상품 준비 전 상태에서만 가능합니다.",
    },
  ];

  const shippingFaqs = [
    {
      question: "제 주문은 언제 발송되나요?",
      answer: "일반적으로 상품 준비 기간은 1~3 영업일이 소요됩니다.",
    },
    {
      question: "국내 배송비 정책과 배송업체는 무엇인가요?",
      answer:
        "7만원 이상 구매 시 무료 배송이며, 국내 주문건은 우체국택배를 통해 발송됩니다.",
    },
  ];

  const productsFaqs = [
    {
      question: "재입고 알림은 어떻게 받나요?",
      answer: "재입고는 Instagram을 통해서도 안내하고 있습니다 <3",
    },
    {
      question: "제품의 상세 치수를 확인할 수 있나요?",
      answer:
        "제품의 상세 페이지에서 size 버튼을 눌러 상세 치수가 기입된 사이즈 가이드를 확인하실 수 있습니다.",
    },
  ];

  const contactFaqs = [
    {
      question: "문의 사항은 어떻게 접수하나요?",
      answer: "contact 페이지에서 문의사항을 작성해주시면 이메일로 답변드립니다.",
    },
  ];

  const renderFaqList = (list, categoryName) => {
    return list.map((item, index) => {
      const id = `${categoryName}-${index}`;

      return (
        <div className="faq-item" key={id}>
          <button className="faq-question" onClick={() => toggleFAQ(id)}>
            <span>{item.question}</span>
            <span>{openIndex === id ? "−" : "+"}</span>
          </button>

          {openIndex === id && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <TopNotice />
      <Header />
      <FixedLogo />

      <div className="returns-page">
        <h2 className="returns-title">FAQs</h2>

        <div className="returns-content">
          <aside className="returns-menu">
            <p>
              <Link to="/faqs" className="active">
                FAQs
              </Link>
            </p>
            <p>
              <Link to="/shipping">SHIPPING</Link>
            </p>
            <p>
              <Link to="/returns">RETURNS</Link>
            </p>
          </aside>

          <section className="faq-text">
            <h3 className="faq-category">orders</h3>
            {renderFaqList(orderFaqs, "orders")}

            <h3 className="faq-category">shipping</h3>
            {renderFaqList(shippingFaqs, "shipping")}

            <h3 className="faq-category">products</h3>
            {renderFaqList(productsFaqs, "products")}

            <h3 className="faq-category">contact</h3>
            {renderFaqList(contactFaqs, "contact")}
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default FAQs;