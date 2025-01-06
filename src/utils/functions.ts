import { type TimeSpanUnit, TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

import type { TMetaDataResponse } from "@/types";

export function generateRandomSalt() {
  return generateRandomString(16, alphabet("a-z", "A-Z", "0-9"));
}

export function generateToken() {
  return generateRandomString(12, alphabet("a-z", "A-Z", "0-9"));
}

export function generateDate(ammount: number, unit: TimeSpanUnit): Date {
  return createDate(new TimeSpan(ammount, unit));
}

export function AddMetaData(size: number, data: Array<any>, cursor: number, totalRegisters: number): TMetaDataResponse {
  const hasNext = Math.floor(totalRegisters / size);
  return {
    data,
    metadata: {
      totalRegisters,
      total: data.length,
      totalPerPage: size,
      totalPages: hasNext,
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

/**
 * 
 * {
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
