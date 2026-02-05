package com.zoe.web.Controller;

import com.zoe.web.Entity.Products;
import com.zoe.web.Service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3001")
public class ProductsRestController {

    @Autowired
    private ProductsService productsService;

    @GetMapping
    public ResponseEntity<Page<Products>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subCategory) {

        Page<Products> products = productsService.searchProducts(search, category, subCategory, page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = productsService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/categories/{category}/subcategories")
    public ResponseEntity<List<String>> getSubCategoriesByCategory(@PathVariable String category) {
        List<String> subCategories = productsService.getSubCategoriesByCategory(category);
        return ResponseEntity.ok(subCategories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable int id) {
        Optional<Products> product = productsService.getProductById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Products> createProduct(@RequestBody Products product) {
        Products savedProduct = productsService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Products> updateProduct(@PathVariable int id, @RequestBody Products product) {
        Optional<Products> existingProduct = productsService.getProductById(id);
        if (existingProduct.isPresent()) {
            product.setProductId(id);
            Products savedProduct = productsService.saveProduct(product);
            return ResponseEntity.ok(savedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        Optional<Products> existingProduct = productsService.getProductById(id);
        if (existingProduct.isPresent()) {
            productsService.deleteProduct(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/bulk-update-categories")
    public ResponseEntity<String> bulkUpdateCategories() {
        List<Products> allProducts = productsService.getAllProductsList();
        int updatedCount = 0;

        for (Products product : allProducts) {
            if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
                product.setCategory("chair");
                product.setSubCategory("Arm Chair");
                productsService.saveProduct(product);
                updatedCount++;
            }
        }

        return ResponseEntity.ok("Updated " + updatedCount + " products with category information");
    }
}