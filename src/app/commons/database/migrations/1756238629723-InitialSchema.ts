import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1756238629723 implements MigrationInterface {
    name = 'InitialSchema1756238629723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT '1'`);
    }

}
