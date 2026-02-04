package com.zoe.web.Service;

import com.zoe.web.Entity.Items;
import com.zoe.web.Repository.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemsService {

    @Autowired
    private ItemsRepository itemsRepository;

    public Page<Items> getAllItems(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return itemsRepository.findAllOrderByItemNoDesc(pageable);
    }

    public Page<Items> searchItems(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        if (keyword == null || keyword.trim().isEmpty()) {
            return itemsRepository.findAllOrderByItemNoDesc(pageable);
        }
        return itemsRepository.findByNameContainingOrderByItemNoDesc(keyword, pageable);
    }

    public Optional<Items> getItemById(int itemNo) {
        return itemsRepository.findById(itemNo);
    }

    public Items saveItem(Items item) {
        return itemsRepository.save(item);
    }

    public void deleteItem(int itemNo) {
        itemsRepository.deleteById(itemNo);
    }
}