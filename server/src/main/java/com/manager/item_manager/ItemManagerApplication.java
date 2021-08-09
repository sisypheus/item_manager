package com.manager.item_manager;

import com.manager.item_manager.repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ItemManagerApplication implements CommandLineRunner {
	private final ItemRepository itemRepository;

	@Autowired
	public ItemManagerApplication(ItemRepository itemRepository) {
		this.itemRepository = itemRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(ItemManagerApplication.class, args);
		System.out.println("Application started");
	}

	@Override
	public void run(String... args) throws Exception {
		// if (itemRepository.findAll().isEmpty()) {
		// 	itemRepository.save(new Item("Banane", 0.79, 6));
		// }
	}

}
