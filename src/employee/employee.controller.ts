import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
import { EmployeeDto } from 'src/dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/')
  async getAllEmployees(): Promise<Employee[]> {
    console.log('get all emp reached');
    return await this.employeeService.getAllEmployees();
  }

  @Get(':id')
  async getEmployee(@Param('id') id: string): Promise<Employee> {
    return await this.employeeService.getEmployeeById(id);
  }

  @Post('/')
  async addNewEmployee(@Body() createEmpRecord: EmployeeDto): Promise<string> {
    console.log('get all emp ids reached');
    return await this.employeeService.addNewEmployee(createEmpRecord);
  }

  @Delete(':id')
  async deleteEmployeeRedcord(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }

  @Put(':id')
  async updateEmployeeRecords(@Body() employeeData: Employee) {
    return await this.employeeService.updateEmployee(employeeData);
  }
}
