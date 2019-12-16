import Controller from './bases/Controller';
import PersonService from '../services/PersonService';
import Person from '../models/Person';

const personService = new PersonService(
	new Person().getInstance(),
);

class PersonController extends Controller {

}

export default new PersonController(personService);
