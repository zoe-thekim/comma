package com.zoe.web.Repository;

import com.zoe.web.Entity.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {

    @Query("SELECT p FROM Products p ORDER BY p.productId DESC")
    Page<Products> findAllOrderByProductIdDesc(Pageable pageable);

    @Query("SELECT p FROM Products p WHERE p.name LIKE %?1% ORDER BY p.productId DESC")
    Page<Products> findByNameContainingOrderByProductIdDesc(String name, Pageable pageable);

    @Query("SELECT p FROM Products p WHERE p.category = :category ORDER BY p.productId DESC")
    Page<Products> findByCategoryOrderByProductIdDesc(@Param("category") String category, Pageable pageable);

    @Query("SELECT p FROM Products p WHERE p.category = :category AND p.subCategory = :subCategory ORDER BY p.productId DESC")
    Page<Products> findByCategoryAndSubCategoryOrderByProductIdDesc(@Param("category") String category, @Param("subCategory") String subCategory, Pageable pageable);

    @Query("SELECT p FROM Products p WHERE p.category = :category AND p.name LIKE %:name% ORDER BY p.productId DESC")
    Page<Products> findByCategoryAndNameContainingOrderByProductIdDesc(@Param("category") String category, @Param("name") String name, Pageable pageable);

    @Query("SELECT p FROM Products p WHERE p.category = :category AND p.subCategory = :subCategory AND p.name LIKE %:name% ORDER BY p.productId DESC")
    Page<Products> findByCategoryAndSubCategoryAndNameContainingOrderByProductIdDesc(@Param("category") String category, @Param("subCategory") String subCategory, @Param("name") String name, Pageable pageable);

    @Query("SELECT DISTINCT p.category FROM Products p WHERE p.category IS NOT NULL ORDER BY p.category")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT p.subCategory FROM Products p WHERE p.category = :category AND p.subCategory IS NOT NULL ORDER BY p.subCategory")
    List<String> findDistinctSubCategoriesByCategory(@Param("category") String category);
}