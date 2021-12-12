package ies.g52.ShopAholytics.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ies.g52.ShopAholytics.models.Park;
import ies.g52.ShopAholytics.services.ParkService;
import ies.g52.ShopAholytics.services.ShoppingService;
import java.util.List;

@RestController
@RequestMapping("/api/")
public class ParkController {
    @Autowired
    private ParkService parkService;

    

   @Autowired
   private ShoppingService shoppingService;

    @PostMapping("/addPark")
    public Park newPark( @RequestBody Park s,@PathVariable(value = "pid") int pid) {
        return parkService.savePark(new Park(s.getName(),s.getLocation(),s.getCapacity(),s.getOpening(),s.getClosing(),shoppingService.getShoppingById(pid)));
    }

    
    @GetMapping("/Parks")
    public List<Park> findAllParks() {
        List<Park> a = parkService.getParks();
        return a;
    }
    

    @GetMapping("/Park")
    public Park findParkById(@RequestParam(value = "id")  int id) {
        Park a = parkService.getParkById(id);
        return a;
        
    }



    @PutMapping("/updatePark")
    public Park updatePark(@RequestBody Park Park) {
        return parkService.updatePark(Park);
    }

    @DeleteMapping("/deletePark/{id}")
    public String deletePark(@PathVariable int id) {
        return parkService.deletePark(id);
    }
}