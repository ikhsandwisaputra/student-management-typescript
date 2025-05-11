import { Student } from "../models/Student.js";
export class StudentService {
    constructor() {
        this.students = [];
        this.idCounter = 1;
    }
    getAll() {
        return this.students;
    }
    add(student) {
        this.students.push(new Student(this.idCounter++, student.name, student.age, student.major, student.kelas));
    }
    update(id, updatedStudent) {
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
            this.students[index] = new Student(id, updatedStudent.name, updatedStudent.age, updatedStudent.major, updatedStudent.kelas);
        }
    }
    delete(id) {
        this.students = this.students.filter(s => s.id !== id);
    }
    getById(id) {
        return this.students.find(s => s.id === id);
    }
}
