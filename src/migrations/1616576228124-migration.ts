import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1616576228124 implements MigrationInterface {
    name = 'migration1616576228124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `worksProducts_registers` (`workProductId` int NOT NULL, `registerId` int NOT NULL, INDEX `IDX_d90ad0225dffe8538507ad578f` (`workProductId`), INDEX `IDX_f4b45501f9ed59230c583cb30d` (`registerId`), PRIMARY KEY (`workProductId`, `registerId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL");
        await queryRunner.query("ALTER TABLE `worksProducts_registers` ADD CONSTRAINT `FK_d90ad0225dffe8538507ad578f7` FOREIGN KEY (`workProductId`) REFERENCES `work_product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `worksProducts_registers` ADD CONSTRAINT `FK_f4b45501f9ed59230c583cb30d4` FOREIGN KEY (`registerId`) REFERENCES `register`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `worksProducts_registers` DROP FOREIGN KEY `FK_f4b45501f9ed59230c583cb30d4`");
        await queryRunner.query("ALTER TABLE `worksProducts_registers` DROP FOREIGN KEY `FK_d90ad0225dffe8538507ad578f7`");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_finished` `time_finished` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `time_register` `time_register` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `register` CHANGE `payment` `payment` enum ('0', '1', '2', '3') NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number2` `phone_number2` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `worker` CHANGE `phone_number1` `phone_number1` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `description` `description` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `bar_code` `bar_code` varchar(13) NULL DEFAULT 'NULL'");
        await queryRunner.query("DROP INDEX `IDX_f4b45501f9ed59230c583cb30d` ON `worksProducts_registers`");
        await queryRunner.query("DROP INDEX `IDX_d90ad0225dffe8538507ad578f` ON `worksProducts_registers`");
        await queryRunner.query("DROP TABLE `worksProducts_registers`");
    }

}
