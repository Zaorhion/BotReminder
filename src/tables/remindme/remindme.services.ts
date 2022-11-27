import { RemindmeQueries } from "./remindme.queries";
import { execute } from "../../utils/mysql.connector";
import { Remindme } from "./remindme";
import { getAvailableIdentifiant } from "../identifiant/identifiant.services";
import { MYSQL_TABLES } from "src/utils/mysql_tables.enum";

export const RemindmeServices = {
  getRemindmesById: async (meId: string): Promise<Remindme[]> => {
    const result: Remindme[] = await execute(RemindmeQueries.GetRemindmesById, [
      meId,
    ]);
    return result;
  },
  addRemindMe: async (
    content: string,
    description: string | null,
    entryDate: Date,
    targetDate: Date,
    repetition: string | null,
    isPaused: number,
    RCId: string | null,
    userId: string
  ): Promise<string> => {
    let meId = await getAvailableIdentifiant(MYSQL_TABLES.Remindme);
    await execute(RemindmeQueries.AddRemindme, [
      meId,
      content,
      description,
      entryDate,
      targetDate,
      repetition,
      isPaused,
      RCId,
      userId,
    ]);
    return meId;
  },
  removeRemindMe: async (meId: string): Promise<number> => {
    await execute(RemindmeQueries.DeleteRemindme, [meId]);
    return 0;
  },
  getRemindmeAtDate: async (targetDate: Date): Promise<Remindme[]> => {
    const result: Remindme[] = await execute(
      RemindmeQueries.GetRemindmeAtDate,
      [targetDate]
    );
    return result;
  },
  getRemindmeByUserId: async (userId: string): Promise<Remindme[]> => {
    const result: Remindme[] = await execute(
      RemindmeQueries.GetRemindmeByUserId,
      [userId]
    );
    return result;
  },
  pauseRemindme: async (meId: string, value: number): Promise<number> => {
    await execute(RemindmeQueries.PauseRemindme, [value, meId]);
    return 0;
  },
};
