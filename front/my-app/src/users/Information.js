import { useState, useEffect } from "react";
import { useAuth } from "../Auth/Authenticator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddressSearch from "../components/AddressSearch";

// axios 요청/응답 로깅을 위한 interceptor 추가
axios.interceptors.request.use(
    (config) => {
        console.log('Axios Request:', config);
        return config;
    },
    (error) => {
        console.error('Axios Request Error:', error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        console.log('Axios Response:', response);
        return response;
    },
    (error) => {
        console.error('Axios Response Error:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            config: error.config,
            response: error.response
        });
        return Promise.reject(error);
    }
);

export default function Information() {
    const { user, updateUser, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        userEmail: '',
        name: '',
        phone: '',
        address: '',
        detailAddress: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('info'); // 'info' 또는 'password'
    const [showManualAddressInput, setShowManualAddressInput] = useState(false);

    useEffect(() => {
        // useAuth의 loading이 완료된 후 로그인 상태 확인
        if (!authLoading) {
            if (!user) {
                console.log('로그인되지 않은 상태입니다.');
                navigate('/users/Login');
                return;
            }

            // 서버에서 최신 사용자 정보 가져오기
            const fetchUserInfo = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/auth/me', {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.data.status === 'OK' && response.data.userData) {
                        setUserInfo({
                            userEmail: response.data.userData.userEmail || '',
                            name: response.data.userData.name || '',
                            phone: response.data.userData.phone || '',
                            address: response.data.userData.address || '',
                            detailAddress: response.data.userData.detailAddress || ''
                        });
                    } else {
                        // userData가 없으면 기본값 설정
                        setUserInfo({
                            userEmail: response.data.userEmail || '',
                            name: '',
                            phone: '',
                            address: '',
                            detailAddress: ''
                        });
                    }
                } catch (error) {
                    console.error('사용자 정보 로드 실패:', error);
                    // 에러 시 기본값으로 설정
                    setUserInfo({
                        userEmail: user.userEmail || '',
                        name: '',
                        phone: '',
                        address: '',
                        detailAddress: ''
                    });
                }
            };

            fetchUserInfo();
        }
    }, [user, authLoading, navigate]);

    const handleAddressSelect = (addressData) => {
        setUserInfo({
            ...userInfo,
            address: addressData.address
        });
        setShowManualAddressInput(false);
    };

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updateData = {
                userEmail: userInfo.userEmail,
                name: userInfo.name?.trim() || '',
                phone: userInfo.phone?.trim() || '',
                address: userInfo.address?.trim() || '',
                detailAddress: userInfo.detailAddress?.trim() || ''
            };

            console.log('업데이트 요청 데이터:', updateData);
            const response = await axios.put('http://localhost:8080/api/auth/update', updateData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            if (response.data.status === 'OK') {
                alert('정보가 성공적으로 업데이트되었습니다.');

                // 응답받은 데이터로 상태 업데이트
                if (response.data.data) {
                    setUserInfo({
                        userEmail: response.data.data.userEmail,
                        name: response.data.data.name || '',
                        phone: response.data.data.phone || '',
                        address: response.data.data.address || '',
                        detailAddress: response.data.data.detailAddress || ''
                    });
                    updateUser(response.data.data); // useAuth의 사용자 정보 업데이트
                }
            } else {
                alert(response.data.message || '업데이트에 실패했습니다.');
            }
        } catch (error) {
            console.error('정보 업데이트 실패:', error);
            const errorMessage = error.response?.data?.message || '업데이트에 실패했습니다.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put('http://localhost:8080/api/auth/update-password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === 'OK') {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                alert(response.data.message || '비밀번호 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('비밀번호 변경 실패:', error);
            alert('비밀번호 변경에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 로딩 중이면 로딩 화면 표시
    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-gray-600">로딩 중...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[10px_10px_24px_rgba(207,212,222,0.5),-10px_-10px_24px_rgba(255,255,255,0.95)] p-8">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">내 정보 관리</h1>

                {/* 탭 메뉴 */}
                <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === 'info'
                                ? 'bg-white text-gray-900 shadow-[4px_4px_8px_rgba(207,212,222,0.5),-4px_-4px_8px_rgba(255,255,255,0.9)]'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        개인정보 수정
                    </button>
                    <button
                        onClick={() => setActiveTab('password')}
                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === 'password'
                                ? 'bg-white text-gray-900 shadow-[4px_4px_8px_rgba(207,212,222,0.5),-4px_-4px_8px_rgba(255,255,255,0.9)]'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        비밀번호 변경
                    </button>
                </div>

                {/* 개인정보 수정 탭 */}
                {activeTab === 'info' && (
                    <form onSubmit={handleInfoSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                                <input
                                    type="email"
                                    value={userInfo.userEmail}
                                    disabled
                                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl shadow-[inset_4px_4px_8px_rgba(207,212,222,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                                <input
                                    type="text"
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl shadow-[inset_4px_4px_8px_rgba(207,212,222,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                                <input
                                    type="tel"
                                    value={userInfo.phone}
                                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl shadow-[inset_4px_4px_8px_rgba(207,212,222,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                                <div className="space-y-3">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex-1">
                                            {!showManualAddressInput && (
                                                <AddressSearch
                                                    onAddressSelect={handleAddressSelect}
                                                    placeholder={userInfo.address || "주소를 검색하려면 클릭하세요"}
                                                />
                                            )}

                                            {showManualAddressInput && (
                                                <input
                                                    type="text"
                                                    value={userInfo.address}
                                                    onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                                                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl shadow-[inset_4px_4px_8px_rgba(207,212,222,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]"
                                                    placeholder="주소를 직접 입력하세요"
                                                />
                                            )}
                                        </div>

                                        {/* 주소 지우기 토글 버튼 */}
                                        {userInfo.address && (
                                            <button
                                                type="button"
                                                onClick={() => setUserInfo({...userInfo, address: '', detailAddress: ''})}
                                                className="px-3 py-3 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 rounded-xl shadow-[4px_4px_8px_rgba(207,212,222,0.5),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(207,212,222,0.5),-2px_-2px_4px_rgba(255,255,255,0.9)] transition-all duration-300 flex items-center justify-center"
                                                title="주소 지우기"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    {/* 상세주소 입력 필드 */}
                                    <input
                                        type="text"
                                        value={userInfo.detailAddress}
                                        onChange={(e) => setUserInfo({...userInfo, detailAddress: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl shadow-[inset_4px_4px_8px_rgba(207,212,222,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]"
                                        placeholder="상세주소 (동/호수, 건물명 등)"
                                    />

                                    <div className="flex gap-2 text-sm">
                                        <button
                                            type="button"
                                            onClick={() => setShowManualAddressInput(!showManualAddressInput)}
                                            className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                                        >
                                            {showManualAddressInput ? '주소 검색으로 변경' : '직접 입력으로 변경'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-gray-100 text-gray-900 font-medium rounded-xl shadow-[6px_6px_12px_rgba(207,212,222,0.5),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(207,212,222,0.5),-2px_-2px_4px_rgba(255,255,255,0.9)] transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? '저장 중...' : '정보 저장'}
                            </button>
                        </div>
                    </form>
                )}

                {/* 비밀번호 변경 탭 */}
                {activeTab === 'password' && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md mx-auto">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">현재 비밀번호</label>
                            <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                required
                                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl shadow-[inset_4px_4px_8px_rgba(207,212,222,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                required
                                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl shadow-[inset_4px_4px_8px_rgba(207,212,222,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
                            <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                required
                                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl shadow-[inset_4px_4px_8px_rgba(207,212,222,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-gray-100 text-gray-900 font-medium rounded-xl shadow-[6px_6px_12px_rgba(207,212,222,0.5),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(207,212,222,0.5),-2px_-2px_4px_rgba(255,255,255,0.9)] transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? '변경 중...' : '비밀번호 변경'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    >
                        메인으로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}