package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainingWithoutId {
    private String datum;
    private String uhrzeit;
    private List<String> trainingArten;
}
