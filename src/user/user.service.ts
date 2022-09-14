import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  createConnection,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Document, Packer, Paragraph, TextRun, ImageRun } from 'docx';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      this.client.emit('hello', createUserDto);
      await this.userRepository.save(createUserDto);
      return createUserDto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createDocx() {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('Valorant Player:'),
                new TextRun({
                  text: '\n BlackNarak ',
                  bold: true,
                }),
                new TextRun({
                  text: '\tAlexandre is the best',
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: fs.readFileSync('./brim.png'),
                  transformation: {
                    width: 100,
                    height: 100,
                  },
                }),
              ],
            }),
          ],
        },
      ],
    });
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync('My Document.docx', buffer);
    });
  }

  async findAll() {
    const query = [];

    const userRes = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.name = :name', { name: 'Yane2' })
      .getMany();

    for (const i in userRes) {
      query.push({
        email: userRes[i].email,
      });
    }
    console.log(query);

    const secondQuery = await this.userRepository.find({ where: query });
    console.log(secondQuery);

    // const secondUser = await getRepository(User)
    //   .createQueryBuilder('user')
    //   .where(':email IN ()')
    //   .getRawMany();
    // console.log(userRes);

    // const user = await this.userRepository.find({
    //   join: { alias: 'products', innerJoin: { product: 'products.product' } },
    //   // where: (qb) => {
    //   //   qb.where({ a: 1, b: 2 }).andWhere('products.name = :productName', {
    //   //     productName: 'Yane',
    //   //   });
    //   // },
    // });

    return userRes;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
