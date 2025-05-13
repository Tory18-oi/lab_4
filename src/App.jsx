import React, { useState, useEffect } from "react"; // Додаємо useEffect
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase"; // імпорт Firebase Auth
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase"; // імпорт бази даних
import { collection, getDocs } from "firebase/firestore"; // імпорт функцій для роботи з Firestore

import VacancyCard from "./components/VacancyCard";
import Profile from "./components/Profile";
import Image from "./components/Image";
import SearchPage from "./components/SearchPage"; // імпортуємо
import LoginForm from "./components/LoginForm"; // імпортуємо форму для входу
import RegistrationForm from "./components/RegistrationForm"; // імпортуємо форму для реєстрації
import "./App.css";

const App = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loadingVacancies, setLoadingVacancies] = useState(true); // для показу "завантаження"

  const [sortedVacancies, setSortedVacancies] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null); // стейт для користувача
  const navigate = useNavigate(); // для редиректу

  const [appliedVacancies, setAppliedVacancies] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Увійдіть в акаунт, щоб подати заявку");
          return;
        }

        const response = await fetch("http://lab-5-e0eq.onrender.com/applications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        console.log(data);
        setAppliedVacancies(data);
      } catch (error) {
        console.log(error);
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []); //

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("token", token);
        setUser(currentUser);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vacancies"));
        const vacanciesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVacancies(vacanciesData);
      } catch (error) {
        console.error("Помилка завантаження вакансій:", error);
      } finally {
        setLoadingVacancies(false);
      }
    };

    fetchVacancies();
  }, []);

  const handleLogout = () => {
    signOut(auth) // Вихід з Firebase
      .then(() => {
        console.log("Ви вийшли з системи");
        navigate("/login"); // Редирект на сторінку входу
      })
      .catch((error) => {
        console.error("Помилка при виході:", error);
      });
  };
  const handleApply = (title) => {
    if (appliedVacancies.includes(title)) {
      alert("Ви вже подали заявку на позицію '${title}'!");
      return;
    }
    setAppliedVacancies([...appliedVacancies, title]);
    alert("Заявку на позицію '${title}' успішно подано!");
  };

  const handleApplyApplication = async (vacancy) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Увійдіть в акаунт, щоб подати заявку");
      return;
    }

    const isApplied = appliedVacancies.some((v) => v.title === vacancy.title);

    if (isApplied) {
      alert(`Ви вже подали заявку на позицію '${vacancy.title}'!`);
      return;
    }

    try {
      const response = await fetch("http://lab-5-e0eq.onrender.com/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: vacancy.company,
          title: vacancy.title,
        }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося подати заявку");
      }

      setAppliedVacancies([...appliedVacancies, vacancy.title]);
      setTimeout(() => window.location.reload(), 500);

      alert(`Заявку на позицію '${vacancy.title}' успішно подано!`);
    } catch (error) {
      console.error("Помилка подачі заявки:", error);
      alert("Сталася помилка при подачі заявки");
    }
  };

  const handleSort = () => {
    const vacanciesToSort =
      sortedVacancies.length > 0 ? sortedVacancies : vacancies;
    const sorted = [...vacanciesToSort].sort(
      (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
    );
    setSortedVacancies(sorted);
  };

  const VacanciesPage = () => (
    <section id="vacancies">
      <h2>Вакансії</h2>
      <button onClick={handleSort}>Сортувати за датою</button>
      <div className="vacancy-container">
        {(sortedVacancies.length > 0 ? sortedVacancies : vacancies).map(
          (vac, index) => (
            <VacancyCard
              key={vac.title}
              vacancy={vac}
              onApply={handleApplyApplication}
              isApplied={appliedVacancies.some((v) => v.title === vac.title)}
              index={index}
            />
          )
        )}
      </div>
    </section>
  );

  const CommentsSection = () => (
    <section id="comments" style={{ marginTop: "50px" }}>
      <h2>Коментарі</h2>
      <div>
        <textarea
          id="commentText"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Напишіть ваш коментар..."
        ></textarea>
        <button
          onClick={() => {
            if (!newComment.trim()) {
              alert("Коментар не може бути порожнім!");
              return;
            }
            setComments([...comments, newComment]);
            setNewComment("");
          }}
        >
          Додати коментар
        </button>
      </div>
      <div id="commentList">
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            {comment}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="App">
      <header className="header">
        <nav className="navigation">
          <ul className="nax">
            <li className="nav-item">
              <Link to="/">Вакансії</Link>
            </li>
            <li className="nav-item">
              <Link to="/search">Пошук роботи</Link>
            </li>{" "}
            {/* Додано лінк на пошук роботи */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/profile">Мій профіль</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Вийти</button>
                </li>{" "}
                {/* Кнопка для виходу */}
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Вхід</Link>
                </li>
                <li>
                  <Link to="/register">Реєстрація</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <VacanciesPage
              vacancies={vacancies}
              loadingVacancies={loadingVacancies}
            />
          }
        />
        <Route path="/profile" element={user ? <Profile /> : <LoginForm />} />
        <Route
          path="/search"
          element={
            <SearchPage
              vacancies={vacancies}
              appliedVacancies={appliedVacancies}
              onApply={handleApply}
            />
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>

      <Image />

      <footer>
        <p>&copy; 2025 Платформа для пошуку роботи</p>
      </footer>
    </div>
  );
};

export default App;
