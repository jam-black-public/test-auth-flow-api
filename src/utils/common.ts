import { HttpException } from '@nestjs/common';
import { hash } from 'bcrypt';

export const assertEx = (condition: any, error: string | object, status: number = 500): void => {
  if (!condition) {
    console.log(error as string);
    throw new HttpException(
      {
        status,
        error,
      },
      status,
    );
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;

  const hashedPassword = (await new Promise((resolve, reject) => {
    hash(password, saltRounds, (err: Error, hash: string) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  })) as string;

  return hashedPassword;
}
