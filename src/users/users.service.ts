import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashPassword: string = await bcrypt.hash(user.password, 10);

    const result = new this.userModel({
      ...user,
      password: hashPassword,
    });

    return result.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }
}
