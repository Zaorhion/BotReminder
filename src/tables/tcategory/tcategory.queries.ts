export const TCategoryQueries = {
  GetCategoriesByUserId: `
        SELECT * FROM TCategory WHERE userId = ?;`,

  GetCategoryById: `
        SELECT * FROM TCategory WHERE TCId = ?;`,

  GetCategoryByTitleUserId: `
      SELECT TCategory.TCId, TCategory.title
      FROM TCategory
      LEFT JOIN Activity ON TCategory.TCId = Activity.TCId
      LEFT JOIN Task ON Activity.AId = Task.AId OR TCategory.TCId = Task.TCId
      WHERE userid = ?
      AND UPPER(title) LIKE UPPER(?)
      GROUP BY TCategory.TCId, TCategory.title
      HAVING SUM(TIMESTAMPDIFF(MINUTE, entryDate, endDate)) IS NOT NULL AND count(Task.TId) > 0;
  
  `,
  GetCategoryByKeywordUserId: `
      SELECT TCategory.TCId, TCategory.title
      FROM TCategory
      LEFT JOIN Activity ON TCategory.TCId = Activity.TCId
      LEFT JOIN Task ON Activity.AId = Task.AId OR TCategory.TCId = Task.TCId
      WHERE userid = ?
      AND UPPER(title) LIKE UPPER(?)
      GROUP BY TCategory.TCId, TCategory.title
      HAVING SUM(TIMESTAMPDIFF(MINUTE, entryDate, endDate)) IS NOT NULL AND count(Task.TId) > 0; 
  `,

  GetMiscellaneousCategory: `
        SELECT * FROM TCategory WHERE title = 'Miscellaneous' AND userId = ?;`,

  InsertCategory: `
        INSERT INTO TCategory (TCId, title, userId) VALUES (?, ?, ?);`,

  DeleteCategory: `
        DELETE FROM TCategory WHERE TCId = ?;`,

  IsDuplicatedCategory: `
        SELECT * FROM TCategory WHERE UPPER(title) = UPPER(?) AND userId = ?;`,
};
