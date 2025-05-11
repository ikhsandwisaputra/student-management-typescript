import { StudentService } from "./services/StudentService";
import { StudentForm } from "./components/StudentForm";
import { StudentTable } from "./components/StudentTable";

const service = new StudentService();

const table = new StudentTable(service, (student) => {
  form.edit(student);
});

const form = new StudentForm(service, () => {
  table.render();
});
