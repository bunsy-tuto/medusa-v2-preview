import { Migration } from '@mikro-orm/migrations';

export class Migration20240712070109 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "my_custom" add column if not exists "age" integer not null default 0, add column if not exists "price" numeric not null, add column if not exists "has_account" boolean not null default false, add column if not exists "color" text check ("color" in (\'black\', \'white\')) not null default \'white\', add column if not exists "date_of_birth" timestamptz not null, add column if not exists "metadata" jsonb not null, add column if not exists "names" text[] not null, add column if not exists "raw_price" jsonb not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "my_custom" drop column if exists "age";');
    this.addSql('alter table if exists "my_custom" drop column if exists "price";');
    this.addSql('alter table if exists "my_custom" drop column if exists "has_account";');
    this.addSql('alter table if exists "my_custom" drop column if exists "color";');
    this.addSql('alter table if exists "my_custom" drop column if exists "date_of_birth";');
    this.addSql('alter table if exists "my_custom" drop column if exists "metadata";');
    this.addSql('alter table if exists "my_custom" drop column if exists "names";');
    this.addSql('alter table if exists "my_custom" drop column if exists "raw_price";');
  }

}
