import PouchDB from 'pouchdb';

class Database {
  constructor(config) {
    this.type = config.type;
  }

  async get_access_token(api_key) {
    var url = 'https://auth.nhlong.workers.dev/';
    let response = await fetch(url, {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        api_key: `${api_key}`,
      },
    });
    if (response.status == 200) {
      return (await response.json()).access_token;
    } else {
      return null;
    }
  }

  async connect(config) {
    if (this.type == 'CouchDB'){
    return new PouchDB(config.host)
    }
  }
}

export default Database;