package ies.g52.ShopAholytics.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies.g52.ShopAholytics.models.User;
import ies.g52.ShopAholytics.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public User saveUser(User user) {
        return repository.save(user);
    }

    public List<User> saveUser(List<User> user) {
        return repository.saveAll(user);
    }

    public List<User> getUsers() {
        return repository.findAll();
    }

    public User getUserById(int id) {
        return repository.findById((int)id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public String deleteUser(int id) {
        repository.deleteById(id);
        return "product removed !! " + id;
    }

    public User updateUser(User user) {
        User existingUser = repository.findById((int)user.getId()).orElse(null);
        existingUser.setEmail(user.getEmail());
        existingUser.setGender(user.getGender());
        existingUser.setPassword(user.getPassword());
        existingUser.setName(user.getName());
        return repository.save(existingUser);
    }

   
}
