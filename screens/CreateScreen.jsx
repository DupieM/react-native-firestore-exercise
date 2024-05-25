import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNewBucketItem } from '../services/DbService'

const CreateScreen = ({navigation}) => {


    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState(false)
    const [due, setDue] = useState('')
    const [description, setDescription] = useState('')

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        // Check if all required fields are filled
        if (title.trim() && due.trim() && description.trim()) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [title, due, description]);

    const handleCreation = async () => {
        //Need to pass all our data to the function

        //Make sure all the values have been entered - show error/disable button
        if (!isFormValid) {
            Alert.alert("Validation Error", "Please fill all the required fields.");
            return;
        }

        var items = {title, priority, due, description, isCompleted: false}
        var success = await createNewBucketItem(items)
        if(success){
            navigation.goBack()
        } else {
            //Validation why
            Alert.alert("Error", "Failed to create bucket list item.");
        }

    }


  return (
    <SafeAreaView >
        <View style={styles.container}>

            <TextInput
                style={styles.inputField}
                placeholder="Bucket List Title"
                onChangeText={newText => setTitle(newText)}
                defaultValue={title}
            />

            <TextInput
                style={styles.inputField}
                placeholder="When do you want it done?"
                onChangeText={newText => setDue(newText)}
                defaultValue={due}
            />      

            <TextInput
                multiline
                numberOfLines={4}
                style={styles.inputField}
                placeholder="Description of bucket list"
                onChangeText={newText => setDescription(newText)}
                defaultValue={description}  
            />

            <View style={styles.switch}>
                <Switch
                    trackColor={{false: 'black', true: 'green'}}
                    thumbColor={priority ? 'yellow' : 'white'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(toggle) => setPriority(toggle)}
                    value={priority}
                />
                <Text>Priority?</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCreation}>
                <Text style={styles.buttonText}>Create Bucket List Item</Text>
            </TouchableOpacity>
        
        </View>  
    </SafeAreaView>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        padding: 10
    },
    button: {
        backgroundColor: "green",
        textAlign: 'center',
        padding: 15,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    switch: {
        marginTop: 15,
        display: 'flex',    
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 10,
    }
})