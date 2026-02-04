package com.zoe.web.Controller;

import com.zoe.web.Entity.Items;
import com.zoe.web.Service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3001")
public class ItemsRestController {

    @Autowired
    private ItemsService itemsService;

    @GetMapping
    public ResponseEntity<Page<Items>> getAllItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search) {

        Page<Items> items;
        if (search != null && !search.trim().isEmpty()) {
            items = itemsService.searchItems(search, page, size);
        } else {
            items = itemsService.getAllItems(page, size);
        }

        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Items> getItemById(@PathVariable int id) {
        Optional<Items> item = itemsService.getItemById(id);
        if (item.isPresent()) {
            return ResponseEntity.ok(item.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Items> createItem(@RequestBody Items item) {
        Items savedItem = itemsService.saveItem(item);
        return ResponseEntity.ok(savedItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Items> updateItem(@PathVariable int id, @RequestBody Items item) {
        Optional<Items> existingItem = itemsService.getItemById(id);
        if (existingItem.isPresent()) {
            item.setItemNo(id);
            Items savedItem = itemsService.saveItem(item);
            return ResponseEntity.ok(savedItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable int id) {
        Optional<Items> existingItem = itemsService.getItemById(id);
        if (existingItem.isPresent()) {
            itemsService.deleteItem(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}