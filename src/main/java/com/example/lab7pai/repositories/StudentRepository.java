package com.example.lab7pai.repositories;

import com.example.lab7pai.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
