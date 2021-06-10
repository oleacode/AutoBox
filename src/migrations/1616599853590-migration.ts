import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1616599853590 implements MigrationInterface {
    name = 'migration1616599853590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `work_register` ADD `time_registered` date NOT NULL");
        await queryRunner.query("ALTER TABLE `work_register` ADD `time_finished` date NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL");
        await queryRunner.query("ALTER TABLE `work_register` DROP FOREIGN KEY `FK_cd4afb1c3313d0b45e9cab8f540`");
        await queryRunner.query("ALTER TABLE `work_register` CHANGE `registerId` `registerId` int NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL");
        await queryRunner.query("ALTER TABLE `work_register` ADD CONSTRAINT `FK_cd4afb1c3313d0b45e9cab8f540` FOREIGN KEY (`registerId`) REFERENCES `register`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `work_register` DROP FOREIGN KEY `FK_cd4afb1c3313d0b45e9cab8f540`");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `work_register` CHANGE `registerId` `registerId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `work_register` ADD CONSTRAINT `FK_cd4afb1c3313d0b45e9cab8f540` FOREIGN KEY (`registerId`) REFERENCES `register`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `work_register` DROP COLUMN `time_finished`");
        await queryRunner.query("ALTER TABLE `work_register` DROP COLUMN `time_registered`");
    }

}
