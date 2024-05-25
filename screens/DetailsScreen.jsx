import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailsScreen = ({ route, navigation }) => {

  const { itemId, itemTitle, itemPriority, itemDue, itemDescription, itemIsCompleted } = route.params;

  //TODO: Delete an item from database
  //TODO: Mark completed that disables the button

  return (
    
    <View style={styles.container}>
      <Text style={{fontSize: 24}}>{JSON.stringify(itemTitle)}</Text>
      <Text>{JSON.stringify(itemDescription)}</Text>
      <Text>Due date: {JSON.stringify(itemDue)}</Text>
      <Text>Priority: {JSON.stringify(itemPriority)}</Text>

      <Button
        title='mark completed / already done'
        color="red"
        disabled={false}
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