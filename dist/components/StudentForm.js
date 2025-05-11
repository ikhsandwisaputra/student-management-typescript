export class StudentForm {
    constructor(service, onSubmitCallback) {
        this.currentEditId = null;
        this.form = document.getElementById("student-form");
        this.service = service;
        this.onSubmitCallback = onSubmitCallback;
        this.render();
    }
    render(student) {
        this.form.innerHTML = `
      <input type="text" id="name" placeholder="Nama" value="${(student === null || student === void 0 ? void 0 : student.name) || ""}" required />
      <input type="number" id="age" placeholder="Umur" value="${(student === null || student === void 0 ? void 0 : student.age) || ""}" required />
      <input type="text" id="major" placeholder="Jurusan" value="${(student === null || student === void 0 ? void 0 : student.major) || ""}" required />              
      <input type="text" id="kelas" placeholder="kelas" value="${(student === null || student === void 0 ? void 0 : student.kelas) || ""}" required />              
      <button type="submit">${student ? "Update" : "Tambah"}</button>
    `;
        this.form.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const age = parseInt(document.getElementById("age").value);
            const major = document.getElementById("major").value;
            const kelas = document.getElementById("kelas").value;
            if (this.currentEditId) {
                this.service.update(this.currentEditId, { name, age, major, kelas });
            }
            else {
                this.service.add({ name, age, major, kelas });
            }
            this.currentEditId = null;
            this.onSubmitCallback();
            this.render();
        };
    }
    edit(student) {
        this.currentEditId = student.id;
        this.render(student);
    }
}
