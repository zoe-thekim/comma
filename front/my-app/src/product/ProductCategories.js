import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const ProductCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    // 카테고리 아이콘 매핑
    const categoryIcons = {
        '홈데코': '🏠',
        '가구': '🪑',
        '주방': '🍳',
        '침실': '🛏️',
        '욕실': '🚿',
        '조명': '💡',
        '수납': '📦',
        '텍스타일': '🧸',
        '원예': '🌱',
        '기타': '📋'
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.get('/products/categories');
            if (response.data) {
                setCategories(response.data);

                // 각 카테고리의 서브카테고리 미리 로드
                for (const category of response.data) {
                    const subResponse = await api.get(`/products/categories/${category}/subcategories`);
                    if (subResponse.data) {
                        setSubCategories(prev => ({
                            ...prev,
                            [category]: subResponse.data
                        }));
                    }
                }
            }
        } catch (error) {
            console.error('카테고리를 불러오는데 실패했습니다:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        if (expandedCategory === category) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(category);
        }
    };

    const handleSubCategoryClick = (category, subCategory) => {
        navigate(`/product/list?category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(subCategory)}`);
    };

    const handleCategoryOnlyClick = (category) => {
        navigate(`/product/list?category=${encodeURIComponent(category)}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#f5f5f5'}}>
                <div className="text-xl" style={{color: '#374151'}}>Loading categories...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{backgroundColor: '#f5f5f5'}}>
            {/* Header Section */}
            <section className="py-16 px-4" style={{backgroundColor: '#f5f5f5'}}>
                <div className="max-w-7xl mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-12">
                        <div className="inline-block rounded-3xl p-8 mb-6"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff'
                             }}>
                            <h1 className="text-4xl md:text-5xl font-bold" style={{color: '#374151'}}>
                                Browse by
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900"> Category</span>
                            </h1>
                        </div>
                        <div className="max-w-2xl mx-auto rounded-2xl p-4"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff'
                             }}>
                            <p className="text-lg" style={{color: '#374151'}}>
                                🎯 Choose a category to explore our curated collection
                            </p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex justify-center mb-12">
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/product/list')}
                                className="font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: '6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff',
                                    color: '#374151'
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
                                🛍️ View All Products
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-8 px-4" style={{backgroundColor: '#f5f5f5'}}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categories.map((category) => (
                            <div key={category} className="relative">
                                {/* Main Category Card */}
                                <div
                                    className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                                        expandedCategory === category ? 'mb-4' : ''
                                    }`}
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                        boxShadow: expandedCategory === category
                                            ? 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                                            : '12px 12px 24px #d1d1d1, -12px -12px 24px #ffffff'
                                    }}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {/* Category Icon */}
                                    <div className="text-center mb-4">
                                        <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-3"
                                             style={{
                                                 backgroundColor: '#f5f5f5',
                                                 boxShadow: expandedCategory === category
                                                     ? 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                                     : '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff'
                                             }}>
                                            {categoryIcons[category] || '📦'}
                                        </div>
                                        <h3 className="text-lg font-bold mb-2" style={{color: '#374151'}}>{category}</h3>
                                        <div className="text-sm" style={{color: '#374151', opacity: 0.7}}>
                                            {subCategories[category] ? `${subCategories[category].length} subcategories` : ''}
                                        </div>
                                    </div>

                                    {/* Expand Arrow */}
                                    <div className="flex justify-center">
                                        <div className={`transform transition-transform duration-300 ${
                                            expandedCategory === category ? 'rotate-180' : ''
                                        }`}>
                                            <svg className="w-5 h-5" fill="none" stroke="#374151" strokeOpacity="0.7" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Subcategories Dropdown */}
                                {expandedCategory === category && subCategories[category] && (
                                    <div className="absolute top-full left-0 right-0 z-10 rounded-2xl p-4 mt-2"
                                         style={{
                                             backgroundColor: '#f5f5f5',
                                             boxShadow: '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff'
                                         }}>
                                        {/* "View All in Category" Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCategoryOnlyClick(category);
                                            }}
                                            className="w-full text-left p-3 mb-2 rounded-xl text-sm font-semibold transition-all duration-200"
                                            style={{
                                                backgroundColor: '#f5f5f5',
                                                boxShadow: '4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff',
                                                color: '#374151'
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
                                            🔍 View All {category}
                                        </button>

                                        {/* Subcategories */}
                                        <div className="grid gap-2">
                                            {subCategories[category].map((subCategory) => (
                                                <button
                                                    key={subCategory}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSubCategoryClick(category, subCategory);
                                                    }}
                                                    className="text-left p-3 rounded-lg text-sm transition-all duration-200 hover:opacity-80"
                                                    style={{
                                                        backgroundColor: '#f5f5f5',
                                                        boxShadow: '3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff',
                                                        color: '#374151',
                                                        opacity: 0.8
                                                    }}
                                                    onMouseDown={(e) => {
                                                        e.target.style.boxShadow = 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff';
                                                    }}
                                                    onMouseUp={(e) => {
                                                        e.target.style.boxShadow = '3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.boxShadow = '3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff';
                                                    }}
                                                >
                                                    📁 {subCategory}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-16 px-4" style={{backgroundColor: '#f5f5f5'}}>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="rounded-3xl p-8"
                         style={{
                             backgroundColor: '#f5f5f5',
                             boxShadow: '20px 20px 40px #d1d1d1, -20px -20px 40px #ffffff'
                         }}>
                        <div className="rounded-2xl p-4 mb-6"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: 'inset 10px 10px 20px #d1d1d1, inset -10px -10px 20px #ffffff'
                             }}>
                            <h2 className="text-3xl font-bold" style={{color: '#374151'}}>
                                Can't find what you're looking for?
                            </h2>
                        </div>
                        <p className="text-lg mb-6" style={{color: '#374151', opacity: 0.8}}>
                            🔍 Try browsing all products or use our search feature
                        </p>
                        <button
                            onClick={() => navigate('/product/list')}
                            className="group relative font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105"
                            style={{
                                backgroundColor: '#f5f5f5',
                                boxShadow: '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff',
                                color: '#374151'
                            }}
                            onMouseDown={(e) => {
                                e.target.style.boxShadow = 'inset 10px 10px 20px #d1d1d1, inset -10px -10px 20px #ffffff';
                            }}
                            onMouseUp={(e) => {
                                e.target.style.boxShadow = '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.boxShadow = '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff';
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            🛍️ Browse All Products
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductCategories;