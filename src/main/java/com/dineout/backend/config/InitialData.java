package com.dineout.backend.config;


import com.dineout.backend.entity.*;
import com.dineout.backend.repository.CuisineRepository;
import com.dineout.backend.repository.TagRepository;
import com.dineout.backend.repository.TypeRepository;
import com.dineout.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class InitialData implements CommandLineRunner {
    private final TagRepository tagRepository;
    private final CuisineRepository cuisineRepository;
    private final TypeRepository typeRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        initTags();
        initCuisines();
        initTypes();
        initUsers();
    }

    public void initTags() {
        Tag tag1 = Tag.builder().name("Fancy").build();
        Tag tag2 = Tag.builder().name("Buffet").build();
        Tag tag3 = Tag.builder().name("Thai").build();
        Tag tag4 = Tag.builder().name("Fast Food").build();
        Tag tag5 = Tag.builder().name("Seafood").build();
        tagRepository.saveAll(List.of(tag1, tag2, tag3, tag4, tag5));
    }

    public void initCuisines() {
        Cuisine cuisine1 = Cuisine.builder().name("Filipino").build();
        Cuisine cuisine2 = Cuisine.builder().name("Indian").build();
        Cuisine cuisine3 = Cuisine.builder().name("Japanese").build();
        Cuisine cuisine4 = Cuisine.builder().name("Italian").build();
        Cuisine cuisine5 = Cuisine.builder().name("Korean").build();
        cuisineRepository.saveAll(List.of(cuisine1, cuisine2, cuisine3, cuisine4, cuisine5));
    }

    public void initTypes() {
        Type type1 = Type.builder().name("Cafe").build();
        Type type2 = Type.builder().name("Bar").build();
        Type type3 = Type.builder().name("Bakery").build();
        Type type4 = Type.builder().name("Pizzeria").build();
        Type type5 = Type.builder().name("Outdoor").build();
        typeRepository.saveAll(List.of(type1, type2, type3, type4, type5));
    }

    public void initUsers() {
        User admin = User.builder().username("admin").name("Admin").gender(User.Gender.OTHER).email("admin@email.com")
                .password(passwordEncoder.encode("1234"))
                .role(Role.ADMIN)
                .build();
        userRepository.save(admin);
    }
}
