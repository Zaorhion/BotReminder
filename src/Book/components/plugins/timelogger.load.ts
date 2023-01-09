import CategoryData from "./timelogger.data";
import { TCategoryServices } from "../../../tables/tcategory/tcategory.services";
import { ActivityServices } from "../../../tables/activity/activity.services";
import { TaskServices } from "../../../tables/task/task.services";

export default class TimeLoggerLoad {
  static async loadCategories(userId: string): Promise<CategoryData[] | null> {
    const categories = await TCategoryServices.getTCategoryByUserId(userId);
    if (categories.length === 0) return null;
    const categoriesData: CategoryData[] = [];
    for (const category of categories) {
      const categoryData = new CategoryData(category.title);
      const activities = await ActivityServices.getActivitiesByCategoryId(
        category.TCId
      );
      for (const activity of activities) {
        const activityData = categoryData.addActivity(activity.name);
        const tasks = await TaskServices.GetTasksAlteredEndedByActivityId(
          activity.AId
        );
        for (const task of tasks) {
          categoryData.addTaskToActivity(
            activity.name,
            task.content,
            parseInt(task.timeElapsed)
          );
        }
      }

      // Get the tasks that are not linked to an activity
      const tasks = await TaskServices.GetTasksALteredByCategoryIdNotEnded(
        category.TCId
      );

      for (const task of tasks) {
        categoryData.addTaskToCategory(
          task.content,
          parseInt(task.timeElapsed)
        );
      }

      categoriesData.push(categoryData);
    }
    return categoriesData;
  }

  static async loadCategory(
    userId: string,
    categoryName: string
  ): Promise<CategoryData | null> {
    const category = await TCategoryServices.getTCategoryByTitleUserId(
      categoryName,
      userId
    );
    if (!category) return null;
    const categoryData = new CategoryData(category.title);
    const activities = await ActivityServices.getActivitiesByCategoryId(
      category.TCId
    );
    for (const activity of activities) {
      const activityData = categoryData.addActivity(activity.name);
      const tasks = await TaskServices.GetTasksAlteredEndedByActivityId(
        activity.AId
      );
      for (const task of tasks) {
        categoryData.addTaskToActivity(
          activity.name,
          task.content,
          parseInt(task.timeElapsed)
        );
      }
    }
    // Get the tasks that are not linked to an activity
    const tasks = await TaskServices.GetTasksALteredByCategoryIdNotEnded(
      category.TCId
    );

    for (const task of tasks) {
      categoryData.addTaskToCategory(task.content, parseInt(task.timeElapsed));
    }

    return categoryData;
  }
}