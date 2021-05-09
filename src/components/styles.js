import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  container: {
    display: 'block',
    width: '100%',
    maxWidth: '1080px',
    margin: 'auto',
  },
  result: {
    display: 'block',
    width: '100%',
    maxWidth: '1080px',
    margin: 'auto',
    marginBottom: '1.2rem',
  },
  body: {
    display: 'flex',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1.1rem',
    justifyContent: 'space-between',
    backgroundColor: '#1eb955',

    p: {
      fontSize: '1.2rem',
      color: 'white',
      fontWeight: '700',
      textDecoration: 'none',
      margin: '0'
    },

    img: {
      maxWidth: '75px'
    }
  },

  meta: {
    backgroundColor: '#24282c',
    fontSize: '1.1rem',
    padding: '0.625rem',
    color: 'white',

    ul: {
      margin: 0,
      padding: 0,

      li: {
        listStyle: 'none',
        backgroundColor: '#3f454a',
        width: '100%',
        marginBottom: '0.625rem',
        padding: '0.625rem',
        borderRadius: '5px',
      }
    },

    h2: {
      marginTop: '5px',
      fontSize: '1.1rem',
      textDecoration: 'underline',
    },

  },

  input: {
    display: 'block',
    marginBottom: '1.2rem',
    width: '100%',
    height: '50px',
    padding: '0.365rem 0.75rem',
    fontSize: '1.1rem',
    color: '#495057',
    backgroundColor: 'white',
    backgroundClip: 'padding-box',
    border: '1px solid #ced4da',
    boxShadow: '0.15s ease-in-out',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  }
}))