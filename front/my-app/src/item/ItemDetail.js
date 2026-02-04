import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const fetchItem = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/items/${id}`);
            if (response.data) {
                setItem(response.data);
            }
        } catch (error) {
            console.error('상품 정보를 불러오는데 실패했습니다:', error);
            setItem(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchItem();
        }
    }, [id]);

    const formatPrice = (price) => {
        if (!price) return '가격 문의';
        return price.toLocaleString('ko-KR') + '원';
    };

    const handleAddToCart = () => {
        alert(`${item.name} ${quantity}개가 장바구니에 추가되었습니다.`);
    };

    const handleBuyNow = () => {
        alert(`${item.name} ${quantity}개 바로 구매를 진행합니다.`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-gray-600">상품 정보를 불러오는 중...</div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xl text-gray-600 mb-4">상품을 찾을 수 없습니다.</div>
                    <button
                        onClick={() => navigate('/item/list')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        상품 목록으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* 뒤로가기 버튼 */}
                <button
                    onClick={() => navigate('/item/list')}
                    className="mb-8 flex items-center text-gray-600 hover:text-gray-900 text-sm"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    돌아가기
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* 이미지 영역 */}
                    <div className="space-y-4">
                        {/* 메인 이미지 */}
                        <div className="bg-gray-50 aspect-square">
                            <img
                                src={item.imgUrl || "https://via.placeholder.com/600x600/F9FAFB/6B7280?text=이미지+없음"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 원본 링크가 있는 경우 링크 표시 */}
                        {item.url && (
                            <div className="border border-gray-200 p-4 rounded">
                                <p className="text-sm text-gray-600 mb-2">원본 상품 링크</p>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm break-all"
                                >
                                    {item.url}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* 상품 정보 영역 */}
                    <div className="space-y-8">
                        {/* 기본 정보 */}
                        <div>
                            <div className="flex gap-2 mb-4 text-xs text-gray-600">
                                <span>#{item.productNo || item.itemNo}</span>
                                {item.refId && (
                                    <span>• REF: {item.refId}</span>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{item.name}</h1>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold text-gray-900">{formatPrice(item.price)}</span>
                                    {item.currency && item.currency !== 'KRW' && (
                                        <span className="text-base text-gray-500">
                                            {item.currency}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {item.description && (
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {item.description}
                                    </p>
                                </div>
                            )}

                            {/* 수량 선택 */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-700">수량</span>
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center text-sm">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* 구매 버튼들 */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleBuyNow}
                                        className="w-full py-4 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        바로 구매하기
                                    </button>
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full py-4 border-2 border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all duration-200"
                                    >
                                        장바구니 담기
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 상품 상세 정보 */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">상품 정보</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">등록일</span>
                                    <span className="text-gray-900">
                                        {item.scrapedAt ? new Date(item.scrapedAt).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : '정보 없음'}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">최종 업데이트</span>
                                    <span className="text-gray-900">
                                        {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : '정보 없음'}
                                    </span>
                                </div>
                                {item.currency && (
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">통화</span>
                                        <span className="text-gray-900">{item.currency}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ItemDetail;