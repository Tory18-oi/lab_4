import React, { useState } from "react";
import Modal from "./Modal";

const VacancyCard = ({ vacancy, onApply, isApplied }) => {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("Коментар не може бути порожнім!");
      return;
    }
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div className="vacancy-card">
      <h3>{vacancy.title}</h3>
      <p>
        <strong>Компанія:</strong> {vacancy.company}
      </p>
      <p>
        <strong>Зарплата:</strong> {vacancy.salary} грн
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <button onClick={() => setShowModal(true)}>Детальніше</button>
        <button
          onClick={() => onApply(vacancy)}
          disabled={isApplied}
          className={isApplied ? "applied" : ""}
        >
          {isApplied ? "Ви вже подали заявку" : "Подати заявку"}
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>{vacancy.title}</h2>
        <p>
          <strong>Компанія:</strong> {vacancy.company}
        </p>
        <p>
          <strong>Вимоги:</strong> {vacancy.requirements}
        </p>
        <p>
          <strong>Категорія:</strong> {vacancy.category}
        </p>
        <p>
          <strong>Регіон:</strong> {vacancy.region}
        </p>
        <p>
          <strong>Дата розміщення:</strong> {vacancy.datePosted}
        </p>

        <h4>Коментарі</h4>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Напишіть ваш коментар..."
        ></textarea>
        <button onClick={handleAddComment}>Додати коментар</button>

        <div id="commentList">
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              {comment}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default VacancyCard;
