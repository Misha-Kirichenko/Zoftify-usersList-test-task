import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FilterDTO } from './dto/filter.dto';
import { HTTP_MSG_UTIL } from 'src/common/utils';
import { IPagingData, IResMessage } from 'src/common/interfaces';
import { QueryFailedError } from 'typeorm';
import { CreateUserDTO } from './dto';
import { HTTP_ERROR_MSG } from 'src/common/constants';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    public async findAll(filterDTO: FilterDTO): Promise<IPagingData<User>> {
        const { role, page = 1, limit = 10 } = filterDTO;

        const total = await this.usersRepository.count({
            ...(role ? { where: { role } } : {})
        });

        const users = await this.usersRepository.find({
            ...(role ? { where: { role: role } } : {}),
            select: ["id", "firstName", "lastName", "email", "role", "lastLogin"],
            skip: (page - 1) * limit,
            take: limit,
            order: { lastLogin: "DESC" },
        });

        return { total, data: users };
    }

    public async findOne(id: number): Promise<User> {
        const foundUser = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'firstName', 'lastName', 'email', 'role', 'lastLogin'],
        });

        if (!foundUser) {
            throw new NotFoundException(HTTP_MSG_UTIL.ERRORS.notFound("User"));
        }
        return foundUser;
    }


    public async updateOne(id: number, updateUserDTO: any): Promise<IResMessage> {
        try {
            const foundUser = await this.usersRepository.findOneBy({ id });

            if (!foundUser) {
                throw new NotFoundException(HTTP_MSG_UTIL.ERRORS.notFound("User"));
            }


            if (updateUserDTO.password) {
                const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT_ROUNDS));
                updateUserDTO.password = await bcrypt.hash(updateUserDTO.password, salt);
            }

            Object.assign(foundUser, updateUserDTO);
            await this.usersRepository.save(foundUser);
            return { message: HTTP_MSG_UTIL.SUCCESS.updated("User") };

        } catch (error) {
            if (error instanceof QueryFailedError && 'code' in error && error.code === '23505') {
                throw new ConflictException(HTTP_ERROR_MSG.EMAIL_EXISTS);
            }
            throw error;
        }

    }

    public async createOne(createUserDTO: CreateUserDTO): Promise<IResMessage> {
        try {
            if (createUserDTO.password) {
                const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT_ROUNDS));
                createUserDTO.password = await bcrypt.hash(createUserDTO.password, salt);
            }

            const newUser = new User();
            Object.assign(newUser, createUserDTO);
            await this.usersRepository.save(newUser);

            return { message: HTTP_MSG_UTIL.SUCCESS.created('User') };
        } catch (error) {
            if (error instanceof QueryFailedError && 'code' in error && error.code === '23505') {
                throw new ConflictException(HTTP_ERROR_MSG.EMAIL_EXISTS);
            }
            throw error;
        }
    }

    public async deleteOne(id: number): Promise<IResMessage> {
        const foundUser = await this.usersRepository.findOneBy({ id });

        if (!foundUser) {
            throw new NotFoundException(HTTP_MSG_UTIL.ERRORS.notFound("User"));
        }

        await this.usersRepository.remove(foundUser);
        return { message: HTTP_MSG_UTIL.SUCCESS.deleted("User") };
    }

}