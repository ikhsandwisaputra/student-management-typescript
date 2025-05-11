import { Student } from "../models/Student";

export class StudentService {
  private students: Student[] = [];
  private idCounter = 1;

  getAll(): Student[] {
    return this.students;
  }

  add(student: Omit<Student, 'id'>): void {
    this.students.push(new Student(this.idCounter++, student.name, student.age, student.major, student.kelas));
  }

  update(id: number, updatedStudent: Omit<Student, 'id'>): void {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students[index] = new Student(id, updatedStudent.name, updatedStudent.age, updatedStudent.major, updatedStudent.kelas);
    }
  }

  delete(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
  }

  getById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }
}
