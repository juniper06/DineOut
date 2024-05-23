package com.dineout.backend.service;

import com.dineout.backend.dto.request.LoginRequest;
import com.dineout.backend.dto.request.RegisterRequest;
import com.dineout.backend.dto.response.LoginResponse;
import com.dineout.backend.entity.Role;
import com.dineout.backend.entity.User;
import com.dineout.backend.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ImageService imageService;

    public LoginResponse registerUser(RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()) != null) {
            throw new EntityExistsException("Username already exist");
        }
        User newUser = User.builder().username(registerRequest.getUsername())
                .name(registerRequest.getFirstName() + " " + registerRequest.getLastName())
                .password(passwordEncoder.encode(
                        registerRequest.getPassword())).email(registerRequest.getEmail()).role(Role.USER).build();
        User user = userRepository.save(newUser);
        return new LoginResponse(user, jwtService.generateToken(user));
    }

    public LoginResponse loginUser(LoginRequest loginRequest) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(loginRequest.getUsername());
        if(user == null){
            throw new UsernameNotFoundException("Username is incorrect");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        return new LoginResponse(user, jwtService.generateToken(user));
    }

    public LoginResponse updateUser(Long userId, User updatedUser, MultipartFile image) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User ID: " + userId + " Not found"));
        if (!updatedUser.getUsername().isBlank()) {
            user.setUsername(updatedUser.getUsername());
        }
        if (!updatedUser.getName().isBlank()) {
            user.setName(updatedUser.getName());
        }
        if (!updatedUser.getEmail().isBlank()) {
            user.setEmail(updatedUser.getEmail());
        }
        if (!updatedUser.getPassword().isBlank()) {
            String encodedPassword = passwordEncoder.encode(updatedUser.getPassword());
            user.setPassword(encodedPassword);
        }
        if (image != null) {
            imageService.uploadImage(image, user);
        }
        return new LoginResponse(userRepository.save(user), jwtService.generateToken(user));
    }

}
