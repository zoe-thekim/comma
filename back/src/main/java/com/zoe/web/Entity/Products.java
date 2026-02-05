package com.zoe.web.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "products")
@NoArgsConstructor
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int productId;

    // IKEA product number (예: 99389153)
    @Column(name = "product_code", length = 32, unique = true)
    private String productCode;

    @Column(name = "ref_id", length = 32)
    private String refId;

    // 예: "OFTAST 오프타스트"
    @Column(length = 200)
    private String name;

    // 예: "그릇" (description 텍스트의 첫 번째 값)
    @Column(length = 200)
    private String description;

    // 예: "화이트" (description 텍스트의 두 번째 값)
    @Column(length = 50)
    private String color1;

    // 예: "15 cm" (description 텍스트의 세 번째 값)
    @Column(length = 50)
    private String size;

    private Integer price;

    @Column(length = 10)
    private String currency;

    @Column(length = 600)
    private String url;

    @Column(name = "img_url", length = 600)
    private String imgUrl;

    // 대분류 / 소분류 (예빈님 설계)
    @Column(length = 50)
    private String category;

    @Column(name = "sub_category", length = 100)
    private String subCategory;

    @CreationTimestamp
    @Column(name = "scraped_at", updatable = false)
    private LocalDateTime scrapedAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
