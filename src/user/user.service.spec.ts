import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockReturnValue([
                /* */
              ]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', async () => {
    const mockPrismaFindManyUsers = jest.fn().mockReturnValue([
      /* */
    ]);
    jest
      .spyOn(prismaService.user, 'findMany')
      .mockImplementation(mockPrismaFindManyUsers);
    expect(service).toBeDefined();
    await service.findAll();
    expect(mockPrismaFindManyUsers).toBeCalledWith({
      /* */
    });
  });
});
