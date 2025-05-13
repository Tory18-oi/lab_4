import React, { useEffect, useState } from "react";
import JobSearchForm from "./JobSearchForm";
import VacancyCard from "./VacancyCard";

const SearchPage = ({ vacancies }) => {
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  const handleFilter = (filter) => {
    const result = vacancies.filter(
      (vac) =>
        (!filter.category || vac.category === filter.category) &&
        (!filter.region || vac.region === filter.region) &&
        (!filter.salary || vac.salary <= Number(filter.salary))
    );
    setFilteredVacancies(result);
  };

  const [appliedVacancies, setAppliedVacancies] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Увійдіть в акаунт, щоб подати заявку");
          return;
        }

        const response = await fetch("http://localhost:3000/applications", {
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

  return (
    <section id="search-results">
      <JobSearchForm onFilter={handleFilter} />
      {filteredVacancies.length > 0 ? (
        <div>
          <h2>Результати пошуку:</h2>
          <div className="vacancy-container">
            {filteredVacancies.map((vac, index) => (
              <VacancyCard
                key={vac.title}
                vacancy={vac}
                index={index}
                isApplied={appliedVacancies.some((v) => v.title === vac.title)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Нічого не знайдено або виконайте фільтрацію.</p>
      )}
    </section>
  );
};

export default SearchPage;
