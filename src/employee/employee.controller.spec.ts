import { BadRequestException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDto } from 'src/dto/create-employee.dto';
import { Employee } from 'src/models/employee.model';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  const empList = [
    { email: 'lihini@gmail.com', id: '1' },
    { email: 'lihini1@gmail.com', id: '2' },
    { email: 'lihini2@gmail.com', id: '3' },
  ] as Employee[];

  const mockService = {
    getAllEmployees: jest.fn(() => {
      return [];
    }),
    addNewEmployee: jest.fn((empData: EmployeeDto) => {
      if (empList.filter((emp) => emp.email === empData.email).length !== 0) {
        throw new BadRequestException();
      }
      return HttpStatus.OK;
    }),
    updateEmployee: jest.fn((empData: EmployeeDto) => {
      if (empList.filter((emp) => emp.id === empData.id).length < 1) {
        throw new BadRequestException();
      }
      return HttpStatus.OK;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    })
      .overrideProvider(EmployeeService)
      .useValue(mockService)
      .compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Get All employee function tested', () => {
    it('should return an Array', async () => {
      const response = await controller.getAllEmployees();
      expect(response).toBeInstanceOf(Array);
    });

    it('All employees mock function should be called', () => {
      expect(mockService.getAllEmployees).toBeCalled();
    });
  });

  describe('Add employee record', () => {
    const empObj: EmployeeDto = {
      id: '1',
      firstname: '',
      lastname: '',
      email: '',
      number: '',
      gender: '',
      photo: '',
    };
    it('Should return 200 status', async () => {
      const response = await controller.addNewEmployee(empObj);
      expect(response).toEqual(HttpStatus.OK);
    });

    it('should throw Bad request exception', async () => {
      try {
        await controller.addNewEmployee({
          ...empObj,
          email: 'lihini@gmail.com',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Check employee Update ', () => {
    it('should return 200 status', async () => {
      const empObj: EmployeeDto = {
        id: '1',
        firstname: '',
        lastname: '',
        email: '',
        number: '',
        gender: '',
        photo: '',
      };
      const response = await controller.updateEmployeeRecords(empObj, '1');
      expect(response).toBe(HttpStatus.OK);
    });
  });
});
