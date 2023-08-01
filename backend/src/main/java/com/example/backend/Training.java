package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("training")
public class Training {
 @Id
 private String id;
 private String datum;
 private String uhrzeit;
 private List<String> trainingArten;
}
