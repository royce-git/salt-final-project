import config from '../../config';
import bcrypt from 'bcryptjs';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.user_name}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(user_name, password) {
    const data = {user_name, password};
    // const response = await this.api(`registration/login`, 'POST', null, true, {
    //   user_name,
    //   password
    // });
    const response = await this.api(`registration/login`, 'POST', data);
    console.log('DATA.JS GET USER', response);
    
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 400) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const password = user.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    user["password"] = hash;

    const response = await this.api('registration/register', 'POST', user);
    console.log('createuserrrr', response);
    
    if (response.status === 200) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
