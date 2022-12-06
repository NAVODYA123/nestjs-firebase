import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import {
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
// import Heloworld from '../configs/dbtest';
import { employeeCollection } from '../configs/firebase';
import { Employee } from '../models/employee.model';
import { EmployeeDto } from '../dto/create-employee.dto';

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
    const data = queryData.data();
    if (!data) {
      throw new HttpException('record not found', HttpStatus.BAD_REQUEST);
    }
    return queryData.data();
  }

  //generate new employee id
  public async getNextEmployeeId(): Promise<number> {
    const querySnapshot = await getDocs(employeeCollection);
    const Ids = querySnapshot.docs.map((doc) => doc.data().id);
    const empId = Ids.map((eId) => Number(eId));
    return Number(Math.max(...empId)) + 1;
  }

  //add new employee record
  public async addNewEmployee(employeeData: EmployeeDto): Promise<void> {
    if ((await this.employeeRecordExists(employeeData)) !== 0) {
      throw new BadRequestException('Employee already exists');
    }
    const newEmpId = String(await this.getNextEmployeeId());

    const docRef = doc(employeeCollection, newEmpId);
    await setDoc(docRef, {
      ...employeeData,
      id: newEmpId,
    });
  }

  //delete employee record
  public async deleteEmployee(id: string): Promise<void> {
    await this.getEmployeeById(id);
    const docRef = doc(employeeCollection, id);
    await deleteDoc(docRef);
  }

  //update employee record
  public async updateEmployee(employeeData: Employee): Promise<void> {
    const recordCount = await this.employeeRecordExists(employeeData);
    if (recordCount <= 1) {
      if (recordCount == 1) {
        const emp = await this.getEmployeeById(employeeData.id);
        if (emp.email !== employeeData.email) {
          throw new BadRequestException(
            'Email you are trying to update is alreday in use',
          );
        }
      }
    } else {
      throw new BadRequestException('Record does not exist');
    }

    const docRef = doc(employeeCollection, employeeData.id);
    await updateDoc(docRef, employeeData);
  }

  public async employeeRecordExists(
    employeeData: EmployeeDto,
  ): Promise<number> {
    const docRef = query(
      employeeCollection,
      where('email', '==', employeeData.email),
    );
    const querySnapshot = await getDocs(docRef);
    const queryResult = querySnapshot.docs.map((doc) => doc.data());
    return queryResult.length;
  }
}
