import React, { useState } from 'react';
import './JobSearchForm.css'; // Не забудь додати імпорт CSS!

const JobSearchForm = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter({ category, region, salary: salary ? Number(salary) : '' });
  };

  return (
    <section id="search" className="search-section">
      <h2 className="search-title">Пошук роботи</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Категорія:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
          >
            <option value="">Всі</option>
            <option value="it">ІТ</option>
            <option value="marketing">Маркетинг</option>
            <option value="design">Дизайн</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="region" className="form-label">Регіон:</label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="form-select"
          >
            <option value="">Всі</option>
            <option value="kyiv">Київ</option>
            <option value="lviv">Львів</option>
            <option value="odesa">Одеса</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="salary" className="form-label">Зарплата (від):</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Вкажіть суму"
            className="form-input"
          />
        </div>

        <button type="submit" className="search-button">Пошук</button>
      </form>
    </section>
  );
};

export default JobSearchForm;
