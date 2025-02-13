import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller()
export class HelloController {
  @Get('/hello')
  index(@Req() request: Request, @Res() response: Response) {
    return response.status(200).json({
      message: 'Hello World!',
      request: request,
      response: response,
    });
  }

  @Get('/notfound')
  @HttpCode(404)
  notFound() {
    return {
      message: 'Not Found',
    };
  }
  @Get('/something')
  @HttpCode(201)
  somethingNew() {
    return {
      message: 'Something New',
    };
  }

  @Get('/error')
  @HttpCode(500)
  errorPage() {
    return {
      message: 'Error route',
    };
  }

  @Get('/ticket/:num')
  getNumber(@Param('num', ParseIntPipe) num: string) {
    const numInt = parseInt(num);

    if (isNaN(numInt)) {
      return {
        message: 'Invalid number',
      };
    }

    return {
      message: `Your sum is ${numInt + 14}`,
    };
  }

  @Get('active/:status')
  @UseGuards(AuthGuard)
  isUserActive(@Param('status', ParseBoolPipe) status: string) {
    console.log(typeof status);
    if (status) {
      return {
        message: 'User is active',
      };
    } else {
      return {
        message: 'User is not active',
      };
    }
  }

  @Get('greet')
  @UseGuards(AuthGuard)
  greet(@Query(ValidateuserPipe) query: { name: string; age: number }) {
    console.log(typeof query.age);
    console.log(typeof query.name);

    return `Hello ${query.name}, you are ${query.age} years old`;
  }
}
