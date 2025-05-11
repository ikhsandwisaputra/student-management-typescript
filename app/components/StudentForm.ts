import { StudentService } from "../services/StudentService";
import { Student } from "../models/Student";

export class StudentForm {
  private form: HTMLFormElement;
  private service: StudentService;
  private currentEditId: number | null = null;
  private onSubmitCallback: () => void;

  constructor(service: StudentService, onSubmitCallback: () => void) {
    this.form = document.getElementById("student-form") as HTMLFormElement;
    this.service = service;
    this.onSubmitCallback = onSubmitCallback;

    this.render();
  }

  render(student?: Student) {
    this.form.innerHTML = `
      <input type="text" id="name" placeholder="Nama" value="${student?.name || ""}" required />
      <input type="number" id="age" placeholder="Umur" value="${student?.age || ""}" required />
      <input type="text" id="major" placeholder="Jurusan" value="${student?.major || ""}" required />              
      <input type="text" id="major" placeholder="Jurusan" value="${student?.kelas || ""}" required />              
      <button type="submit">${student ? "Update" : "Tambah"}</button>
    `;

    this.form.onsubmit = (e) => {
      e.preventDefault();
      const name = (document.getElementById("name") as HTMLInputElement).value;
      const age = parseInt((document.getElementById("age") as HTMLInputElement).value);
      const major = (document.getElementById("major") as HTMLInputElement).value;           
      const kelas = (document.getElementById("kelas") as HTMLInputElement).value;           

      if (this.currentEditId) {
        this.service.update(this.currentEditId, { name, age, major, kelas });
      } else {
        this.service.add({ name, age, major, kelas });
      }

      this.currentEditId = null;
      this.onSubmitCallback();
      this.render();
    };
  }

  edit(student: Student) {
    this.currentEditId = student.id;
    this.render(student);
  }
}
