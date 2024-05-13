package com.dineout.backend.service;

import com.dineout.backend.entity.Restaurant;
import com.dineout.backend.entity.User;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@AllArgsConstructor
public class ImageService {

    private final String userHome = System.getProperty("user.home");
    private final Path root = Paths.get(userHome, "Downloads/DineOut");

    @PostConstruct
    private void init() throws IOException {
        if (!Files.exists(root) && !Files.isDirectory(root)) {
            Files.createDirectories(root);
        }
    }

    public void uploadImage(MultipartFile file) throws IOException {
        if (file.getOriginalFilename() == null) {
            throw new IOException("Original name is null");
        }
        String originalFilename = file.getOriginalFilename();
        Path filePath = root.resolve(originalFilename);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    public void uploadImage(MultipartFile file, String fileName) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Uploaded file is empty");
        }
        Path filePath = root.resolve(fileName);
        file.transferTo(filePath);
    }

    public void uploadImage(MultipartFile file, User user) throws IOException {
        if (user.getImage() != null) {
            deleteFile(user.getImage());
        }
        String fileExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String fileName = "user_profile_" + user.getId() + "." + fileExtension;
        user.setImage(fileName);
        Path filePath = root.resolve(fileName);
        file.transferTo(filePath);
    }

    public byte[] downloadImage(String fileName) throws IOException {
        Path filePath = root.resolve(fileName);
        return Files.readAllBytes(filePath);
    }

    public void deleteFile(String fileName) throws IOException {
        Path imagesPath = Paths.get("images");
        Path filePath = imagesPath.resolve(fileName);
        Files.deleteIfExists(filePath);
    }

}
