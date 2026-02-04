package com.zoe.web.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "items")
@NoArgsConstructor
public class Items {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_no")
    private int itemNo;

    @Column(name = "product_no", length = 32)
    private String productNo;

    private String refId;
    private String name;
    private String description;
    private Integer price;
    private String currency;

    @Column(length = 600)
    private String url;

    @Column(length = 600)
    private String imgUrl;

    @CreationTimestamp
    private LocalDateTime scrapedAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
