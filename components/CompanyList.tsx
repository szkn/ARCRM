import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: バックエンドのAPIを呼び出して企業情報を取得する
    setCompanies([
      { id: 1, name: '株式会社A', industry: 'IT' },
      { id: 2, name: '株式会社B', industry: '製造' },
      { id: 3, name: '株式会社C', industry: 'IT' },
    ]);
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h2>会社情報一覧</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="業界で検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>会社名</th>
            <th>業界</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CompanyList;