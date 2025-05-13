import React from 'react';
import VacancyCard from './VacancyCard';

const VacanciesPage = ({ vacancies, loadingVacancies }) => (
  <section id="vacancies-list">
    <h2>Всі вакансії:</h2>

    {loadingVacancies ? (
      <p>Завантаження вакансій...</p> // показуємо текст під час завантаження
    ) : (
      <div className="vacancy-container">
        {vacancies.length > 0 ? (
          vacancies.map((vac, index) => (
            <VacancyCard key={vac.id || vac.title} vacancy={vac} index={index} />
          ))
        ) : (
          <p>Вакансій наразі немає.</p> // якщо вакансій немає
        )}
      </div>
    )}
  </section>
);

export default VacanciesPage;
