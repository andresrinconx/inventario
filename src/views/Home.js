import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Squares2X2Icon, ListBulletIcon } from 'react-native-heroicons/outline'

import { globalStyles, theme } from '../styles'
import Loading from '../components/Loading'
import ProductsList from '../components/ProductsList'

const Home = ({
  carrito, 
  setCarrito, 
  setItemsCarrito, 
  itemsCarrito, 
  type, 
  setType
}) => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)

  // obtener productos
  useEffect(() => {
    const obtenerProductos = async () => {
      const url = 'http://10.0.2.2:3000/sinv'
    
      try {
        setLoading(true)
        const response = await fetch(url)
        const result = await response.json()
        setProductos(result.result.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerProductos()
  }, [])

  // icon
  const icon = (type) => {
    if(type === 'grid') { // --- grid
      return (
        <Squares2X2Icon size={30} color='black' />
      )
    } else { // --- list
      return (
        <ListBulletIcon size={30} color='black' />
      )
    }
  }

  return (
    <View className={`${globalStyles.container}`}>

      {/* bar */}
      <View className='flex-row justify-between mt-4 mb-3 mx-3'>
        <Text className={`text-[${theme.azul}] text-xl font-bold`}>Productos</Text>

        <TouchableOpacity onPress={() => setType(type === 'grid' ? 'list' : 'grid')}>
          {icon(type)}
        </TouchableOpacity>
      </View>

      {/* Grid || List */}
      <View className='flex-1 justify-center items-center'>
        {loading
          ? (
            <Loading />
          ) : (
            <FlatList
              data={productos}
              key={type === 'grid' ? 'grid' : 'list'}
              numColumns={type === 'grid' ? 2 : 1}
              contentContainerStyle={{
                paddingBottom: 10,
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.descrip}
              renderItem={({item}) => {
                return (
                  <ProductsList
                    key={item.descrip}
                    item={item}
                    setCarrito={setCarrito}
                    carrito={carrito}
                    setItemsCarrito={setItemsCarrito}
                    itemsCarrito={itemsCarrito}
                    type={type}
                  />
                )
              }} 
            />
          )
        }
      </View>
    </View>
  )
}

export default Home