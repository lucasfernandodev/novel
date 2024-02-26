import axios from 'axios';

export const APi = axios.create({
  baseURL: import.meta.env.REACT_APP_API,
})

export const useApi = () => ({
  validateToken: async (token: string) => {

    return new Promise((sucess) => {
      sucess({
        user: {
          id: '9a4cda5b-12b5-5e03-822a-7d33af73bcf0',
          name: 'Jonh',
          email: 'john@exemplo.com'
        },
      })
    })
    const response = await APi.post('/validate', {
      token
    });
    return response.data
  },

  signin: async (email: string, password: string) => {
    return new Promise((sucess) => {
      sucess({
        user: {
          id: '9a4cda5b-12b5-5e03-822a-7d33af73bcf0',
          name: 'Jonh',
          email: 'john@exemplo.com'
        },
        token: 'd2791bfa-100b-5695-8607-821b0469bd2a'
      })
    })
    const response = await APi.post('/signin', {
      email,
      password
    });
    return response.data
  },

  logout: async () => {
    return { status: true }
    const response = await APi.post('/logout');
    return response.data
  }
})