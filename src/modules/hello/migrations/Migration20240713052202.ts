import { Migration } from '@mikro-orm/migrations';

export class Migration20240713052202 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "my_custom" ("id" text not null, "name" text not null, "age" integer not null default 0, "has_account" boolean not null default false, "color" text check ("color" in (\'black\', \'white\')) not null default \'white\', "date_of_birth" timestamptz null, "metadata" jsonb null, "names" text[] null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "my_custom_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "my_custom" cascade;');
  }

}
