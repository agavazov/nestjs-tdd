import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface DBRecord {
  [fields: string]: any;
}

export interface DBRecords {
  [table: string]: { [id: string]: DBRecord[] };
}

/**
 * Database for demo proposes
 */
@Injectable()
export class DummyDb {
  protected storage: DBRecords = {};
  protected dbFile: string;

  constructor() {
    this.dbFile = path.join(__dirname, '../../../.db.json');
  }

  async findAll<K>(table: string): Promise<K[]> {
    await this.reread();

    return Object.entries(this?.storage?.[table] || {}).map(([id, record]) => ({
      id,
      ...record,
    })) as K[];
  }

  async get<K>(table: string, id: string): Promise<K | undefined> {
    await this.reread();

    if (this?.storage?.[table]?.[id]) {
      return {
        id,
        ...this.storage[table][id],
      } as K;
    }

    return undefined;
  }

  async insert(table: string, data: any): Promise<string> {
    await this.reread();

    if (typeof this.storage?.[table] === 'undefined') {
      this.storage[table] = {};
    }

    const id = Math.random().toString(36).substring(2, 10);
    // this.storage[table][id] = data;
    this.storage[table] = Object.assign({ [id]: data }, this.storage[table]); // Assign it in front

    await this.rewrite();

    return id;
  }

  async update(table: string, id: string, data: any): Promise<boolean> {
    await this.reread();

    if (this?.storage?.[table]?.[id]) {
      this.storage[table][id] = data;
      await this.rewrite();
      return true;
    }

    return false;
  }

  async delete(table: string, id: string): Promise<boolean> {
    await this.reread();

    if (this?.storage?.[table]?.[id]) {
      delete this.storage[table][id];
      await this.rewrite();
      return true;
    }

    return false;
  }

  protected async reread() {
    try {
      this.storage = JSON.parse(fs.readFileSync(this.dbFile).toString());
    } catch {
      // do nothing
    }
  }

  protected async rewrite() {
    fs.writeFileSync(this.dbFile, JSON.stringify(this.storage));
  }
}
