import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react' 
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [ users, setUsers ] = useState([])
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ loading, setLoading ] = useState(false)

  const getUsers = () => {
    setLoading(true)
    fetch(`https://randomuser.me/api/?page=${currentPage}&results=10`, {
      method: 'GET',
    }).then((response) => response.json())
    .then((json) => {
      setUsers([...users, ...json.results])
    })
    setLoading(false)
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemWrapperStyle} >
        <Image source={{ uri : item.picture.large }} style={styles.itemImageStyle} />
        <View style={styles.contentWrapperStyle}> 
          <Text style={styles.txtNameStyle}>{item.name.title} {item.name.first} {item.name.last}</Text>
          <Text style={styles.txtEmailStyles}>{item.email}</Text>
        </View>
      </View>
    )
  }

  const renderLoader = () => {
    return (
      loading ?
      <View> 
        <ActivityIndicator size="large" color="#aaa" />
      </View> : null
    )
  }

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1)
  }

  useEffect (() => {
    getUsers();
  }, [currentPage])

  return (
    <View style={styles.container}>
      <FlatList 
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.email}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  itemImageStyle: { 
    width: 50, 
    height: 50 ,
    marginRight: 16
  },
  contentWrapperStyle:{
    justifyContent: 'space-around'
  },
  txtNameStyle: {
    fontSize: 16
  },
  txtEmailStyles: {
    color: "#777"
  }
});
