import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Applications from "./Applications.jsx";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
      setName(savedProfile.name);
      setEmail(savedProfile.email);
      setExperience(savedProfile.experience);
      setSkills(savedProfile.skills || []);
    } else {
      setName("Олександр Іваненко");
      setEmail("oleksandr.ivanenko@example.com");
      setExperience("5 років у проєктному менеджменті");
      setSkills(["Проєктний менеджмент", "Agile", "Scrum"]);
    }
  }, []);

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleSave = () => {
    const updatedProfile = { name, email, experience, skills };
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setIsEditing(false);
    alert("Профіль успішно оновлено!");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <section id="resume" className="profile-section">
      <h2 className="profile-title">Мій профіль</h2>
      <div className="profile-container">
        {isEditing ? (
          <>
            <label className="profile-label">Ім'я:</label>
            <input
              className="profile-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="profile-label">Email:</label>
            <input
              className="profile-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="profile-label">Досвід роботи:</label>
            <textarea
              className="profile-textarea"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            ></textarea>

            <label className="profile-label">Навички:</label>
            <ul className="profile-skill-list">
              {skills.map((skill, index) => (
                <li key={index} className="profile-skill-item">
                  {skill}
                </li>
              ))}
            </ul>

            <input
              className="profile-input"
              type="text"
              placeholder="Нова навичка"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              className="profile-button add-skill"
              onClick={handleAddSkill}
            >
              Додати навичку
            </button>

            <div className="profile-button-group">
              <button className="profile-button" onClick={handleSave}>
                Зберегти профіль
              </button>
              <button className="profile-button back" onClick={handleBack}>
                Повернутися
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="profile-info">
              <strong>Ім'я:</strong> {name}
            </p>
            <p className="profile-info">
              <strong>Email:</strong> {email}
            </p>
            <p className="profile-info">
              <strong>Досвід роботи:</strong> {experience}
            </p>
            <p className="profile-info">
              <strong>Навички:</strong>
            </p>
            <ul className="profile-skill-list">
              {skills.map((skill, index) => (
                <li key={index} className="profile-skill-item">
                  {skill}
                </li>
              ))}
            </ul>

            <div className="profile-button-group">
              <button className="profile-button" onClick={handleEdit}>
                Редагувати профіль
              </button>
              <button className="profile-button back" onClick={handleBack}>
                Повернутися
              </button>
            </div>
          </>
        )}
      </div>
      <div>
        <p>applications:</p>
        <Applications />
      </div>
    </section>
  );
};

export default Profile;
