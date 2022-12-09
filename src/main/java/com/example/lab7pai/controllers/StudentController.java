package com.example.lab7pai.controllers;

import com.example.lab7pai.entities.Student;
import com.example.lab7pai.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/students")
    public List<Student> getAll() {
        return studentService.getStudentList();
    }

    @GetMapping("/student/{id}")
    public Student getAll(@PathVariable Long id) {
        return studentService.getOneById(id);
    }

    @PostMapping("/addStudent")
    public Student addStudent(@RequestBody final Student student){
        return studentService.addStudent(student);
    }

    @DeleteMapping("deleteStudent/{id}")
    public String deleteStudent(@PathVariable Long id){
        return studentService.deleteStudent(id);
    }

    @PutMapping("updateStudent")
    public String updateStudent(@RequestBody Student student){
        return studentService.updateStudent(student);
    }
}
