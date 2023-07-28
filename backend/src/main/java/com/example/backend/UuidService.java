package com.example.backend;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UuidService {
    public String generateUUID(){
        return UUID.randomUUID().toString();
    }
}
