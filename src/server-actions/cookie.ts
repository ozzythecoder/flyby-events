"use server";

import { type Theme } from "@/definitions/themes";
import { cookies } from "next/headers";

export async function setCookie(newTheme: Theme) {
  cookies().set("theme", newTheme);
}
