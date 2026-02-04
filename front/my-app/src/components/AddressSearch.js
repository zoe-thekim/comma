import React from 'react';

const AddressSearch = ({ onAddressSelect, placeholder = "주소를 검색하려면 클릭하세요" }) => {
    const handleAddressSearch = () => {
        if (!window.daum || !window.daum.Postcode) {
            alert('주소 검색 서비스를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
            return;
        }

        new window.daum.Postcode({
            oncomplete: function(data) {
                let addr = ''; // 주소 변수
                let extraAddr = ''; // 참고항목 변수

                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                }

                const fullAddress = addr + extraAddr;

                // 선택한 주소 정보를 부모 컴포넌트로 전달
                if (onAddressSelect) {
                    onAddressSelect({
                        zonecode: data.zonecode,
                        address: fullAddress,
                        roadAddress: data.roadAddress,
                        jibunAddress: data.jibunAddress
                    });
                }
            },
            theme: {
                bgColor: "#FFFFFF",
                searchBgColor: "#0B65C8",
                contentBgColor: "#FFFFFF",
                pageBgColor: "#FFFFFF",
                textColor: "#333333",
                queryTextColor: "#FFFFFF",
                postcodeTextColor: "#FA4256",
                emphTextColor: "#008BD3"
            },
            width: '100%',
            height: '400px'
        }).open();
    };

    return (
        <div
            onClick={handleAddressSearch}
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl shadow-[inset_4px_4px_8px_rgba(207,212,222,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] cursor-pointer hover:shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all duration-300"
        >
            <span className="text-gray-600">
                {placeholder}
            </span>
        </div>
    );
};

export default AddressSearch;