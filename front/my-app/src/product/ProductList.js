import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../api';

const ProductList = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(searchParams.get('subCategory') || '');

    const fetchProducts = async (page = 0, append = false) => {
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

            if (selectedCategory) {
                params.category = selectedCategory;
            }

            if (selectedSubCategory) {
                params.subCategory = selectedSubCategory;
            }

            const response = await api.get('/products', { params });

            if (response.data) {
                const newProducts = response.data.content;

                if (append) {
                    setProducts(prevProducts => [...prevProducts, ...newProducts]);
                } else {
                    setProducts(newProducts);
                }

                setCurrentPage(response.data.number);
                setTotalPages(response.data.totalPages);
                setHasMore(!response.data.last);
            }
        } catch (error) {
            console.error('상품 목록을 불러오는데 실패했습니다:', error);
            if (page === 0) {
                setProducts([]);
            }
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/products/categories');
            if (response.data) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error('카테고리를 불러오는데 실패했습니다:', error);
        }
    };

    const fetchSubCategories = async (category) => {
        try {
            const response = await api.get(`/products/categories/${category}/subcategories`);
            if (response.data) {
                setSubCategories(response.data);
            }
        } catch (error) {
            console.error('서브카테고리를 불러오는데 실패했습니다:', error);
            setSubCategories([]);
        }
    };

    const handleCategoryChange = (category) => {
        // 같은 카테고리를 클릭하면 전체 보기로 전환
        if (selectedCategory === category) {
            setSelectedCategory('');
            setSelectedSubCategory('');
            setSubCategories([]);
        } else {
            setSelectedCategory(category);
            setSelectedSubCategory('');
            if (category) {
                fetchSubCategories(category);
            } else {
                setSubCategories([]);
            }
        }
        setCurrentPage(0);
    };

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setCurrentPage(0);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts(0, false);
    }, [searchKeyword, selectedCategory, selectedSubCategory]);

    const handleLoadMore = () => {
        if (hasMore && !loadingMore) {
            fetchProducts(currentPage + 1, true);
        }
    };

    const formatPrice = (price) => {
        if (!price) return 'Price on request';
        return '₩' + price.toLocaleString('ko-KR');
    };

    const handleProductClick = (productId) => {
        navigate(`/product/detail/${productId}`);
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
                <div className="text-xl text-gray-600">Loading products...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{backgroundColor: '#f5f5f5'}}>
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* 헤더 */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-700 mb-6">Products</h1>

                    {/* 카테고리 네비게이션 */}
                    <div className="mb-6">
                        <div className="mb-4">
                            {/* 전체 보기 버튼 */}
                            <button
                                onClick={() => handleCategoryChange('')}
                                className={`mb-3 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    !selectedCategory ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
                                }`}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: !selectedCategory
                                        ? 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                        : '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff'
                                }}
                            >
                                📋 전체 보기
                            </button>
                        </div>

                        <div className="grid grid-cols-5 gap-2 mb-6">
                            {categories.length > 0 ? categories.slice(0, 5).map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        selectedCategory === category
                                            ? 'text-gray-900'
                                            : 'text-gray-700 hover:text-gray-900'
                                    }`}
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                        boxShadow: selectedCategory === category
                                            ? 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                            : '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff'
                                    }}
                                    onMouseDown={(e) => {
                                        e.target.style.boxShadow = 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff';
                                    }}
                                    onMouseUp={(e) => {
                                        e.target.style.boxShadow = selectedCategory === category
                                            ? 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                            : '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.boxShadow = selectedCategory === category
                                            ? 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                            : '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff';
                                    }}
                                >
                                    <div className="hidden sm:block text-center">
                                        <div className="text-lg mb-1">
                                            {category === '홈데코' && '🏠'}
                                            {category === '가구' && '🪑'}
                                            {category === '주방/다이닝' && '🍳'}
                                            {category === '조명' && '💡'}
                                            {category === '수납/정리' && '📦'}
                                        </div>
                                        <div className="text-xs">{category}</div>
                                    </div>
                                    <div className="sm:hidden text-xs text-center">
                                        {category}
                                    </div>
                                </button>
                            )) : (
                                <div className="col-span-5 text-center py-4 text-gray-500">
                                    카테고리를 불러오는 중...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 검색 및 필터 */}
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3 max-w-lg">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search products"
                                    defaultValue={searchKeyword}
                                    className="flex-1 px-4 py-3 text-gray-700 text-sm focus:outline-none rounded-lg transition-all duration-200"
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                        boxShadow: 'inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff',
                                        border: 'none'
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 text-gray-700 text-sm font-medium rounded-lg transition-all duration-200"
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                        boxShadow: '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff'
                                    }}
                                    onMouseDown={(e) => {
                                        e.target.style.boxShadow = 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff';
                                    }}
                                    onMouseUp={(e) => {
                                        e.target.style.boxShadow = '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.boxShadow = '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff';
                                    }}
                                >
                                    Search
                                </button>
                            </div>

                            {/* 서브카테고리 필터 */}
                            {selectedCategory && subCategories.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    <select
                                        value={selectedSubCategory}
                                        onChange={(e) => handleSubCategoryChange(e.target.value)}
                                        className="px-4 py-2 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 rounded-lg transition-all duration-200"
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            boxShadow: '4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff',
                                            border: 'none'
                                        }}
                                    >
                                        <option value="">All {selectedCategory}</option>
                                        {subCategories.map(subCategory => (
                                            <option key={subCategory} value={subCategory}>
                                                {subCategory}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleCategoryChange('');
                                            setSelectedSubCategory('');
                                        }}
                                        className="px-4 py-2 text-gray-700 text-sm font-medium rounded-lg transition-all duration-200"
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            boxShadow: '4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff'
                                        }}
                                        onMouseDown={(e) => {
                                            e.target.style.boxShadow = 'inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff';
                                        }}
                                        onMouseUp={(e) => {
                                            e.target.style.boxShadow = '4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.boxShadow = '4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff';
                                        }}
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>

                    <div className="text-gray-600 text-sm mb-6">
                        {products.length} products
                        {searchKeyword && (
                            <span className="ml-2 text-gray-900 font-medium">
                                "{searchKeyword}" search results
                            </span>
                        )}
                    </div>
                </div>

                {/* 상품 그리드 - 뉴모피즘 스타일 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div
                            key={product.productId}
                            onClick={() => handleProductClick(product.productId)}
                            className="group cursor-pointer rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02]"
                            style={{
                                backgroundColor: '#f5f5f5',
                                boxShadow: '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '20px 20px 40px #d1d1d1, -20px -20px 40px #ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff';
                            }}
                        >
                            {/* 이미지 영역 */}
                            <div className="relative mb-6 rounded-2xl overflow-hidden"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                                 }}>
                                <img
                                    src={product.imgUrl || "https://via.placeholder.com/400x300/F5F5F5/6B7280?text=이미지+없음"}
                                    alt={product.name}
                                    className="w-full aspect-[4/3] object-cover"
                                />
                            </div>

                            {/* 상품 정보 */}
                            <div className="space-y-4">
                                {/* 상품명과 카테고리 */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-gray-900 transition-colors duration-200">
                                        {product.name}
                                    </h3>
                                    {product.category && (
                                        <div className="inline-block px-3 py-1 rounded-lg text-xs font-medium text-gray-600"
                                             style={{
                                                 backgroundColor: '#f5f5f5',
                                                 boxShadow: '4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff'
                                             }}>
                                            {product.category}
                                        </div>
                                    )}
                                </div>

                                {/* 설명 */}
                                {product.description && (
                                    <div className="rounded-xl p-3"
                                         style={{
                                             backgroundColor: '#f5f5f5',
                                             boxShadow: 'inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff'
                                         }}>
                                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>
                                )}

                                {/* 속성들 */}
                                <div className="flex flex-wrap gap-2">
                                    {product.color1 && (
                                        <span className="px-3 py-1 rounded-lg text-xs font-medium text-gray-600"
                                              style={{
                                                  backgroundColor: '#f5f5f5',
                                                  boxShadow: '3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff'
                                              }}>
                                            🎨 {product.color1}
                                        </span>
                                    )}
                                    {product.size && (
                                        <span className="px-3 py-1 rounded-lg text-xs font-medium text-gray-600"
                                              style={{
                                                  backgroundColor: '#f5f5f5',
                                                  boxShadow: '3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff'
                                              }}>
                                            📏 {product.size}
                                        </span>
                                    )}
                                </div>

                                {/* 가격과 상품번호 */}
                                <div className="flex justify-between items-end pt-2">
                                    <div>
                                        <div className="text-xl font-bold text-gray-700 mb-1">
                                            {formatPrice(product.price)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            #{product.productCode || product.productId}
                                        </div>
                                    </div>

                                    {/* 더보기 버튼 */}
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                                         style={{
                                             backgroundColor: '#f5f5f5',
                                             boxShadow: '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff'
                                         }}>
                                        <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200"
                                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 데이터가 없을 때 */}
                {products.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <div className="text-gray-600 text-base mb-4">
                            {searchKeyword ? 'No search results found.' : 'No products found.'}
                        </div>
                        {searchKeyword && (
                            <button
                                onClick={() => {
                                    setSearchKeyword('');
                                    setCurrentPage(0);
                                }}
                                className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors duration-200"
                            >
                                View all products
                            </button>
                        )}
                    </div>
                )}

                {/* 더보기 버튼 */}
                {hasMore && products.length > 0 && (
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
                            {loadingMore ? 'Loading...' : 'Load more products'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;