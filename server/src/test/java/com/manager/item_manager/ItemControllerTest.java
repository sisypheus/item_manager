package com.manager.item_manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.*;
import com.manager.item_manager.repository.*;
import com.manager.item_manager.controllers.*;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.request.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ItemController.class)
public class ItemControllerTest {
    @Autowired
    MockMvc mockMvc;
    
    @MockBean
    ItemRepository ItemRepository;

    @Test
    public void endpoint() throws Exception {
      mockMvc.perform(MockMvcRequestBuilders
            .get("/")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }
}

