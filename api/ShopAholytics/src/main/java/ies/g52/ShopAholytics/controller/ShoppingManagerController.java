package ies.g52.ShopAholytics.controller;


import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ies.g52.ShopAholytics.models.ShoppingManager;
import ies.g52.ShopAholytics.models.User;
import ies.g52.ShopAholytics.services.ShoppingManagerService;
import ies.g52.ShopAholytics.services.ShoppingServices;
import ies.g52.ShopAholytics.services.StoreService;
import ies.g52.ShopAholytics.services.UserService;

@RestController
@RequestMapping("/api/")
public class ShoppingManagerController {
    @Autowired
    private ShoppingManagerService ShoppingManagerServices;

    @Autowired
    private ShoppingServices shoppingServices;

    @Autowired
    private UserService serviceUser;

    @PostMapping("/addShoppingManager/{pid}/{shopping}")
    public ShoppingManager newShoppingManager(@PathVariable(value = "pid") int pid, @PathVariable(value = "shopping") int shopping) {
        return ShoppingManagerServices.saveShoppingManager(new ShoppingManager(serviceUser.getUserById(pid),shoppingServices.getShoppingById(shopping)));
    }

    @GetMapping("/ShoppingManagers")
    public List<ShoppingManager> findAllStoreManager() {
        List<ShoppingManager> a = ShoppingManagerServices.getShoppingManagers();
        return a;
    }

    @GetMapping("/ShoppingManager")
    public ShoppingManager findStoreManagerById(@RequestParam(value = "id")  int id) {
        List<ShoppingManager> a = ShoppingManagerServices.getShoppingManagers();
        
        for (ShoppingManager qu: a){
            if (qu.getId() == id ){
                return qu;
            }
        }
        return null;
        
    }

    @PutMapping("/updateShoppingManager")
    public ShoppingManager updateStoreManager(@RequestBody ShoppingManager user) {
        return ShoppingManagerServices.updateShoppingManager(user);
    }

    @DeleteMapping("/deleteShoppingManager/{id}")
    public String deleteStoreManager(@PathVariable int id) {
        return ShoppingManagerServices.deleteShoppingManager(id);
    }
}