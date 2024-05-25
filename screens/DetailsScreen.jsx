import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DetailsScreen = ({ route, navigation }) => {

  //Retrive the params from the list screen
  const { itemId, itemTitle, itemPriority, itemDue, itemDescription, itemIsCompleted } = route.params;

  //Mark completed that disables the button
  const [isCompleted, setIsCompleted] = useState(itemIsCompleted);

  const handleMarkedCompleted = async () => {

    const item = doc(db, "items", itemId);

    await updateDoc(item, {
      isCompleted: true,
    });

    setIsCompleted(true);

  }

  //Delete an item from database
  const handleDeleteItem = async () => {
    Alert.alert(
      "Delete",
      "Do you want to delete this specific item?",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: "Delete",
          onPress: async () => {
            const item = doc(db, "items", itemId);
            await deleteDoc(item);
            navigation.goBack()
          },
          style: "destructive"
        }
    ]
    )
  }
  

  return (
    
    <View style={styles.container}>
      <Text style={{fontSize: 24}}>{JSON.stringify(itemTitle)}</Text>
      <Text>{JSON.stringify(itemDescription)}</Text>
      <Text>Due date: {JSON.stringify(itemDue)}</Text>
      <Text>Priority: {JSON.stringify(itemPriority)}</Text>

      <Button
        title={isCompleted ? 'mark completed' : 'already done'}
        color="green"
        onPress={handleMarkedCompleted}
        disabled={isCompleted}
      />

      <Button
        title="Delete"
        color="red"
        onPress={handleDeleteItem}
      />

    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        marginTop: 20,
    }
})