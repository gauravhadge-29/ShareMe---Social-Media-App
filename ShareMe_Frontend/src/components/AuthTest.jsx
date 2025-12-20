import React from 'react'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'

const AuthTest = () => {
  const clientId = import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN

  if (!clientId) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Google OAuth not configured</h2>
        <p>
          Missing env var <code>VITE_REACT_APP_GOOGLE_API_TOKEN</code>. Add it to your <code>.env</code> and restart <code>npm run dev</code>.
        </p>
      </div>
    )
  }

  const loginRedirect = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: `${window.location.origin}/auth-test`,
    onSuccess: (codeResponse) => {
      console.log('AuthTest redirect success', codeResponse)
    },
    onError: () => {
      console.log('AuthTest redirect failed')
    }
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', gap: 16, flexDirection: 'column' }}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log('AuthTest success', credentialResponse)
        }}
        onError={() => {
          console.log('AuthTest failed')
        }}
      />
      <button onClick={() => loginRedirect()} style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6 }}>
        Try Google Login (Redirect)
      </button>
      <div style={{ maxWidth: 520, color: '#666', fontSize: 14 }}>
        If the popup fails due to blockers/cookies, try the redirect option.
      </div>
    </div>
  )
}

export default AuthTest
