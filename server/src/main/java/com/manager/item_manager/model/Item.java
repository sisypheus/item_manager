package com.manager.item_manager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Item {
  @Id
  private String id;
  @Field
  private String name;
  @Field
  private double price;
  @Field
  private int count;
  @Field
  private String category;
  @Field
  private String description;
  @Field
  private String image;

  public Item() {}
  public Item(String name, int count, String description, String category, double price, String image) {
    this.name = name;
    this.count = count;
    this.description = description;
    this.category = category;
    this.price = price;
    this.image = image;
  }

  //Getters and Setters
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public double getPrice() {
    return price;
  }
  public void setPrice(double price) {
    this.price = price;
  }
  public String getDescription() {
    return description;
  }
  public void setDescription(String description) {
    this.description = description;
  }
  public String getImage() {
    return image;
  }
  public void setImage(String image) {
    this.image = image;
  }
  public int getCount() {
    return count;
  }
  public void setCount(int count) {
    this.count = count;
  }

  @Override
  public String toString() {
    return "Item [id=" + id + ", name=" + name + ", price=" + price + ", description=" + description + ", image=" + image + "]";
  }
}
