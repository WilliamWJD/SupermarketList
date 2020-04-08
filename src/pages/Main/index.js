import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native'

import useMarketList from '../../hooks/useMarketList'

const Main = () => {

    const [products, setProducts] = useState('')
    const [productsFilter, setProductsFilter] = useState([])
    const [productsList, setProductsList] = useState([])
    const [state, addItem, checkItem, removeItem] = useMarketList()

    function FilterCarChecked() {
        const carChecked = state.filter(item => {
            return item.check
        })
        setProductsFilter(carChecked)
    }

    function FilterCar() {
        const carList = state.filter(item => {
            return item.check !== true
        })
        setProductsList(carList)
    }

    useEffect(() => {
        FilterCarChecked()
        FilterCar()
    }, [state])

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Adicionar produto'
                    value={products}
                    onChangeText={text => { setProducts(text) }}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={async () => {
                        addItem(products)
                        setProducts('')
                    }}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listItemCar}>
                <View style={styles.listItemTitle}>
                    <Text style={styles.listItemTitleText}>Lista</Text>
                </View>
                <FlatList
                    data={productsList}
                    renderItem={({ item }) => (
                        <View style={styles.itemsContainer}>
                            <TouchableOpacity
                                style={styles.itemCheckButton}
                                onPress={() => {
                                    checkItem(item.id)
                                }}
                            >
                                <Text style={[styles.listItem, item.check ? styles.listItemChecked : '']}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.removeItem}
                                onPress={() => {
                                    removeItem(item.id)
                                }}
                            >
                                <Text style={styles.removeItemText}>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <View style={styles.listItemCarChecked}>
                <View style={styles.listItemTitle}>
                    <Text style={styles.listItemTitleText}>Carrinho</Text>
                </View>
                <FlatList
                    data={productsFilter}
                    renderItem={({ item }) => (
                        <View style={styles.itemsContainer}>
                            <TouchableOpacity
                                style={styles.itemCheckButton}
                                onPress={() => {
                                    checkItem(item.id)
                                }}
                            >
                                <Text style={[styles.listItem, item.check ? styles.listItemChecked : '']}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.removeItem}
                                onPress={() => {
                                    removeItem(item.id)
                                }}
                            >
                                <Text style={styles.removeItemText}>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    inputContainer: {
        flexDirection: 'row',
        margin: 10
    },
    input: {
        flex: 1,
        width: '80%',
        fontSize: 30,
        color: '#000'
    },
    addButton: {
        marginHorizontal: 5,
        alignItems: 'center',
        alignSelf: 'center'
    },
    addButtonText: {
        textAlign: 'center',
        color: '#c0392b',
        fontSize: 60
    },
    itemsContainer: {
        flexDirection: 'row'
    },
    listItem: {
        fontSize: 18,
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 3,
        fontWeight: 'bold',
        borderRadius: 5,
        // backgroundColor: '#ffb142',
    },
    listItemChecked: {
        textDecorationLine: 'line-through',
        fontWeight: 'normal'
    },
    itemCheckButton: {
        flex: 1,
    },
    removeItem: {
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 5,
        backgroundColor: '#e74c3c',
        borderRadius: 5
    },
    removeItemText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        padding: 14
    },
    listItemCarChecked: {
        flex: 1
    },
    listItemTitle: {
        backgroundColor: '#2c3e50',
        padding: 10,
        marginTop:10
    },
    listItemTitleText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    }

})

export default Main