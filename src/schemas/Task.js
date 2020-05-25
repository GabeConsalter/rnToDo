import Utils from '../Utils';

/**
 * Task
 *
 * @author Gabriel Consalter
 * @since 1.0.0
 */
class Task {
	/**
	 * @constructor
	 *
	 * @param {Task} task
	 * @prop {string} guid=Utils.guid() - The guid to identify a task
	 * @prop {string} text - The text describing what have to do
	 * @prop {bool} done=false - The done status indicating if task is done or not
	 * @prop {Date} createdAt=new Date() - The moment that task was created
	 * @prop {Date} [updatedAt] - The moment that task was updated
	 */
	constructor(task) {
		this.guid = task.guid ? task.guid : Utils.guid();
		this.text = task.text;
		this.done = task.done = false;
		this.createdAt = new Date();
		this.updatedAt = task.updatedAt;
	}
}

Task.schema = {
	name: 'Task',
	primaryKey: 'guid',
	properties: {
		guid: {
			type: 'string',
			indexed: true
		},
		text: 'string',
		done: 'bool',
		createdAt: 'date',
		updatedAt: 'date?'
	}
};

export default Task;