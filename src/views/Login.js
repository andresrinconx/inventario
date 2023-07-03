import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { KeyIcon, UserIcon } from 'react-native-heroicons/outline'

import { globalStyles, theme } from '../styles'

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const navigation = useNavigation()

  // obtener usuarios db
  useEffect(() => {
    const getUsers = async () => {
      const url = 'http://10.0.2.2:4000/'
    
      try {
        const response = await fetch(url)
        const result = await response.json()
        setUsers(result)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  // autenticar usuario
  const auth = () => {
    // campos obligatorios
    if([usuario, password].includes('')) {
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios',
        [
          { text: 'OK' },
        ]
      )
      return
    }

    const user = users.find(user => user.us_codigo === usuario && user.us_clave === password);

    if (user === undefined) {
      Alert.alert(
        'Error',
        'Usuario y contraseña incorrectos',
        [
          { text: 'OK' },
        ]
      )
      return
    }

    navigation.navigate('Home')
  }

  return (
    <LinearGradient
      colors={[`${theme.turquesaOscuro}`, `${theme.turquesaClaro}`]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.4 }}
      style={{ flex: 1 }}
    >
      <View className={`${globalStyles.container} items-center justify-center -top-12`}>

        {/* icon */}
        <View>
          <Image source={require('../assets/user.png')} style={{width: 150, height: 150,}} />
        </View>

        {/* inputs */}
        <View className='top-14 space-y-2'>
          <View className='bg-white w-[340px] rounded-full flex-row items-center'>
            <TextInput className='text-xl p-4 ml-3'
              placeholder='Usuario'
              value={usuario}
              onChangeText={setUsuario}
            />
            <View className='absolute right-4'>
              <UserIcon size={25} color='black' />
            </View>
          </View>

          <View className='bg-white w-[340px] rounded-full flex-row items-center'>
            <TextInput className='text-xl p-4 ml-3'
              secureTextEntry={true}
              placeholder='Contraseña'
              value={password}
              onChangeText={setPassword}
            />
            <View className='absolute right-4'>
              <KeyIcon size={25} color='black' />
            </View>
          </View>

          <TouchableOpacity onPress={() => auth()} className={`bg-[${theme.verde}] w-[340px] top-8 p-3 rounded-full`}>
            <Text className='color-white font-bold text-2xl text-center'>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Login