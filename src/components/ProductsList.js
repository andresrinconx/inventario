import { View, Text, Image, TouchableOpacity, Pressable, Modal } from 'react-native'
import React, {useState} from 'react'
import { styles, theme } from '../styles'
import { XMarkIcon } from 'react-native-heroicons/outline'

const ProductsList = ({
  setCarrito, 
  carrito, 
  setItemsCarrito, 
  itemsCarrito,
  type,
  cartList,
  item
}) => {
  const [cantidad, setCantidad] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)

  const { descrip, precio1 } = item  

  // decremento e incremento 
  const decremento = () => {
    if (cantidad !== 1) {
        const total = cantidad - 1
        setCantidad(total)
    }
  }
  const incremento = () => {
    const total = cantidad + 1
    setCantidad(total)
  }

  // agregar al carrito
  const addToCart = () => {
    const total = itemsCarrito + 1
    setItemsCarrito(total)


    setCarrito([...carrito, item])
  
    // message
    
  }

  const layout = (type) => {
    if(type === 'grid') { // --- grid
      return (
        <View className='w-[47.5%] mr-[10px] ml-[1px] mb-4 mt-[1px] px-2'
          style={styles.shadow}
        >  
          {/* img */}
          <View className='border-b-[#c0c0c0] border-b mb-2 justify-center items-center'>
            <Image
              className='w-32 h-32'
              source={require('../assets/Acetaminofen.png')}
            />
          </View>
          
          {/* texts & btn */}
          <View>
            <Text className='color-black font-bold text-[18px] mb-1' numberOfLines={2}>
              {descrip}
            </Text>
  
            <Text className='font-bold text-[18px] color-[#bed03c] mb-2'>Bs. {precio1}</Text>  
  
            <TouchableOpacity className={`bg-[${theme.azulClaro}] rounded-md p-[5px] mb-2`}
              onPress={() => addToCart()}
            >
              <Text className='color-white text-center font-bold text-4'>Agregar</Text>
            </TouchableOpacity>  
          </View>
        </View>
      )
    } else if(type === 'list') { // --- list
      return (
        <View className='mr-[2px] ml-[1px] mb-2 mt-[1px] p-3'
          style={styles.shadow}
        >
          <View className='flex-row'>
    
            {/* textos item */}
            <View className='basis-[70%]'>
              <Text className='color-black font-bold text-lg leading-6' numberOfLines={2}>
                {descrip}
              </Text>
      
              <Text className='font-bold text-lg color-[#bed03c]'>Bs. {precio1}</Text>
            </View>
    
            {/* btn */}
            <View className='basis-[30%] justify-center items-center'>
              <TouchableOpacity className={`bg-[${theme.azulClaro}] rounded-md p-[10px] w-20- mb-2`}
                onPress={() => addToCart()}
              >
                <Text className='color-white text-center font-bold text-4'>Agregar</Text>
              </TouchableOpacity>  
            </View>
          </View>
        </View>
      )
    } else if(cartList === true) { // --- cartList
      return (
        <>
          <Pressable onLongPress={() => setModalVisible(true)}>
            <View className='mr-[2px] ml-[1px] mb-2 mt-[1px] p-3' style={styles.shadow}>
              <View className='flex-row'>
        
                {/* textos item */}
                <View className='basis-[70%]'>
                  <Text className='color-black font-bold text-lg leading-6' numberOfLines={2}>
                    {descrip}
                  </Text>
          
                  <Text className='font-bold text-lg color-[#bed03c]'>Bs. {precio1}</Text>
                </View>
        
                {/* btns */}
                <View className='basis-[30%] flex-row justify-center items-center space-x-3'>
                  <TouchableOpacity onPress={() => decremento()} className={`bg-[${theme.azulClaro}] w-7 rounded-full`}>
                    <Text className='text-white text-center font-bold text-xl'>-</Text>
                  </TouchableOpacity>

                  <Text className='color-black text-2xl mx-1'>{cantidad}</Text>

                  <TouchableOpacity onPress={() => incremento()} className={`bg-[${theme.azulClaro}] w-7 rounded-full`}>
                    <Text className='text-white text-center font-bold text-xl'>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Pressable>

          <Modal visible={modalVisible}
            animationType='slide'
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className='flex-1 justify-center items-center' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
              <View className='bg-white rounded-xl w-[92%] h-[60%]'>

                {/* close */}
                <TouchableOpacity onPress={() => setModalVisible(false)} className='absolute right-2 top-2'>
                  <XMarkIcon size={35} color='black' />
                </TouchableOpacity>

                {/* content */}
                <View className='px-4 mt-8'>
                  <View className='border-b-[#D1D5DB] border-b mb-2 justify-center items-center'>
                    <Image source={require('../assets/Acetaminofen.png')} style={{width: 240, height: 240,}} />
                  </View>
                  
                  <View>
                    <Text className='color-black font-bold text-3xl mb-2'>{descrip}</Text>
                    <Text className='font-bold text-3xl color-[#bed03c] mb-2'>Bs. {precio1}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal> 
        </>
      )
    } else {
      return (
        <View className='flex-1 justify-center items-center'>
          <Text className='font-bold text-2xl text-center'>No hay elementos</Text>
        </View>
      )
    }
  }
  
  return (<>{layout(type)}</>)
}

export default ProductsList