import { signInAction, signOutAction } from './actions'
import { push } from 'connected-react-router'
import { auth, db, FirebaseTimestamp } from '../../firebase/'

const usersRef = db.collection('users')

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid

        db.collection('users').doc(uid).get()
          .then(snapshot => {
            const data = snapshot.data()

            dispatch(signInAction({
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username
            }))
          })

      } else {
        dispatch(push('/signin'))
      }
    })
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {

    if (email === '' || password === '') {
      alert('Please complete all required fields.')
      return false
    }

    const result = await auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user
        
        if (user) {
          const uid = user.uid

          db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))

              dispatch(push('/'))
            })
        }
      })

  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {

    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Please complete all required fields.')
      return false
    }

    if (password !== confirmPassword) {
      alert('Password does not match.')
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: 'customer',
            uid: uid,
            updated_at: timestamp,
            username: username
          }

          db.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            })
        }
      })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
        .then(() => {
          dispatch(signOutAction())
          dispatch(push('/signin'))
        })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === '') {
      alert('Please complete all required fields.')
      return false
    } else {
      auth.sendPasswordResetEmail(email)
          .then(() => {
            alert('Sent email.')
            dispatch(push('/'))
          }).catch(() => {
            alert('Failed to reset.')
          })
    }
  }
}