import { StudentService } from "../services/StudentService";
import { Student } from "../models/Student";

export class StudentTable {
  private container: HTMLElement;
  private service: StudentService;
  private onEditCallback: (student: Student) => void;

  constructor(service: StudentService, onEditCallback: (student: Student) => void) {
    this.container = document.getElementById("student-table")!;
    this.service = service;
    this.onEditCallback = onEditCallback;
    this.render();
  }

  render() {
    const students = this.service.getAll();
    this.container.innerHTML = `
      <table border="1" width="100%" cellpadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Nama</th><th>Umur</th><th>Jurusan</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${students
            .map(
              (s) => `
            <tr>
              <td>${s.id}</td>
              <td>${s.name}</td>
              <td>${s.age}</td>
              <td>${s.major}</td>
              <td>${s.kelas}</td>
              <td>
                <button data-id="${s.id}" class="edit">Edit</button>
                <button data-id="${s.id}" class="delete">Hapus</button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    this.container.querySelectorAll(".edit").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt((btn as HTMLButtonElement).dataset.id!);
        const student = this.service.getById(id);
        if (student) this.onEditCallback(student);
      });
    });

    this.container.querySelectorAll(".delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt((btn as HTMLButtonElement).dataset.id!);
        this.service.delete(id);
        this.render();
      });
    });
  }
}
