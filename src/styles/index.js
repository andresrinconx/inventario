import { StyleSheet } from 'react-native'

const globalStyles = {
  container: 'flex-1 mx-2',

}

const theme = {
  turquesaClaro: '#3E82A0',
  turquesaOscuro: '#045675',
  azul: '#1e3983',
  verde: '#a6d926',
  azulClaro: '#2f95e4',
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    elevation: 8,
  },
  shadowHeader: {
    backgroundColor: theme.turquesaOscuro,
    shadowColor: '#000',
    shadowOpacity: 0.30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    elevation: 8,
  },
})

export {
  globalStyles,
  theme,
  styles
}