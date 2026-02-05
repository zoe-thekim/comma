package com.zoe.web.Service;

import com.zoe.web.Entity.Products;
import com.zoe.web.Repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    public Page<Products> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productsRepository.findAllOrderByProductIdDesc(pageable);
    }

    public Page<Products> searchProducts(String keyword, String category, String subCategory, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        boolean hasKeyword = keyword != null && !keyword.trim().isEmpty();
        boolean hasCategory = category != null && !category.trim().isEmpty();
        boolean hasSubCategory = subCategory != null && !subCategory.trim().isEmpty();

        if (hasCategory && hasSubCategory && hasKeyword) {
            return productsRepository.findByCategoryAndSubCategoryAndNameContainingOrderByProductIdDesc(category, subCategory, keyword, pageable);
        } else if (hasCategory && hasKeyword) {
            return productsRepository.findByCategoryAndNameContainingOrderByProductIdDesc(category, keyword, pageable);
        } else if (hasCategory && hasSubCategory) {
            return productsRepository.findByCategoryAndSubCategoryOrderByProductIdDesc(category, subCategory, pageable);
        } else if (hasCategory) {
            return productsRepository.findByCategoryOrderByProductIdDesc(category, pageable);
        } else if (hasKeyword) {
            return productsRepository.findByNameContainingOrderByProductIdDesc(keyword, pageable);
        } else {
            return productsRepository.findAllOrderByProductIdDesc(pageable);
        }
    }

    public Optional<Products> getProductById(int productId) {
        return productsRepository.findById(productId);
    }

    public List<String> getAllCategories() {
        return productsRepository.findDistinctCategories();
    }

    public List<String> getSubCategoriesByCategory(String category) {
        return productsRepository.findDistinctSubCategoriesByCategory(category);
    }

    public Products saveProduct(Products product) {
        return productsRepository.save(product);
    }

    public void deleteProduct(int productId) {
        productsRepository.deleteById(productId);
    }

    public List<Products> getAllProductsList() {
        return productsRepository.findAll();
    }
}