import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async register(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const name = createUserDto.name?.trim();
      const user = await this.prisma.users.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          ...(name ? { name } : {}),
        },
        select: { id: true, email: true, name: true },
      });
      return user;
    } catch (error) {
      throw new Error('Failed to register user');
    }
  }
  async login(email: string, password: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { email },
        select: { id: true, email: true, name: true, password: true },
      });
  
      if (!user) return null;
  
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) return null;
  
      const { password: _password, ...safeUser } = user;
  
      const payload = { id: user.id, email: user.email };
      const token = this.jwtService.sign(payload, { expiresIn: '1h' });
  
      return {
        user: safeUser,
        access_token: token,
      };
  
    } catch {
      throw new Error('Failed to login User');
    }
  }
  async findAll() {
    try{
      const Users = await  this.prisma.users.findMany();
      return Users;

    }catch(error)
    {
        throw new Error('Failed to get Users');
    }
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: { id: true, email: true, name: true },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: { email?: string; name?: string; password?: string } = {};
    if (updateUserDto.email !== undefined) data.email = updateUserDto.email;
    if (updateUserDto.name !== undefined) data.name = updateUserDto.name;
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.prisma.users.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true },
    });
  }

  async remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }
}
