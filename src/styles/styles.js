const fontSize = 16;
const formWidth = 300;

export default {
  M: function() {
    return Object.assign({},...arguments)
  },
  hidden: {
    display:'none'
  },
  show: {
    display:'block'
  },
  w90: {
    width:'90%',
  },
  w75: {
    width:'75%',
  },
  w50: {
    width:'50%',
  },
  w25: {
    width:'25%',
  },
  form: {
    width:formWidth,
  },
  entry: {
  },
}
