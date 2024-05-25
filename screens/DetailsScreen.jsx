import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore';
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

  //TODO: Delete an item from database

  return (
    
    <View style={styles.container}>
      <Text style={{fontSize: 24}}>{JSON.stringify(itemTitle)}</Text>
      <Text>{JSON.stringify(itemDescription)}</Text>
      <Text>Due date: {JSON.stringify(itemDue)}</Text>
      <Text>Priority: {JSON.stringify(itemPriority)}</Text>

      <Button
        title={isCompleted ? 'mark completed' : 'already done'}
        color="red"
        onPress={handleMarkedCompleted}
        disabled={isCompleted}
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