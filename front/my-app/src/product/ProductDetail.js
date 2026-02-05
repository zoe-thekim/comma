import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/products/${id}`);
            if (response.data) {
                setProduct(response.data);
            }
        } catch (error) {
            console.error('상품 정보를 불러오는데 실패했습니다:', error);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const formatPrice = (price) => {
        if (!price) return 'Price on request';
        return '₩' + price.toLocaleString('ko-KR');
    };

    const handleAddToCart = () => {
        alert(`${quantity} x ${product.name} added to cart.`);
    };

    const handleBuyNow = () => {
        alert(`Proceeding to buy ${quantity} x ${product.name}.`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading product details...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xl text-gray-600 mb-4">Product not found.</div>
                    <button
                        onClick={() => navigate('/product/list')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Back to product list
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
                    onClick={() => navigate('/product/list')}
                    className="mb-8 flex items-center text-gray-600 hover:text-gray-900 text-sm"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* 이미지 영역 */}
                    <div className="space-y-4">
                        {/* 메인 이미지 */}
                        <div className="bg-gray-50 aspect-square">
                            <img
                                src={product.imgUrl || "https://via.placeholder.com/600x600/F9FAFB/6B7280?text=이미지+없음"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 원본 링크가 있는 경우 링크 표시 */}
                        {product.url && (
                            <div className="border border-gray-200 p-4 rounded">
                                <p className="text-sm text-gray-600 mb-2">Original product link</p>
                                <a
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm break-all"
                                >
                                    {product.url}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* 상품 정보 영역 */}
                    <div className="space-y-8">
                        {/* 기본 정보 */}
                        <div>
                            <div className="flex gap-2 mb-4 text-xs text-gray-600">
                                <span>#{product.productCode || product.productId}</span>
                                {product.refId && (
                                    <span>• REF: {product.refId}</span>
                                )}
                            </div>

                            {/* 색상과 사이즈 정보 */}
                            {(product.color1 || product.size) && (
                                <div className="flex gap-3 mb-4">
                                    {product.color1 && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">Color:</span>
                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                                                {product.color1}
                                            </span>
                                        </div>
                                    )}
                                    {product.size && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">Size:</span>
                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                                                {product.size}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                                    {product.currency && product.currency !== 'KRW' && (
                                        <span className="text-base text-gray-500">
                                            {product.currency}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {product.description && (
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* 수량 선택 */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-700">Quantity</span>
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
                                        Buy now
                                    </button>
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full py-4 border-2 border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all duration-200"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 상품 상세 정보 */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product information</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Added date</span>
                                    <span className="text-gray-900">
                                        {product.scrapedAt ? new Date(product.scrapedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'No information'}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Last updated</span>
                                    <span className="text-gray-900">
                                        {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'No information'}
                                    </span>
                                </div>
                                {product.color1 && (
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Color</span>
                                        <span className="text-gray-900">{product.color1}</span>
                                    </div>
                                )}
                                {product.size && (
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Size</span>
                                        <span className="text-gray-900">{product.size}</span>
                                    </div>
                                )}
                                {product.currency && (
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Currency</span>
                                        <span className="text-gray-900">{product.currency}</span>
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

export default ProductDetail;