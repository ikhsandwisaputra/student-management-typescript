import { StudentService } from "./services/StudentService.js";
import { StudentForm } from "./components/StudentForm.js";
import { StudentTable } from "./components/StudentTable.js";
const service = new StudentService();
const table = new StudentTable(service, (student) => {
    form.edit(student);
});
const form = new StudentForm(service, () => {
    table.render();
});
