package com.manager.item_manager.controllers;

import java.util.List;
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
import org.springframework.web.bind.annotation.DeleteMapping;
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

  //get methods

  @GetMapping("/")
  public String index() {
    return "Server is up and running";
  }

  @GetMapping("/items")
  public List<Item> getItems() {
    return itemRepository.findAll();
  }

  @GetMapping("/item/{id}")
  public Item getItem(@PathVariable String id) {
    return itemRepository.findById(id).isPresent() ? itemRepository.findById(id).get() : null;
  }

  //Post requests

  @DeleteMapping("/item/delete/{id}")
  public void deleteItem(@PathVariable String id) {
    try {
      itemRepository.deleteById(id);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item id doesn't exist.");
    }
  }

  @PostMapping("/item/create")
  public Item createItem(@RequestBody Map<String, Object> payload) {
    String name = (String) payload.get("name");
    int count = payload.get("count") == null ? -1 : (int) payload.get("count");
    String description = (String) payload.get("description");
    String category = (String) payload.get("category");
    double price = payload.get("price") == null ? -1 : (double) payload.get("price");
    String image = (String) payload.get("image");
    //if one of the fields is null, throw an exception
    if (name == null || count < 0 || description == null || category == null || price < 0 || image == null)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide all the parameters needed to create a new item");
    Item item = new Item(name, count, description, category, price, image);
    itemRepository.save(item);
    return item;
  }

  //modify methods

  @PostMapping("/item/modify/count")
  public Item modifyCount(@RequestBody Map<String, Object> payload) {
    Object maybe_id = payload.get("id");
    Object maybe_count = payload.get("count");

    if (maybe_id == null || maybe_count == null)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request");

    String id = (String) maybe_id;
    Integer count = (Integer) maybe_count;

    Item modify = itemRepository.findById(id).get();
    if (modify == null)
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
    if (count > 0) {
      modify.setCount(count);
      itemRepository.save(modify);
    } else {
      itemRepository.deleteById(id);
      return null;
    }
    return modify;
  }

  @PostMapping("/item/modify/description")
  public void modifyDescription(@RequestBody Map<String, Object> payload) {
    Object maybe_id = payload.get("id");
    Object maybe_description = payload.get("description");

    if (maybe_id == null || maybe_description == null)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request");

    String id = (String) maybe_id;
    String description = (String) maybe_description;

    Item modify = itemRepository.findById(id).get();
    if (modify == null)
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
    modify.setDescription(description);
    itemRepository.save(modify);
  }

  @PostMapping("/item/modify/price")
  public void modifyPrice(@RequestBody Map<String, Object> payload) {
    Object maybe_id = payload.get("id");
    Object maybe_price = payload.get("price");

    if (maybe_id == null || maybe_price == null)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide the object Id and the correct price");

    String id = (String) maybe_id;
    double price = (double) maybe_price;

    Item modify = itemRepository.findById(id).get();
    if (modify == null)
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
    if (price > 0) {
      modify.setPrice(price);
      itemRepository.save(modify);
    } else
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot set a negative/null price");
  }
}
