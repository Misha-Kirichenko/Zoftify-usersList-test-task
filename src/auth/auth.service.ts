import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ITokenPayload, ITokensPair } from './interfaces';
import { HTTP_ERROR_MSG } from 'src/common/constants/messages.constants';
import { JwtService } from '@nestjs/jwt';
import { IAuthorizedRequest } from 'src/common/interfaces';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    private async generateTokenPairs(user: User | ITokenPayload): Promise<ITokensPair> {
        const { id, email, role } = user;

        const accessToken = await this.jwtService.signAsync(
            { id, email, role },
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
                secret: process.env.ACCESS_TOKEN_SECRET,
            },
        );

        const refreshToken = await this.jwtService.signAsync(
            { id, email, role },
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
                secret: process.env.REFRESH_TOKEN_SECRET,
            },
        );

        return { accessToken, refreshToken };
    }

    public async login(email: string, password: string): Promise<ITokensPair> {
        const foundUser = await this.usersRepository.findOneBy({ email });

        if (!foundUser) {
            throw new UnauthorizedException(HTTP_ERROR_MSG.CREDENTIALS);
        }

        const passwordsMatch = await bcrypt.compare(password, foundUser.password);

        if (passwordsMatch) {
            const tokensPair = await this.generateTokenPairs(foundUser);
            foundUser.lastLogin = Date.now();
            await this.usersRepository.save(foundUser);
            return tokensPair;
        }

        throw new UnauthorizedException(HTTP_ERROR_MSG.CREDENTIALS);
    }

    public async generateRefreshToken(
        req: IAuthorizedRequest,
    ): Promise<ITokensPair> {
        const tokensPair = await this.generateTokenPairs(req.user);
        return tokensPair;
    }
}
