import { type TimeSpanUnit, TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

import type { MetaDataResponse } from "@/types";

export function generateRandomSalt(): string {
  return generateRandomString(16, alphabet("a-z", "A-Z", "0-9"));
}

export function generateToken(): string {
  return generateRandomString(12, alphabet("a-z", "A-Z", "0-9"));
}

export function generateDate(ammount: number, unit: TimeSpanUnit): Date {
  return createDate(new TimeSpan(ammount, unit));
}

export function AddMetaData(data: Array<any>, cursor: number, totalRegisters: number): MetaDataResponse {
  const hasNext = Math.floor(totalRegisters / 50);

  return {
    data,
    metadata: {
      total: data.length,
      totalPages: hasNext,
      totalPerPage: 50,
      totalRegisters,
      currentCursor: cursor,
      prev: cursor === 1 ? 1 : cursor - 1,
      next: hasNext / cursor < 1 ? 0 : cursor + 1,
    },
  };
}

export function getCurrentCursorOffSet(id = 0): number {
  return id <= 1 || isNaN(id) ? 0 : id * 50 - 50;
}

/**
 * This is a Genereic but simple purpose only function,
 * and it's only purpose is to re arrange Dates that come in DD/MM/YYYY
 * to the valid Js basic Date standard, this function is not intended to be fast ATM.
 * @param strDate String to re arrange nto date (Only Date as str pls)
 */
export function commonBDR(strDate: string): Date {
  const [year, month, day] = strDate.split(strDate.includes("-") ? "-" : "/");
  return new Date(`${parseInt(day)}-${parseInt(month)}-${parseInt(year)}`);
}

export function getRandomHash(): string {
  return Bun.hash(Bun.nanoseconds().toString(), 200).toString();
}

export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * This function is for removing "found" field on response Error Object, because this field shows incoming data
 * @param error String
 * @returns Obj | String
 */
export function filterMessage(error: string): string {
  if (isJsonString(error)) {
    const { found: _, ...args } = JSON.parse(error);
    return args;
  } else return error;
}

/**
 * 
 * 
  {
    "address": "calle X uwehuiwfe",
    "birth_date": "27/09/1999",
    "first_name": "Jose",
    "last_name": "Ynfante",
    "phone_number": "8099919999",
    "document_type_id": 1,
    "account_type_id": 1,
    "document_id": "402372991999",
    "password": "admin1234",
    "email": "yassett.ynfante@gmail.com"
  }
 * 
 */
