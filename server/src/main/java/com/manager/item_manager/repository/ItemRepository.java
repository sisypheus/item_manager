package com.manager.item_manager.repository;

import com.manager.item_manager.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
  
}
