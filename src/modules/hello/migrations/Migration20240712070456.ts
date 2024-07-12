import { Migration } from '@mikro-orm/migrations';

export class Migration20240712070456 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "my_custom" alter column "price" type numeric using ("price"::numeric);');
    this.addSql('alter table if exists "my_custom" alter column "price" set default 999.99;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "my_custom" alter column "price" drop default;');
    this.addSql('alter table if exists "my_custom" alter column "price" type numeric using ("price"::numeric);');
  }

}
