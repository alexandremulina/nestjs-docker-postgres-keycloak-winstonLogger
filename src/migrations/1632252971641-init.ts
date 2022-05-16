import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1632252971641 implements MigrationInterface {
  name = 'init1632252971641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exemplo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bbac1f2b808fcdc1abf166d56be" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "exemplo"`);
  }
}
