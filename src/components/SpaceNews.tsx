import React, { useEffect, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  summary: string;
  published_at: string;
  news_site: string;
}

const ITEMS_PER_PAGE = 4;
const CATEGORIES = ['SpaceX', 'NASA', 'Mars', 'Moon', 'ISS'];
const BASE_API_URL = 'https://api.spaceflightnewsapi.net/v4/articles';

export default function SpaceNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (pageNum: number, category: string = '', search: string = '') => {
    try {
      setError(null);
      let url = `${BASE_API_URL}?limit=${ITEMS_PER_PAGE}&offset=${(pageNum - 1) * ITEMS_PER_PAGE}`;
      
      if (category || search) {
        const searchTerm = category || search;
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (pageNum === 1) {
        setArticles(data.results);
      } else {
        setArticles(prev => [...prev, ...data.results]);
      }
      
      setHasMore(data.results.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching space news:', error);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchNews(1, selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage, selectedCategory, searchQuery);
  };

  const SkeletonCard = () => (
    <div className="bg-white/80 rounded-xl overflow-hidden shadow-lg">
      <div className="animate-pulse">
        <div className="aspect-video bg-gray-200" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="h-[800px] bg-white/80 rounded-xl p-6 flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => fetchNews(1, selectedCategory, searchQuery)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="h-[800px] bg-white/80 rounded-xl p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Latest Space News</h2>

      <div className="flex flex-col gap-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === '' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative aspect-video">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{article.summary}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{article.news_site}</span>
                    <span>{new Date(article.published_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

        {!loading && hasMore && articles.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}