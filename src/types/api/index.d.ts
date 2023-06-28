import { ApiKey } from "@prisma/client";
import { MaleZscores, FemaleZscores } from "@prisma/client";
export interface CreateApiData {
  error: string | ZodIssue[] | null;
  createdApiKey: ApiKey | null;
}

export interface RevokeApiData {
  error: string | ZodIssue[] | null;
  success: boolean;
}

export type MaleZscoreData = Omit<MaleZscores, id>;
export type FemaleZscoreData = Omit<FemaleZscores, id>;
