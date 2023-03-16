import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import {myFireBase, auth, db} from './fireBaseConfig';
import {
  ViroARScene,
  ViroText,
  ViroButton,
  ViroNode,
  ViroImage,
  //ViroConstants,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroFlexView,
} from '@viro-community/react-viro';
import carrot from './assets/images/carrot_node.png';

// reference https://github.com/ViroCommunity/geoar/blob/master/App.js#LL28C19-L28C19
const distanceBetweenPoints = (p1, p2) => {
  if (!p1 || !p2) {
    return 0;
  }
  var R = 6371; // Radius of the Earth in km
  var dLat = ((p2.latitude - p1.latitude) * Math.PI) / 180;
  var dLon = ((p2.longitude - p1.longitude) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.latitude * Math.PI) / 180) *
      Math.cos((p2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};
// From: https://gist.github.com/scaraveos/5409402
const latLongToMerc = (latDeg, longDeg) => {
  const longRad = (longDeg / 180.0) * Math.PI;
  const latRad = (latDeg / 180.0) * Math.PI;
  const smA = 6378137.0;
  const xmeters = smA * longRad;
  const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));
  return {x: xmeters, y: ymeters};
};

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');
  const [uid, setuid] = useState(null);
  const [idList, setList] = useState(null);
  const [posts, setPosts] = useState(null);
  const [location, setlocation] = useState(null);
  const loginEmail = 'a.abdelfattah2004@gmail.com';
  const firstName = 'Ahmed';
  const loginPass = 'Temp123';
  const relations = collection(db, 'Relations');
  const PostStore = collection(db, 'Posts');

  const getList = async id => {
    const q = query(relations, where('Follower', '==', `${id}`));
    const temp = await getDocs(q);
    const array = [];
    temp.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      array.push(doc.data().Followed);
    });
    array.push(`${id}`);
    // console.log(array);
    setList(array);
    getPosts(array);
    return array;
  };

  const getPosts = async arrin => {
    // let list = await getList(id);
    const qp = query(PostStore, where('author', 'in', arrin));
    const array = [];
    const temp = await getDocs(qp);
    temp.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      array.push({id: doc.id, ...doc.data()});
    });
    // console.log(array);
    setPosts(array);
    return array;
  };

  // Alert.alert(`Hello ${firstName}`, `You will be Logged in shortly`);
  // console.log(firstName);

  useEffect(() => {
    Alert.alert(`Hello ${firstName}`, `You will be Logged in shortly`);
    signInWithEmailAndPassword(auth, loginEmail, loginPass)
      .then(userCredential => {
        const user = userCredential.user.uid;
        console.log('Logged in');
        console.log(user);
        setuid(user);
        getList(user);
      })
      .catch(error => {
        Alert.alert('Unsuccessful Login');
      });
  }, []);

  // console.log(posts);

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText(`Hello ${firstName}`);
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      <ViroNode scale={[1, 1, 1]} position={[1, 0, -1]}>
        <ViroFlexView style={{alignItems: 'center', justifyContent: 'center'}}>
          <ViroText
            width={4}
            height={0.5}
            text={'Le Louvre'}
            style={styles.helloWorldTextStyle}
          />
          <ViroText
            width={4}
            height={0.5}
            text={'by 4aas_h'}
            style={styles.helloWorldTextStyle}
          />
          {/* <ViroImage width={1} height={1} source={carrot} position={[0,-1.5,0]}/> */}
          <ViroButton
            width={1}
            height={1}
            source={carrot}
            position={[0, -1.5, -2]}
          />
        </ViroFlexView>
      </ViroNode>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

// export default class App extends React.Component {
//   render() {
//     return (
//       <ViroARSceneNavigator
//         // worldAlignment={'GravityAndHeading'}
//         autofocus={true}
//         initialScene={{
//           scene: HelloWorldSceneAR,
//         }}
//         style={{flex: 1}}
//       />
//     );
//   }
// }

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
