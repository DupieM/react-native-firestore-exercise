import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getMyBucketList } from '../services/DbService';
import { useFocusEffect } from '@react-navigation/native';

const ListScreen = ({navigation}) => {

    const goToAdd = () => { navigation.navigate("Add") }

    const [bucketItems, setBucketItems] = useState([])

    // useEffect(() => { //only running on first load, but when naviagting back doesn't rereander
    //     handleGettingOfData()
    // }, [])

    useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          handleGettingOfData()

          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            //DO NOTHING
          };
        }, [])
    );

    const handleGettingOfData = async () => {
        var allData = await getMyBucketList()
        // console.log("All data:" + allData)
        setBucketItems(allData)
    }

  return (
    <SafeAreaView>
        <View  style={styles.container}>

            <Pressable style={styles.addButton} onPress={goToAdd}>
                <Text style={styles.addButtonText}>Add</Text>
                <Entypo name="bucket" size={16} color="green" />
            </Pressable>


            {/* THIS WILL LOOP FOR EACH ITEM */}
            { 
            bucketItems != [] ? (
                bucketItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.card} 
                        onPress={() => {
                            navigation.navigate("Details", { 
                                itemId: item.id,
                                itemTitle: item.title,
                                itemPriority: item.priority,
                                itemDue: item.due,
                                itemDescription: item.description,
                                itemIsCompleted: item.isCompleted,
                            })
                        }}>
                        <Text>{item.title}</Text>
                        {item.priority ? <AntDesign name="star" size={24} color="orange" /> : null}
                        {/* Show the star icon if it is a priority */}
                    </TouchableOpacity>
                ))
            ) : (
                <Text>No Items Found Yet</Text>
            )
           }
            
            {/* END LOOP */}
        </View>
       
    </SafeAreaView>
  )
}

export default ListScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    addButton: {
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 2,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    addButtonText: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold'
    }
})