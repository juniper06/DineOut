package com.dineout.backend.service;


import com.dineout.backend.entity.Tag;
import com.dineout.backend.repository.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public List<Tag> getTagsByRestaurantId(Long restaurantId) {
        return tagRepository.findByRestaurantsId(restaurantId);
    }

    public Tag addTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public List<Tag> getTags() {
        return tagRepository.findAll();
    }

    public void deleteTagById(Long id) {
        tagRepository.deleteById(id);
    }

    public Tag getTagById(Long tagId) {
        return tagRepository.findById(tagId)
                .orElseThrow(() -> new EntityNotFoundException("Tag id: " + tagId + " not found"));
    }

    public List<Tag> getTagsByIds(List<Long> tagIds) {
        return tagIds.stream().map(this::getTagById).toList();
    }
}
