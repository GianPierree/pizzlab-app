import { validate } from 'class-validator';
import { CreateUserDto } from '../../../../src/users/dto/create-user.dto';

describe('Create User DTO', () => {
  describe('Validaciones correctas', () => {
    it('Se debe validar todos los campos del DTO', async () => {
      const dto = new CreateUserDto();
      dto.name = 'Juan';
      dto.last_name = 'Perez';
      dto.email = 'jperez@test.com';
      dto.username = 'jperez';
      dto.password = '123456.';
      dto.role = 'ADMIN';

      const result = await validate(dto);

      expect(result.length).toBe(0);
    });

    it('Se debe validar sin el campo role el DTO', async () => {
      const dto = new CreateUserDto();
      dto.name = 'Juan';
      dto.last_name = 'Perez';
      dto.email = 'jperez@test.com';
      dto.username = 'jperez';
      dto.password = '123456.';

      const result = await validate(dto);

      expect(result.length).toBe(0);
    });
  });

  describe('Validaciones incorrectas', () => {
    describe('email', () => {
      it('Se debe validar con un formato incorrecto de email', async () => {
        const dto = new CreateUserDto();
        dto.name = 'Juan';
        dto.last_name = 'Perez';
        dto.email = 'jpereztest.com';
        dto.username = 'jperez';
        dto.password = '123456.';
        dto.role = 'ADMIN';

        const result = await validate(dto);

        expect(result).toBeTruthy(); // TODO: Es la más sencilla.
        expect(result.length).toBe(1);
        expect(result[0].constraints.isEmail).toBe('email must be an email');
      });
    });

    describe('username', () => {
      it('Se debe validar cuando no se envía el username', async () => {
        const dto = new CreateUserDto();
        dto.name = 'Juan';
        dto.last_name = 'Perez';
        dto.email = 'jperez@test.com';
        dto.password = '123456.';
        dto.role = 'ADMIN';

        const result = await validate(dto);

        expect(result).toBeTruthy(); // TODO: Es la más sencilla.
        expect(result.length).toBe(1);
        expect(result[0].constraints.isNotEmpty).toBe('username should not be empty');
      });

      it('Se debe validar cuando se envía el username con menoos de 3 caracteres', async () => {
        const dto = new CreateUserDto();
        dto.name = 'Juan';
        dto.last_name = 'Perez';
        dto.username = 'jp';
        dto.email = 'jperez@test.com';
        dto.password = '123456.';
        dto.role = 'ADMIN';

        const result = await validate(dto);

        expect(result).toBeTruthy(); // TODO: Es la más sencilla.
        expect(result.length).toBe(1);
        expect(result[0].constraints.minLength).toBe(
          'username must be longer than or equal to 3 characters',
        );
      });
    });

    describe('password', () => {
      it('Se debe validar la longitud de la contraseña', async () => {
        const dto = new CreateUserDto();
        dto.name = 'Juan';
        dto.last_name = 'Perez';
        dto.email = 'jperez@test.com';
        dto.username = 'jperez';
        dto.password = '123';
        dto.role = 'ADMIN';

        const result = await validate(dto);

        expect(result).toBeTruthy(); // TODO: Es la más sencilla.
        expect(result.length).toBe(1);
        expect(result[0].constraints.minLength).toBe(
          'password must be longer than or equal to 5 characters',
        );
      });

      it('Se debe validar cuando no se envía la contraseña', async () => {
        const dto = new CreateUserDto();
        dto.name = 'Juan';
        dto.last_name = 'Perez';
        dto.email = 'jperez@test.com';
        dto.username = 'jperez';
        dto.role = 'ADMIN';

        const result = await validate(dto);

        expect(result).toBeTruthy(); // TODO: Es la más sencilla.
        expect(result.length).toBe(1);
        expect(result[0].constraints.isNotEmpty).toBe('password should not be empty');
      });
    });
  });
});
