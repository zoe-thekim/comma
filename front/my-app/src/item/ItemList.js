import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const ItemList = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');

    const fetchItems = async (page = 0, append = false) => {
        try {
            if (page === 0) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const params = {
                page: page,
                size: 20
            };

            if (searchKeyword.trim()) {
                params.search = searchKeyword.trim();
            }

            const response = await api.get('/items', { params });

            if (response.data) {
                const newItems = response.data.content;

                if (append) {
                    setItems(prevItems => [...prevItems, ...newItems]);
                } else {
                    setItems(newItems);
                }

                setCurrentPage(response.data.number);
                setTotalPages(response.data.totalPages);
                setHasMore(!response.data.last);
            }
        } catch (error) {
            console.error('상품 목록을 불러오는데 실패했습니다:', error);
            if (page === 0) {
                setItems([]);
            }
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchItems(0, false);
    }, [searchKeyword]);

    const handleLoadMore = () => {
        if (hasMore && !loadingMore) {
            fetchItems(currentPage + 1, true);
        }
    };

    const formatPrice = (price) => {
        if (!price) return '가격 문의';
        return price.toLocaleString('ko-KR') + '원';
    };

    const handleItemClick = (itemNo) => {
        navigate(`/item/detail/${itemNo}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const keyword = e.target.search.value.trim();
        setSearchKeyword(keyword);
        setCurrentPage(0);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-gray-600">상품을 불러오는 중...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* 헤더 */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">상품</h1>

                    {/* 검색 */}
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="flex gap-3 max-w-lg">
                            <input
                                type="text"
                                name="search"
                                placeholder="제품명 검색"
                                defaultValue={searchKeyword}
                                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors duration-200"
                            >
                                검색
                            </button>
                        </div>
                    </form>

                    <div className="text-gray-600 text-sm mb-6">
                        {items.length}개 제품
                        {searchKeyword && (
                            <span className="ml-2 text-gray-900 font-medium">
                                "{searchKeyword}" 검색 결과
                            </span>
                        )}
                    </div>
                </div>

                {/* 상품 그리드 - IKEA 스타일 */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {items.map(item => (
                        <div
                            key={item.itemNo}
                            onClick={() => handleItemClick(item.itemNo)}
                            className="bg-white group cursor-pointer"
                        >
                            {/* 이미지 영역 */}
                            <div className="relative mb-3 bg-gray-50">
                                <img
                                    src={item.imgUrl || "https://via.placeholder.com/300x300/F9FAFB/6B7280?text=이미지+없음"}
                                    alt={item.name}
                                    className="w-full aspect-square object-cover"
                                />

                                {/* 가격 오버레이 (모바일에서만) */}
                                <div className="absolute bottom-2 left-2 md:hidden">
                                    <span className="bg-white px-2 py-1 text-sm font-semibold text-gray-900 rounded shadow-sm">
                                        {formatPrice(item.price)}
                                    </span>
                                </div>
                            </div>

                            {/* 상품 정보 */}
                            <div className="space-y-1">
                                {/* 상품명 */}
                                <h3 className="text-sm text-gray-900 font-normal leading-tight group-hover:underline">
                                    {item.name}
                                </h3>

                                {/* 설명 (있는 경우만) */}
                                {item.description && (
                                    <p className="text-xs text-gray-600 line-clamp-1">
                                        {item.description}
                                    </p>
                                )}

                                {/* 가격 (데스크탑에서만) */}
                                <div className="hidden md:block">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold text-gray-900">
                                            {formatPrice(item.price)}
                                        </span>
                                        {item.currency && item.currency !== 'KRW' && (
                                            <span className="text-sm text-gray-500">
                                                {item.currency}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 상품 번호 */}
                                <div className="text-xs text-gray-500">
                                    #{item.productNo || item.itemNo}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 데이터가 없을 때 */}
                {items.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <div className="text-gray-600 text-base mb-4">
                            {searchKeyword ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}
                        </div>
                        {searchKeyword && (
                            <button
                                onClick={() => {
                                    setSearchKeyword('');
                                    setCurrentPage(0);
                                }}
                                className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors duration-200"
                            >
                                전체 상품 보기
                            </button>
                        )}
                    </div>
                )}

                {/* 더보기 버튼 */}
                {hasMore && items.length > 0 && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            className={`px-8 py-3 text-sm font-medium border-2 transition-colors duration-200 ${
                                loadingMore
                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'
                            }`}
                        >
                            {loadingMore ? '로딩 중...' : '더 많은 제품 보기'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemList;