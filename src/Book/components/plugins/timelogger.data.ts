import DateWorker from "../../../utils/date.worker";
// interface TaskTL {
//   content: string;
//   totalElapsed: number;
// }
/**
 * Class that describes a category of tasks
 * @class
 */
export default class CategoryData {
  title: string;
  activities: Map<String, Map<String, number>> = new Map();
  tasks: Map<String, number> = new Map();
  /**
   * @alias Category
   * @param title
   * @constructor
   */
  constructor(title: string) {
    this.title = title;
  }
  /**
   * Add a new activity to the category
   * @param activityName
   * @param aggregate
   * @returns
   */
  addActivity(
    activityName: string,
    aggregate: boolean = true
  ): Map<String, number> {
    if (this.activities.has(activityName) && !aggregate) {
      let i = 1;
      while (this.activities.has(activityName + i)) i++;
      activityName += i;
    }
    this.activities.set(activityName, new Map());
    return this.activities.get(activityName)!;
  }
  /**
   * Add a new task to the activity
   * @param activityName
   * @param content
   * @param totalElapsed
   * @param aggregate
   */
  addTaskToActivity(
    activityName: string,
    content: string,
    totalElapsed: number,
    aggregate: boolean = true
  ) {
    if (!this.activities.has(activityName)) {
      this.addActivity(activityName);
    }
    let activity = this.activities.get(activityName)!;
    if (activity.has(content)) {
      if (aggregate) {
        totalElapsed += activity.get(content)!;
      } else {
        let i = 1;
        while (activity.has(content + i)) i++;
        content += i;
      }
    }
    activity.set(content, totalElapsed);
  }
  /**
   * Add a new task to the category
   * @param content
   * @param totalElapsed
   * @param aggregate
   */
  addTaskToCategory(
    content: string,
    totalElapsed: number,
    aggregate: boolean = true
  ) {
    if (this.tasks.has(content)) {
      if (aggregate) {
        totalElapsed += this.tasks.get(content)!;
      } else {
        let i = 1;
        while (this.tasks.has(content + i)) i++;
        content += i;
      }
    }
    this.tasks.set(content, totalElapsed);
  }
  /**
   * Get the total elapsed time of the category
   */
  getTotalElapsed(): number {
    let totalElapsed = 0;
    this.activities.forEach((activity) => {
      activity.forEach((task) => {
        totalElapsed += task;
      });
    });
    this.tasks.forEach((task) => {
      totalElapsed += task;
    });
    return totalElapsed;
  }
  /**
   * Get the total elapsed time of the activity
   * @param activityName
   * @returns
   */
  getTotalElapsedOfActivity(activityName: String): number {
    let totalElapsed = 0;
    if (this.activities.has(activityName)) {
      this.activities.get(activityName)!.forEach((task) => {
        totalElapsed += task;
      });
    }
    return totalElapsed;
  }
  /**
   * Get the category name and the total elapsed time
   */
  getSummary(): Array<String> {
    return [this.title, DateWorker.timeToReadable(this.getTotalElapsed())];
  }
  /**
   * Get the activity name and the total elapsed time
   */
  getSummaryOfActivity(activityName: String): Array<String> {
    return [
      activityName,
      DateWorker.timeToReadable(this.getTotalElapsedOfActivity(activityName)),
    ];
  }
  /**
   * Get the task name and the total elapsed time
   */
  getSummaryOfTaskActivity(
    taskName: String,
    activityName: String
  ): Array<String> {
    if (this.activities.has(activityName)) {
      let activity = this.activities.get(activityName)!;
      if (activity.has(taskName)) {
        return [taskName, DateWorker.timeToReadable(activity.get(taskName)!)];
      }
    }
    return ["", ""];
  }
  /**
   * Get the task name and the total elapsed time of the category
   */
  getSummaryOfTaskCategory(taskName: String): Array<String> {
    if (this.tasks.has(taskName)) {
      return [taskName, DateWorker.timeToReadable(this.tasks.get(taskName)!)];
    }
    return ["", ""];
  }
  /**
   * Get an array of all the time elapsed for the activities
   */
  getActivitiesTimeArray(): Array<number> {
    let result: Array<number> = [];
    this.activities.forEach((activity) => {
      activity.forEach((task) => {
        result.push(task);
      });
    });
    return result;
  }
  /**
   * Get an array of all the name of the activities
   */
  getActivitiesNameArray(): Array<String> {
    let result: Array<String> = [];
    this.activities.forEach((activity, key) => {
      result.push(key);
    });
    return result;
  }
  /**
   * Get an array of all the time elapsed for the tasks
   */
  getTasksTimeArray(): Array<number> {
    let result: Array<number> = [];
    this.tasks.forEach((task) => {
      result.push(task);
    });
    return result;
  }
  /**
   * Get an array of all the name of the tasks
   */
  getTasksNameArray(): Array<String> {
    let result: Array<String> = [];
    this.tasks.forEach((task, key) => {
      result.push(key);
    });
    return result;
  }

  /**
   * Getter of the activities
   */
  getActivities(): Map<String, Map<String, number>> {
    return this.activities;
  }
  /**
   * Getter of the tasks
   */
  getTasks(): Map<String, number> {
    return this.tasks;
  }
  /**
   * Get the name of the category
   */
  getTitle(): String {
    return this.title;
  }
  /**
   * toString method
   * @returns
   * @override
   */
  toString() {
    let result = `Category: **${this.title}** - ${DateWorker.timeToReadable(
      this.getTotalElapsed()
    )}\n`;
    this.activities.forEach((activity, activityName) => {
      result += `\n⥤ Activity: ${activityName} - ${DateWorker.timeToReadable(
        this.getTotalElapsedOfActivity(activityName)
      )}\n`;
      activity.forEach((task, content) => {
        result += `⩶⥤  Task: *${content}* - ${DateWorker.timeToReadable(
          task
        )}\n`;
      });
    });
    this.tasks.forEach((task, content) => {
      result += `\n⥤ Task: ${content} - ${DateWorker.timeToReadable(task)}\n`;
    });
    return result;
  }
}