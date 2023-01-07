import axios from 'axios'

export const register = async (email: string, password: string) => {
   const response = axios
      .post(
         'http://localhost:3000/auth/register',
         {
            email,
            password,
         },
         {
            headers: {
               'Content-Type': 'application/json',
            },
         },
      )
      .catch(function (error) {
         if (error) {
            return error
         }
      })

   return await response
}

export const login = async (email: string, password: string) => {
   const response = axios
      .post(
         `http://localhost:3000/auth/login`,
         {
            email,
            password,
         },
         {
            withCredentials: true,
            headers: {
               'Content-Type': 'application/json',
            },
         },
      )
      .then((res) => {
         if (res) {
            return res
         }
      })
      .catch((error) => {
         if (error) {
            return error
         }
      })

   return await response
}

export const logout = async () => {
   sessionStorage.clear()
   localStorage.clear()
   return await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
   })
}

export const getAndSetLoggedInUser = async (token: string | null) => {
   const response = axios.get('http://localhost:3000/articles/my-articles', {
      withCredentials: true,
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   })
   return await response
}

export const createArticle = async (
   data: any,
   token: any,
   userId: number | undefined,
) => {
   const response = axios.post(
      'http://localhost:3000/articles',
      {
         title: data.title,
         description: data.description,
         body: data.body,
         authorId: userId,
      },
      {
         withCredentials: true,
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
         },
      },
   )
   return await response
}
