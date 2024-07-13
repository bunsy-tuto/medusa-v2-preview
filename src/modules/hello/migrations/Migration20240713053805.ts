import { Migration } from '@mikro-orm/migrations';

export class Migration20240713053805 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "my_custom" alter column "age" drop default;');
    this.addSql('alter table if exists "my_custom" alter column "age" type integer using ("age"::integer);');
    this.addSql('alter table if exists "my_custom" alter column "age" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "my_custom" alter column "age" type integer using ("age"::integer);');
    this.addSql('alter table if exists "my_custom" alter column "age" set default 0;');
    this.addSql('alter table if exists "my_custom" alter column "age" set not null;');
  }

}
