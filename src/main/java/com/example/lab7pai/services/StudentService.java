package com.example.lab7pai.services;

import com.example.lab7pai.entities.Student;
import com.example.lab7pai.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;


    public List<Student> getStudentList(){
        return studentRepository.findAll();
    }

    public Student addStudent(Student studentToAdd){
        return studentRepository.save(studentToAdd);
    }

    public String deleteStudent(Long id) {
        studentRepository.findById(id)
                .ifPresent(x -> studentRepository.delete(x));
        return "Udalo sie usunac studenta o ID: " +  id;
    }

    public String updateStudent(Student student) {
        if (!studentRepository.existsById(student.getId())) {
            return "Nie ma takiego studenta!";
        };
        studentRepository.save(student);
        return "Aktualizowano studenta o id: " + student.getId();
    }

    public Student getOneById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }
}
