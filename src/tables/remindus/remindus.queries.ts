export const RemindusQueries = {
  GetRemindusById: `
        SELECT
        usId,
        guildId,
        channelId,
        content,
        description,
        entryDate,
        targetDate,
        repetition,
        mentionId,
        isPaused,
        RId
        FROM
        Remindus
        WHERE
        usId = ?;
        `,

  AddRemindus: `
        INSERT INTO Remindus VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
  DeleteRemindus: `
        DELETE FROM Remindus WHERE usId = ?;`,
  GetRemindusAtDate: `
        SELECT
        usId,
        guildId,
        channelId,
        content,
        description,
        entryDate,
        targetDate,
        repetition,
        mentionId,
        isPaused,
        RId
        FROM
        Remindus
        WHERE
        targetDate = ?;
        `,
  GetRemindusByGuildId: `
        SELECT
        usId,
        guildId,
        channelId,
        content,
        description,
        entryDate,
        targetDate,
        repetition,
        mentionId,
        isPaused,
        RId
        FROM
        Remindus
        WHERE
        guildId = ?;
        `,
};