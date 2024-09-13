import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/Home.module.css';

interface Company {
  id: number;
  accountName: string;
  domain: string;
  industry?: string;
  location?: string;
  scale?: string;
}

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 20; // 1ページあたりの表示件数

  useEffect(() => {
    const fetchCompanies = async () => {
      console.log('データ取得開始');
      try {
        const { data, error, count } = await supabase
          .from('companies')
          .select('*', { count: 'exact' })
          .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);
        
        if (error) {
          console.error('Supabaseエラー:', error);
        } else {
          console.log('取得したデータ:', data);
          setCompanies(data as Company[] || []);
          setTotalCount(count || 0);
        }
      } catch (e) {
        console.error('予期せぬエラー:', e);
      }
    };

    fetchCompanies();
  }, [currentPage]);

  const filteredCompanies = companies.filter(company =>
    company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  );
  console.log('フィルター後の会社数:', filteredCompanies.length);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      <h2>会社情報一覧</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="業界で検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>会社名</th>
            <th>ドメイン</th>
            <th>業界</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((company) => (
            <tr key={company.id}>
              <td>{company.accountName}</td>
              <td>{company.domain}</td>
              <td>{company.industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button 
          className={styles.paginationButton}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          前へ
        </button>
        <span className={styles.paginationInfo}>{currentPage} / {totalPages}</span>
        <button 
          className={styles.paginationButton}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          次へ
        </button>
      </div>
    </>
  );
};

export default CompanyList;