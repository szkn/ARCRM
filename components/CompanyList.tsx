import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/Home.module.css';
import Button from './Button';


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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">会社情報一覧</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="業界で検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">会社名</th>
              <th className="border border-gray-300 p-2 text-left">ドメイン</th>
              <th className="border border-gray-300 p-2 text-left">業界</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{company.accountName}</td>
                <td className="border border-gray-300 p-2">{company.domain}</td>
                <td className="border border-gray-300 p-2">{company.industry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          前へ
        </Button>
        <span className="text-gray-600">
          {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          次へ
        </Button>
      </div>
    </div>
  );
};

export default CompanyList;