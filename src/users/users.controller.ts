import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, FilterDTO, UpdateUserDTO } from './dto';
import { AuthGuard, RolesGuard } from 'src/common/guards';
import { User } from './entities/user.entity';
import { IPagingData, IResMessage } from 'src/common/interfaces';
import { CreateUsersDocs } from './docs/controller.decorator';
import { FIND_ALL, FIND_ONE, UPDATE_ONE, CREATE_ONE, DELETE_ONE } from './docs/endpoint-decorators';
import { AllowRoles } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @CreateUsersDocs(FIND_ALL)
    @UseGuards(AuthGuard)
    @Get()
    findAll(@Query() filterDTO: FilterDTO): Promise<IPagingData<User>> {
        return this.userService.findAll(filterDTO);
    }

    @CreateUsersDocs(FIND_ONE)
    @UseGuards(AuthGuard)
    @Get("/:id")
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.findOne(id);
    }


    @CreateUsersDocs(CREATE_ONE)
    @UseGuards(AuthGuard, RolesGuard)
    @AllowRoles(Role.ADMIN)
    @Post()
    createOne(@Body() createUserDTO: CreateUserDTO): Promise<IResMessage> {
        return this.userService.createOne(createUserDTO);
    }

    @CreateUsersDocs(UPDATE_ONE)
    @UseGuards(AuthGuard, RolesGuard)
    @AllowRoles(Role.ADMIN)
    @Patch("/:id")
    updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateUserDTO: UpdateUserDTO): Promise<IResMessage> {
        return this.userService.updateOne(id, updateUserDTO);
    }

    @CreateUsersDocs(DELETE_ONE)
    @UseGuards(AuthGuard, RolesGuard)
    @AllowRoles(Role.ADMIN)
    @Delete("/:id")
    deleteOne(@Param('id', ParseIntPipe) id: number): Promise<IResMessage> {
        return this.userService.deleteOne(id);
    }
}
