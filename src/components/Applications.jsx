import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Applications.module.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://lab-5-e0eq.onrender.com/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setApplications(res.data);
      } catch (err) {
        setError("Failed to fetch applications");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ваші заявки</h2>
      {applications.length === 0 ? (
        <p className={styles.noApplications}>Наразі заявок немає.</p>
      ) : (
        <ul className={styles.list}>
          {applications.map((app) => (
            <li key={app.id} className={styles.item}>
              <strong>{app.title}</strong> у <em>{app.company}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Applications;
