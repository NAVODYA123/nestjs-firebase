import { Injectable, Scope } from '@nestjs/common';
import {
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { employeeCollection } from 'src/configs/firebase';
import { Employee } from 'src/models/employee.model';
import { EmployeeDto } from 'src/dto/create-employee.dto';

@Injectable({ scope: Scope.DEFAULT })
export class EmployeeService {
  // get all employee records
  public async getAllEmployees(): Promise<Employee[]> {
    const querySnapshot = await getDocs(employeeCollection);
    return querySnapshot.docs.map((doc) => doc.data());
  }

  //get employee record by id
  public async getEmployeeById(id: string): Promise<Employee> {
    const docRef = doc(employeeCollection, id);
    const queryData = await getDoc(docRef);
    return queryData.data();
  }

  //generate new employee id
  public async getNextEmployeeId(): Promise<number> {
    const querySnapshot = await getDocs(employeeCollection);
    const Ids = querySnapshot.docs.map((doc) => doc.data().id);
    const empId = Ids.map((eId) => Number(eId));
    const maxId = Math.max(...empId) + 1;
    return maxId;
  }

  //add new employee record
  public async addNewEmployee(employeeData: EmployeeDto): Promise<string> {
    // const sId = id.toString();
    const newEmpId = String(await this.getNextEmployeeId());
    const docRef = doc(employeeCollection, newEmpId);
    await setDoc(docRef, {
      id: newEmpId,
      ...employeeData,
    });
    return 'ok';
  }

  //delete employee record
  public async deleteEmployee(id: string): Promise<string> {
    const docRef = doc(employeeCollection, id);
    await deleteDoc(docRef);
    return 'document deleted successfully';
  }

  //update employee record
  public async updateEmployee(employeeData: Employee): Promise<string> {
    const docRef = doc(employeeCollection, employeeData.id);
    await updateDoc(docRef, employeeData);
    return 'ok';
  }
}
