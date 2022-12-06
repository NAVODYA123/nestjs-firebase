import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
import { EmployeeDto } from '../dto/create-employee.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Employee controller')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOkResponse({ type: [Employee] })
  @ApiInternalServerErrorResponse()
  @Get('/')
  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeService.getAllEmployees();
  }
  @ApiOkResponse({ type: Employee })
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async getEmployee(@Param('id') id: string): Promise<Employee> {
    return await this.employeeService.getEmployeeById(id);
  }
  @ApiOkResponse({ type: String })
  @ApiInternalServerErrorResponse()
  @ApiBody({ type: EmployeeDto })
  @Post('/')
  async addNewEmployee(
    @Body() createEmpRecord: EmployeeDto,
  ): Promise<HttpStatus> {
    await this.employeeService.addNewEmployee(createEmpRecord);
    return HttpStatus.OK;
  }
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async deleteEmployeeRedcord(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @ApiBody({ type: Employee })
  @ApiInternalServerErrorResponse()
  @Put(':id')
  async updateEmployeeRecords(
    @Body() employeeData: Employee,
    @Param('id') id: string,
  ) {
    await this.employeeService.updateEmployee({ ...employeeData, id });
    return HttpStatus.OK;
  }
}
