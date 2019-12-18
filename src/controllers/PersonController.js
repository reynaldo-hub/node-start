import Controller from './bases/Controller.js';
import PersonService from '../services/PersonService.js';
import Person from '../models/Person.js';

const personService = new PersonService(
	new Person().getInstance(),
);

class PersonController extends Controller {

}

export default new PersonController(personService);
