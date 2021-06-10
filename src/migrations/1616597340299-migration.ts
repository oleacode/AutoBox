import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1616597340299 implements MigrationInterface {
    name = 'migration1616597340299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `work_register` (`id` int NOT NULL AUTO_INCREMENT, `productId` int NOT NULL, `workerId` int NOT NULL, `quantity` int NOT NULL, `description` varchar(255) NOT NULL, `registerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL");
        await queryRunner.query("ALTER TABLE `work_register` ADD CONSTRAINT `FK_50ab277f9f766ab557aeb498407` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `work_register` ADD CONSTRAINT `FK_7b00cb249b16bbefc06dcff4ad8` FOREIGN KEY (`workerId`) REFERENCES `worker`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `work_register` ADD CONSTRAINT `FK_cd4afb1c3313d0b45e9cab8f540` FOREIGN KEY (`registerId`) REFERENCES `register`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `work_register` DROP FOREIGN KEY `FK_cd4afb1c3313d0b45e9cab8f540`");
        await queryRunner.query("ALTER TABLE `work_register` DROP FOREIGN KEY `FK_7b00cb249b16bbefc06dcff4ad8`");
        await queryRunner.query("ALTER TABLE `work_register` DROP FOREIGN KEY `FK_50ab277f9f766ab557aeb498407`");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL DEFAULT 'NULL'");
        await queryRunner.query("DROP TABLE `work_register`");
    }

}
