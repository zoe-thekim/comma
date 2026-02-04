package com.zoe.web.Repository;

import com.zoe.web.Entity.Items;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemsRepository extends JpaRepository<Items, Integer> {

    @Query("SELECT i FROM Items i ORDER BY i.itemNo DESC")
    Page<Items> findAllOrderByItemNoDesc(Pageable pageable);

    @Query("SELECT i FROM Items i WHERE i.name LIKE %?1% ORDER BY i.itemNo DESC")
    Page<Items> findByNameContainingOrderByItemNoDesc(String name, Pageable pageable);
}