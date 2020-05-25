import Utils from '../Utils';
import getRealm from '../realm';
import moment from 'moment';

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
	 * @prop {string} createdAt=new Date() - The moment that task was created
	 * @prop {string} [updatedAt] - The moment that task was updated
	 */
	constructor(task) {
		this.guid = task.guid ? task.guid : Utils.guid();
		this.text = task.text;
		this.done = task.done ? task.done : false;
		this.createdAt = task.createdAt ? task.createdAt : moment().toISOString();
		this.updatedAt = moment(task.updatedAt).toISOString();
	}

	/**
	 * Save a task
	 *
	 * @author Gabriel Consalter
	 * @since 1.0.0
	 */
	async save() {
		const realm = await getRealm();

		realm.write(() => realm.create('Task', this));
	}

	/**
	 * Get a task by guid
	 *
	 * @param {string} guid
	 *
	 * @author Gabriel Consalter
	 * @since 1.0.0
	 */
	static async get(guid) {
		const realm = await getRealm(),
			task = realm.objectForPrimaryKey('Task', guid);

		return task ? new Task({ ... JSON.parse(JSON.stringify(task)) }) : null;
	}

	/**
	 * Get all tasks
	 *
	 * @author Gabriel Consalter
	 * @since 1.0.0
	 */
	static async getAll() {
		const realm = await getRealm(),
			tasks = Array.from(realm.objects('Task'));

		return tasks.map(task => new Task({
			... JSON.parse(JSON.stringify(task))
		}));
	}

	/**
	 * Delete all
	 *
	 * @author Gabriel Consalter
	 * @since 1.0.0
	 */
	static async deleteAll() {
		const realm = await getRealm(),
			tasks = realm.objects('Task');

		realm.write(() => realm.delete(tasks));
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
		createdAt: 'string',
		updatedAt: 'string?'
	}
};

export default Task;