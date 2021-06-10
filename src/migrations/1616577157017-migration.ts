import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1616577157017 implements MigrationInterface {
    name = 'migration1616577157017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `work_product` ADD `description` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL");
        await queryRunner.query("ALTER TABLE `work_product` DROP FOREIGN KEY `FK_0eaf960f741a86b42144468d5be`");
        await queryRunner.query("ALTER TABLE `work_product` CHANGE `registerId` `registerId` int NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL");
        await queryRunner.query("ALTER TABLE `work_product` ADD CONSTRAINT `FK_0eaf960f741a86b42144468d5be` FOREIGN KEY (`registerId`) REFERENCES `register`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `work_product` DROP FOREIGN KEY `FK_0eaf960f741a86b42144468d5be`");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `work_product` CHANGE `registerId` `registerId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `work_product` ADD CONSTRAINT `FK_0eaf960f741a86b42144468d5be` FOREIGN KEY (`registerId`) REFERENCES `register`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `work_product` DROP COLUMN `description`");
    }

}
