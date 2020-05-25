import Realm from 'realm';

import { Task } from './schemas';

export default function getRealm() {
	return Realm.open({
		schema: [Task],
		schemaVersion: 1
	});
}