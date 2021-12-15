const ninox = require('./config');
const axios = require('axios');
var faker = require('faker/locale/de');

// alle aktuellen teams bei ninox
const getTeams = async () => {
	// console.log(ninox.key);
	const options = {
		url: `https://api.ninoxdb.de/v1/teams`,
		method: 'GET',
		headers: {
			Authorization: `Bearer ${ninox.key}`,
			'Content-Type': 'application/json'
		},
		data: {}
	};

	const res = await axios(options);
	// console.log(res);
	const data = await res.data;
	console.log(data);
	return data;
};

// die datenbaken abrufen
const getDatabases = async () => {
	// console.log(ninox.key);
	const options = {
		url: `https://api.ninoxdb.de/v1/teams/${ninox.team}/databases`,
		method: 'GET',
		headers: {
			Authorization: `Bearer ${ninox.key}`,
			'Content-Type': 'application/json'
		}
	};

	const res = await axios(options);
	// console.log(res);
	const data = await res.data;
	return data;
};

// die tabellen abrufen
const getTables = async () => {
	// console.log(ninox.key);
	const options = {
		url: `https://api.ninoxdb.de/v1/teams/${ninox.team}/databases/${ninox.database}/tables`,
		method: 'GET',
		headers: {
			Authorization: `Bearer ${ninox.key}`,
			'Content-Type': 'application/json'
		}
	};

	const res = await axios(options);
	// console.log(res);
	const data = await res.data;
	return data;
};

//alle einträge in der datenbank abrufen
const getRecords = async () => {
	// console.log(ninox.key);
	const options = {
		url: `https://api.ninoxdb.de/v1/teams/${ninox.team}/databases/${ninox.database}/tables/${ninox.table
			.id}/records`,
		method: 'GET',
		headers: {
			Authorization: `Bearer ${ninox.key}`,
			'Content-Type': 'application/json'
		}
	};

	const res = await axios(options);
	// console.log(res);
	const data = await res.data;
	return data;
};

//einen neuen datensatz in die datenbank speichern
const saveRecord = async (vorname, nachname) => {
	// console.log(ninox.key);
	const options = {
		url: `https://api.ninoxdb.de/v1/teams/${ninox.team}/databases/${ninox.database}/tables/${ninox.table
			.id}/records`,
		method: 'POST',
		headers: {
			Authorization: `Bearer ${ninox.key}`,
			'Content-Type': 'application/json'
		},
		data: [
			{
				fields: {
					Vorname: vorname,
					Nachname: nachname
				}
			}
		]
	};

	const res = await axios(options);
	// console.log(res);
	const data = await res.data;
	console.log(data);
	return data;
};

//mehrere einträge gleichzeitig speichern
const saveMultipleRecords = async () => {
	let persons = [];
	for( let i = 0; i < 100; ++i){
		persons.push(getRandomPerson());
	}
	
	persons = persons.map( item => {
		return {
			fields: {
				Vorname: item.vorname,
				Nachname: item.nachname
			}
		}
	});

	console.log(persons);
	const options = {
		url: `https://api.ninoxdb.de/v1/teams/${ninox.team}/databases/${ninox.database}/tables/${ninox.table
			.id}/records`,
		method: 'POST',
		headers: {
			Authorization: `Bearer ${ninox.key}`,
			'Content-Type': 'application/json'
		},
		data: persons
	};

	const res = await axios(options);
	// console.log(res);
	const data = await res.data;
	return data;
};

//einen zufälligen namen erzeugen
const getRandomPerson = () => {
	const vorname = faker.name.firstName();
	const nachname = faker.name.lastName();
	return {
		vorname,
		nachname
	};
};

// einen dataensatz löschen
const deleteRecord = async (id) => {
	const options = {
		url: `https://api.ninoxdb.de/v1/teams/${ninox.team}/databases/${ninox.database}/tables/${ninox.table
			.id}/records/${id}`,
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${ninox.key}`,
			'Content-Type': 'application/json'
		}
	};

	const res = await axios(options);
	// console.log(res);
	const data = await res.data;
	return data;
}

saveMultipleRecords();
// saveMultipleRecords();
// getTeams();
// saveRecord('Bernd','Hobbie');
// saveMultipleRecords();
