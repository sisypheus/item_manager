package com.manager.item_manager.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.manager.item_manager.model.Item;
import com.manager.item_manager.repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

  @RequestMapping(method = RequestMethod.GET, path = "/items")
  public List<Item> getItems() {
    return itemRepository.findAll();
  }

  @RequestMapping(method = RequestMethod.GET, path="/items/category/{category}")
  public List<Item>getItemsByCategory(@PathVariable String category) {
    if (category.equals("All"))
      return getItems();
    return itemRepository.findByCategory(category);
  }

  @GetMapping("/item/{id}")
  public Item getItem(@PathVariable String id) {
    return itemRepository.findById(id).isPresent() ? itemRepository.findById(id).get() : null;
  }

  //Post requests

  @RequestMapping(method = RequestMethod.DELETE, path="/item/delete/{id}")
  public void deleteItem(@PathVariable String id) {
    try {
      itemRepository.deleteById(id);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item id doesn't exist.");
    }
  }

  @RequestMapping(method = RequestMethod.POST, path = "/item/create")
  public Item createItem(@RequestBody Map<String, Object> payload) {
    Object maybe_name = payload.get("name");
    Object maybe_count = payload.get("count");
    Object maybe_description = payload.get("description");
    Object maybe_category = payload.get("category");
    Object maybe_price = payload.get("price");
    Object maybe_image = payload.get("image");

    if (maybe_name == null || maybe_count == null || maybe_description == null ||
    maybe_category == null || maybe_price == null || maybe_image == null)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing required fields.");

    String name = (String) maybe_name;
    int count = (int) maybe_count;
    String description = (String) maybe_description;
    String category = (String) maybe_category;
    double price = maybe_price instanceof Integer ? (int) maybe_price : (double) maybe_price;
    String image = (String) maybe_image;

    Item item = new Item(name, count, description, category, price, image);
    itemRepository.save(item);
    return item;
  }

  //modify methods

  @RequestMapping(value="/item/modify", method=RequestMethod.POST)
  public Item requestMethodName(@RequestBody Map<String, Object> payload) {
    Object maybe_id = payload.get("id");
    Object maybe_name = payload.get("name");
    Object maybe_count = payload.get("count");
    Object maybe_description = payload.get("description");
    Object maybe_category = payload.get("category");
    Object maybe_price = payload.get("price");
    Object maybe_image = payload.get("image");
  
    if (maybe_id == null || maybe_count == null || maybe_description == null ||
    maybe_category == null || maybe_price == null || maybe_image == null || maybe_name == null)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide all the parameters needed to modify an item");
    
    String id = (String) maybe_id;
    String name = (String) maybe_name;
    int count = (int) maybe_count;
    String description = (String) maybe_description;
    String category = (String) maybe_category;
    double price = (double) maybe_price;
    String image = (String) maybe_image;

    Item item = itemRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item id doesn't exist."));
    item.setAll(name, count, description, category, price, image);
    itemRepository.save(item);
    return item;
  }
  

  @RequestMapping(method = RequestMethod.POST, path = "/item/modify/count")
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
