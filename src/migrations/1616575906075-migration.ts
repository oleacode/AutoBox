import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1616575906075 implements MigrationInterface {
    name = 'migration1616575906075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL");
        await queryRunner.query("ALTER TABLE `work_product` DROP FOREIGN KEY `FK_4346ef9721b97badef555ef80d6`");
        await queryRunner.query("ALTER TABLE `work_product` CHANGE `workerId` `workerId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `work_product` ADD CONSTRAINT `FK_4346ef9721b97badef555ef80d6` FOREIGN KEY (`workerId`) REFERENCES `worker`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `work_product` DROP FOREIGN KEY `FK_4346ef9721b97badef555ef80d6`");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `work_product` CHANGE `workerId` `workerId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `work_product` ADD CONSTRAINT `FK_4346ef9721b97badef555ef80d6` FOREIGN KEY (`workerId`) REFERENCES `worker`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL DEFAULT 'NULL'");
    }

}
