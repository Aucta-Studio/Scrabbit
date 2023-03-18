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
  Platform,
  ToastAndroid,
} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  arrayUnion
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
import Geolocation from '@react-native-community/geolocation';
import CompassHeading from 'react-native-compass-heading';
import {useDocument} from 'react-firebase-hooks/firestore';

// reference https://github.com/ViroCommunity/geoar/blob/master/App.js#LL28C19-L28C19
const distanceBetweenPoints = (p1, p2) => {
  console.log('POINT 1', p1);
  console.log('POINT 2', p2);
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
  console.log('DISTANCE', d);
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
  const [heading, setHeading] = useState(null);
  const [ready, setReady] = useState(false);
  // const [value, loading, error] = useDocument(doc(db, "Profiles", `${uid}`));
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
    // getPosts(array);
    return array;
  };

  const getPosts = async arrin => {
    // let list = await getList(id);
    const qp = query(PostStore, where('author', 'in', arrin));
    // const user = await getDoc(doc(db, "Profiles", `${uid}`));
    const array = [];
    const temp = await getDocs(qp);
    temp.forEach(async docp => {
      // console.log(doc.id, '=>', doc.data());
      const user = await getDoc(doc(db, 'Profiles', `${docp.data().author}`));
      const dist = distanceBetweenPoints(location, docp.data().location);
      if (dist < 1) {
        array.push({
          id: docp.id,
          distance: dist,
          username: user.data().UserName,
          ...docp.data(),
        });
      }
    });
    console.log(array);
    setPosts(array);
    setReady(true);
    return array;
  };

  // https://github.com/ViroCommunity/geoar/blob/master/App.js#L102
  const getLocation = () => {
    const geoSuccess = result => {
      setlocation(result.coords);
      console.log(location);
    };
    Geolocation.watchPosition(geoSuccess, error => {}, {distanceFilter: 10});
  };

  const getHeading = () => {
    const headingSuccess = (heading, accuracy) => {
      setHeading(heading);
      // console.log(heading);
    };
    CompassHeading.start(3, headingSuccess);
  };

  // https://github.com/ViroCommunity/geoar/blob/master/App.js#L124
  transformGpsToAR = (lat, lng) => {
    const isAndroid = Platform.OS === 'android';
    const latObj = lat;
    const longObj = lng;
    const latMobile = location.latitude;
    const longMobile = location.longitude;

    const deviceObjPoint = latLongToMerc(latObj, longObj);
    const mobilePoint = latLongToMerc(latMobile, longMobile);
    const objDeltaY = deviceObjPoint.y - mobilePoint.y;
    const objDeltaX = deviceObjPoint.x - mobilePoint.x;

    if (heading) {
      let degree = heading.heading;
      let angleRadian = (degree * Math.PI) / 180;
      let newObjX =
        objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
      let newObjY =
        objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);
      return {x: newObjX, z: -newObjY};
    }

    return {x: objDeltaX, z: -objDeltaY};
  };

  // Alert.alert(`Hello ${firstName}`, `You will be Logged in shortly`);

  useEffect(() => {
    Alert.alert(`Hello ${firstName}`, `You will be Logged in shortly`);
    getLocation();
    getHeading();
    signInWithEmailAndPassword(auth, loginEmail, loginPass)
      .then(userCredential => {
        const user = userCredential.user.uid;
        console.log('Logged in');
        // console.log(user);
        setuid(user);
        getList(user);
      })
      .catch(error => {
        Alert.alert('Unsuccessful Login');
      });
  }, []);

  // console.log('CompassHeading: ', heading);
  // console.log('Location: ', location);
  // console.log('Platform: ', Platform.OS);
  // console.log(posts);

  {
    location && idList && !posts && getPosts(idList);
  }

  async function handleCollect(docID, author) {
    const post = doc(db, 'Posts', docID);
    const temp = await getDoc(post);
    if (uid == author) {
      Alert.alert('You are the author of this node');
    } else
    if (temp.data().Collected.includes(uid)) {
      Alert.alert('You have already collected this node');
    } else {
      await updateDoc(post, {
        Collected: arrayUnion(uid),
      })
        .then(Alert.alert('Successfully collected this node'))
        .catch(error => {
          Alert.alert('Failed to collect this node');
        });
    }
  }

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
      {!ready && (
        <ViroText
          text={'getting posts'}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      )}
      {ready && (
        <>
          <ViroText
            text={text}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            style={styles.helloWorldTextStyle}
          />
          {posts?.map(post => {
            const coords = transformGpsToAR(
              post.location.latitude,
              post.location.longitude,
            );
            const scale = Math.abs(Math.round(coords.z / 15));
            const dist = post.distance;
            return (
              <ViroNode
                key={post.id}
                scale={[scale, scale, scale]}
                position={[coords.x, 0, coords.z]}>
                <ViroFlexView
                  style={{alignItems: 'center', justifyContent: 'center'}}>
                  <ViroText
                    width={4}
                    height={0.5}
                    text={post.Title}
                    style={styles.helloWorldTextStyle}
                  />
                  <ViroText
                    width={4}
                    height={0.5}
                    text={`by ${post.username}`}
                    style={styles.helloWorldTextStyle}
                  />
                  <ViroText
                    width={4}
                    height={0.5}
                    text={`${Number(dist).toFixed(2)} km`}
                    style={styles.helloWorldTextStyle}
                  />
                  {/* <ViroImage width={1} height={1} source={carrot} position={[0,-1.5,0]}/> */}
                  <ViroButton
                    width={1}
                    height={0.6}
                    source={carrot}
                    position={[0, 1, 0]}
                    onClick={() => {
                      console.log('CLICKCKCKCKCKK');
                      handleCollect(post.id, post.author, post.Collected);
                    }}
                  />
                </ViroFlexView>
              </ViroNode>
            );
          })}
        </>
      )}
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
