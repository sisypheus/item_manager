package com.manager.item_manager.controllers;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import com.manager.item_manager.model.Item;
import com.manager.item_manager.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
public class ItemController {
  private final ItemRepository itemRepository;

  @Autowired
  public ItemController(ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  @GetMapping("/")
  public String index() {
    return "Server up and running";
  }

  @GetMapping("/items")
  public List<Item> getItems() {
    return itemRepository.findAll();
  }

  @GetMapping("/item/{id}")
  public Item getItem(@PathVariable String id) {
    return itemRepository.findById(id).isPresent() ? itemRepository.findById(id).get() : null;
  }

  @PostMapping("/item/modify/count")
  public void modifyCount(@RequestBody Map<String, Object> payload) {
    try {
      String id = (String) payload.get("id");
      int count = (int) payload.get("count");

      if (count > 0) {
        Item modify = itemRepository.findById(id).get();
        modify.setCount(count);
        itemRepository.save(modify);
      } else
        itemRepository.deleteById(id);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide the object Id and the correct count");
    }
  }

  @PostMapping("/item/modify/description")
  public void modifyDescription(@RequestBody Map<String, Object> payload) {
    try {
      String id = (String) payload.get("id");
      String description = (String) payload.get("description");

      Item modify = itemRepository.findById(id).get();
      modify.setDescription(description);
      itemRepository.save(modify);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide the object Id and the correct count");
    }
  }

  @PostMapping("/item/modify/price")
  public void modifyPrice(@RequestBody Map<String, Object> payload) {
    Object maybe_id = payload.get("id");
    Object maybe_price = payload.get("price");

    if (maybe_id == null || maybe_price == null)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide the object Id and the correct price");

    String id = (String) maybe_id;
    double price = (double) maybe_price;

    if (price > 0) {
      Item modify = itemRepository.findById(id).get();
      if (modify == null)
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
      modify.setPrice(price);
      itemRepository.save(modify);
    } else
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot set a negative/null price");
  }

  @PostMapping("/item/create")
  public void createItem(@RequestBody Map<String, Object> payload) {
    try {
      String name = (String) payload.get("name");
      int count = (int) payload.get("count");
      String description = (String) payload.get("description");
      String category = (String) payload.get("category");
      double price = (double) payload.get("price");
      String image = (String) payload.get("image");
      Item item = new Item(name, count, description, category, price, image);
      itemRepository.save(item);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide all the parameters needed to create a new item");
    }
  }
}
