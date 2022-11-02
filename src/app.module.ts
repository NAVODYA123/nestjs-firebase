import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';

@Module({
  imports: [EmployeeModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],

})
export class AppModule { }
