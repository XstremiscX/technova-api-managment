import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchemaModified1756238700669 implements MigrationInterface {
    name = 'InitialSchemaModified1756238700669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" integer NOT NULL DEFAULT '1'`);
    }

}
