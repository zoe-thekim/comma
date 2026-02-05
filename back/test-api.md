# API 테스트 가이드

## 1. 애플리케이션 실행

### 백엔드 실행
```bash
cd /Users/varm/dev/comma/back
./gradlew bootRun
```

### 프론트엔드 실행
```bash
cd /Users/varm/dev/comma/front/my-app
npm start
```

## 2. API 엔드포인트 테스트

### Products API 엔드포인트들:
- `GET /api/products` - 전체 상품 목록 (페이지네이션)
- `GET /api/products/{id}` - 특정 상품 상세 정보
- `GET /api/products/categories` - 카테고리 목록
- `GET /api/products/categories/{category}/subcategories` - 서브카테고리 목록

### 테스트 예시:
```bash
# 상품 목록 조회
curl http://localhost:8080/api/products

# 특정 상품 조회
curl http://localhost:8080/api/products/1

# 카테고리 목록 조회
curl http://localhost:8080/api/products/categories
```

## 3. 프론트엔드 접근

- 메인 페이지: http://localhost:3001/
- 상품 목록: http://localhost:3001/product/list
- 상품 상세: http://localhost:3001/product/detail/{id}

## 4. 데이터베이스 마이그레이션

기존 `items` 테이블의 데이터를 `products` 테이블로 마이그레이션하려면:

1. MySQL에 접속
2. `/Users/varm/dev/comma/back/src/main/resources/migration.sql` 실행

```sql
-- 마이그레이션 전 데이터 확인
SELECT COUNT(*) FROM items;

-- 마이그레이션 실행 (migration.sql 내용)

-- 마이그레이션 후 데이터 확인
SELECT COUNT(*) FROM products;
SELECT * FROM products LIMIT 5;
```

## 5. 새로운 필드들

Products 엔티티에 추가된 새로운 필드들:
- `color1`: 상품 색상 정보
- `size`: 상품 크기 정보
- `product_code`: 고유한 상품 코드 (기존 product_no)
- `product_id`: 기본 키 (기존 item_no)

이 필드들은 프론트엔드에서 자동으로 표시됩니다.