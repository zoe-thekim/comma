import {useNavigate} from "react-router-dom";
import {useAuth} from "../Auth/Authenticator";

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return(
        <div className="min-h-screen" style={{backgroundColor: '#f5f5f5'}}>
            {/* 상단 섹션 - Hero/Banner with Neumorphism */}
            <section className="relative py-20 px-4" style={{backgroundColor: '#f5f5f5'}}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-16 lg:grid-cols-2 items-center">
                        <div className="space-y-8">
                            {/* Neumorphic Title Container */}
                            <div className="rounded-3xl p-8 relative overflow-hidden"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff'
                                 }}>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                                <h1 className="text-5xl md:text-6xl font-bold leading-tight relative z-10" style={{color: '#374151'}}>
                                    Welcome to
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 mt-2">
                                        comma
                                    </span>
                                </h1>
                            </div>

                            {/* Neumorphic Description */}
                            <div className="rounded-2xl p-6"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff'
                                 }}>
                                <p className="text-lg leading-relaxed" style={{color: '#374151', opacity: 0.8}}>
                                    ✨ Discover amazing products with our curated collection.
                                    Browse through thousands of premium items and find exactly what your heart desires.
                                </p>
                            </div>

                            {/* Neumorphic Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6">
                                <button
                                    onClick={() => navigate('/product')}
                                    className="group relative font-bold py-4 px-8 rounded-2xl
                                             transition-all duration-200 transform hover:scale-105"
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                        boxShadow: '8px 8px 16px #c3bdb6, -8px -8px 16px #f3ede6',
                                        color: '#374151'
                                    }}
                                    onMouseDown={(e) => {
                                        e.target.style.boxShadow = 'inset 8px 8px 16px #c3bdb6, inset -8px -8px 16px #f3ede6';
                                    }}
                                    onMouseUp={(e) => {
                                        e.target.style.boxShadow = '8px 8px 16px #c3bdb6, -8px -8px 16px #f3ede6';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.boxShadow = '8px 8px 16px #c3bdb6, -8px -8px 16px #f3ede6';
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                    🛍️ Browse Products
                                </button>
                                {!user && (
                                    <button
                                        onClick={() => navigate('/users/Login')}
                                        className="font-semibold py-4 px-8 rounded-2xl
                                                 transition-all duration-200"
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            boxShadow: '6px 6px 12px #c3bdb6, -6px -6px 12px #f3ede6',
                                            color: '#374151',
                                            opacity: 0.8
                                        }}
                                        onMouseDown={(e) => {
                                            e.target.style.boxShadow = 'inset 6px 6px 12px #c3bdb6, inset -6px -6px 12px #f3ede6';
                                        }}
                                        onMouseUp={(e) => {
                                            e.target.style.boxShadow = '6px 6px 12px #c3bdb6, -6px -6px 12px #f3ede6';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.boxShadow = '6px 6px 12px #c3bdb6, -6px -6px 12px #f3ede6';
                                        }}
                                    >
                                        🚀 Sign In
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Neumorphic Demo Cards */}
                        <div className="relative">
                            <div className="rounded-3xl p-8"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: '20px 20px 40px #d1d1d1, -20px -20px 40px #ffffff'
                                 }}>
                                <div className="grid gap-6">
                                    <div className="grid gap-4">
                                        <div className="h-16 rounded-2xl flex items-center justify-center"
                                             style={{
                                                 backgroundColor: '#f5f5f5',
                                                 boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                                             }}>
                                            <div className="w-8 h-8 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full shadow-md animate-bounce"></div>
                                        </div>
                                        <div className="h-16 rounded-2xl flex items-center justify-center"
                                             style={{
                                                 backgroundColor: '#f5f5f5',
                                                 boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                                             }}>
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full shadow-md animate-bounce delay-100"></div>
                                        </div>
                                        <div className="h-20 rounded-2xl flex items-center justify-center"
                                             style={{
                                                 backgroundColor: '#f5f5f5',
                                                 boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                                             }}>
                                            <div className="w-10 h-10 bg-gradient-to-r from-green-300 to-blue-400 rounded-full shadow-md animate-bounce delay-200"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-20 rounded-2xl flex items-center justify-center"
                                             style={{
                                                 backgroundColor: '#f5f5f5',
                                                 boxShadow: 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                             }}>
                                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full animate-pulse"></div>
                                        </div>
                                        <div className="h-20 rounded-2xl flex items-center justify-center"
                                             style={{
                                                 backgroundColor: '#f5f5f5',
                                                 boxShadow: 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                             }}>
                                            <div className="w-6 h-6 bg-gradient-to-r from-red-300 to-pink-400 rounded-full animate-pulse delay-75"></div>
                                        </div>
                                        <div className="h-20 rounded-2xl flex items-center justify-center"
                                             style={{
                                                 backgroundColor: '#f5f5f5',
                                                 boxShadow: 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                             }}>
                                            <div className="w-6 h-6 bg-gradient-to-r from-purple-300 to-indigo-400 rounded-full animate-pulse delay-150"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 중간 섹션 - Neumorphic Features */}
            <section className="py-20 px-4" style={{backgroundColor: '#f5f5f5'}}>
                <div className="max-w-7xl mx-auto">
                    {/* Neumorphic Title Section */}
                    <div className="text-center mb-16">
                        <div className="inline-block rounded-3xl p-8 mb-8"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff'
                             }}>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#374151]">
                                Why Choose
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> comma</span>?
                            </h2>
                        </div>
                        <div className="max-w-3xl mx-auto rounded-2xl p-6"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff'
                             }}>
                            <p className="text-xl text-[#374151] opacity-80">
                                🌟 We provide the best shopping experience with carefully selected products and exceptional service.
                            </p>
                        </div>
                    </div>

                    {/* Neumorphic Feature Cards */}
                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="group rounded-3xl p-10 transition-all duration-300"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff'
                             }}>
                            {/* Neumorphic Icon */}
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-all"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                                 }}>
                                <div className="text-3xl">✅</div>
                            </div>
                            <h3 className="text-2xl font-bold text-[#374151] mb-6">Quality Products</h3>
                            <div className="rounded-xl p-4"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                 }}>
                                <p className="text-[#374151] opacity-80 leading-relaxed">
                                    All our products are carefully selected and tested to ensure the highest quality standards for your satisfaction.
                                </p>
                            </div>
                        </div>

                        <div className="group rounded-3xl p-10 transition-all duration-300"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff'
                             }}>
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-all"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                                 }}>
                                <div className="text-3xl">⚡</div>
                            </div>
                            <h3 className="text-2xl font-bold text-[#374151] mb-6">Fast Delivery</h3>
                            <div className="rounded-xl p-4"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                 }}>
                                <p className="text-[#374151] opacity-80 leading-relaxed">
                                    Quick and reliable delivery service to get your products to you as soon as possible with care.
                                </p>
                            </div>
                        </div>

                        <div className="group rounded-3xl p-10 transition-all duration-300"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff'
                             }}>
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-all"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                                 }}>
                                <div className="text-3xl">💜</div>
                            </div>
                            <h3 className="text-2xl font-bold text-[#374151] mb-6">Customer Care</h3>
                            <div className="rounded-xl p-4"
                                 style={{
                                     backgroundColor: '#f5f5f5',
                                     boxShadow: 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                 }}>
                                <p className="text-[#374151] opacity-80 leading-relaxed">
                                    Our dedicated support team is here to help you with any questions or concerns 24/7.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 하단 섹션 - Neumorphic Call to Action */}
            <section className="py-20 px-4" style={{backgroundColor: '#f5f5f5'}}>
                <div className="max-w-5xl mx-auto">
                    <div className="rounded-3xl p-12 text-center"
                         style={{
                             backgroundColor: '#f5f5f5',
                             boxShadow: '20px 20px 40px #d1d1d1, -20px -20px 40px #ffffff'
                         }}>
                        {/* Title */}
                        <div className="rounded-2xl p-6 mb-8"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: 'inset 12px 12px 24px #d1d1d1, inset -12px -12px 24px #ffffff'
                             }}>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#374151]">
                                Ready to Start
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Shopping</span>?
                            </h2>
                        </div>

                        {/* Description */}
                        <div className="rounded-xl p-6 mb-10"
                             style={{
                                 backgroundColor: '#f5f5f5',
                                 boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff'
                             }}>
                            <p className="text-xl text-[#374151] opacity-80 leading-relaxed">
                                🎉 Join thousands of satisfied customers and discover your perfect products today!
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button
                                onClick={() => navigate('/product')}
                                className="group relative text-[#374151] font-bold py-5 px-10 rounded-2xl text-lg
                                         transition-all duration-200 transform hover:scale-105"
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff'
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
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                🛒 Explore Products
                            </button>
                            {user && (
                                <div className="rounded-2xl px-8 py-4"
                                     style={{
                                         backgroundColor: '#f5f5f5',
                                         boxShadow: 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff'
                                     }}>
                                    <div className="text-[#374151] opacity-80 font-semibold">
                                        🙋‍♀️ Welcome back, {user.name || 'User'}!
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;

